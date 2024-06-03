import { processEvent } from '@/actions/shared/utils/EventLogger/event.processor'
import { provideContract, getSigner } from '../provider/contract.provider'
import {
  ContractEvents,
  ErrorCodes,
  EventNames,
  PatientError,
} from '@/actions/shared/global'
import { ApproveMedicalRecordAccessType } from '@/actions/interfaces/Patient/app.patient.interface'

async function addPatient(): Promise<{
  success: number
  patientId: number
  walletAddress: string
}> {
  try {
    const contract = await provideContract()
    const walletAddress = await getSigner().then((signer) =>
      signer.getAddress(),
    )
    const transaction = await contract.addPatient()

    const receipt = await transaction.wait()

    const eventResult = await processEvent(
      receipt,
      EventNames.PatientAdded,
      ContractEvents.PatientAdded,
    )

    return {
      success: ErrorCodes.Success,
      patientId: eventResult.patientId,
      walletAddress,
    }
  } catch (error) {
    console.error(error)
    throw new PatientError('Error adding patient to contract')
  }
}

async function fetchPatientId(address: string) {
  try {
    const contract = await provideContract()
    const patient = await contract.patients(address)
    return Number(patient.patientId)
  } catch (error) {
    console.error(error)
    throw new PatientError('Error fetching patient from contract')
  }
}

async function getPatientRecordCount(address: string) {
  try {
    const contract = await provideContract()
    const patient = await contract.patients(address)
    const recordCount = Number(patient.patientMedicalRecordCount)
    const patientId = Number(patient.patientId)

    return {
      recordCount,
      patientId,
    }
  } catch (error) {
    console.error(error)
    throw new PatientError('Error fetching patient record count from contract')
  }
}

async function approveAccessToAddNewMedicalRecord(
  doctorAddress: string,
  patientId: number,
) {
  try {
    const contract = await provideContract()
    const transaction = await contract.approveAccessToAddNewMedicalRecord(
      doctorAddress,
      patientId,
    )

    const receipt = await transaction.wait()
    const eventResult = await processEvent(
      receipt,
      EventNames.WriteAccessGranted,
      ContractEvents.WriteAccessGranted,
    )

    return {
      success: ErrorCodes.Success,
      patientId: Number(eventResult.patientId),
      doctorAddress,
      message: 'Write access granted',
    }
  } catch (error) {
    console.error(error)
    throw new PatientError('Error approving access to add new medical record')
  }
}

async function approveAccessToExistingRecord(
  args: ApproveMedicalRecordAccessType,
) {
  const { practitionerAddress, patientId, recordId, durationInSeconds } = args
  try {
    const contract = await provideContract()
    const transaction = await contract.approveMedicalRecordAccess(
      practitionerAddress,
      patientId,
      recordId,
      durationInSeconds,
    )
    const receipt = await transaction.wait()

    const eventResult = await processEvent(
      receipt,
      EventNames.WriteAccessGranted,
      ContractEvents.WriteAccessGranted,
    )

    return {
      success: ErrorCodes.Success,
      doctorAddress: practitionerAddress,
      patientId: Number(eventResult.patientId),
      message: 'Write Access Granted',
    }
  } catch (error) {
    console.error(error)
    throw new PatientError('Error approving medical record access')
  }
}

async function approveMedicalRecordAccess(
  args: ApproveMedicalRecordAccessType,
) {
  const { practitionerAddress, patientId, recordId, durationInSeconds } = args
  try {
    const contract = await provideContract()
    const isDoctorApproved: boolean = await contract.approvedDoctors(
      practitionerAddress,
    )

    if (!isDoctorApproved) {
      return {
        success: ErrorCodes.Error,
        message: 'Doctor is not approved',
      }
    }
    if (!recordId) {
      const result = await approveAccessToAddNewMedicalRecord(
        practitionerAddress,
        patientId,
      )
      return {
        success: result.success,
        doctorAddress: result.doctorAddress,
        patientId: result.patientId,
        message: result.message,
      }
    }

    const result = await approveAccessToExistingRecord({
      practitionerAddress,
      patientId,
      recordId,
      durationInSeconds,
    })

    return {
      success: result.success,
      doctorAddress: result.doctorAddress,
      patientId: result.patientId,
      message: result.message,
    }
  } catch (error) {
    console.error('Error approving medical record access')
  }
}

async function addPatientFamilyMember(patientId: number) {
  try {
    const contract = await provideContract()
    const transaction = await contract.addPatientFamilyMember(patientId)
    const receipt = await transaction.wait()

    const eventResult = await processEvent(
      receipt,
      EventNames.PatientFamilyMemberAdded,
      ContractEvents.PatientFamilyMemberAdded,
    )

    return {
      principalPatientId: Number(eventResult.principalPatientId),
      familyMemberId: Number(eventResult.patientId),
    }
  } catch (error) {
    console.error(error)
    throw new PatientError('Error adding patient family member to contract')
  }
}

export {
  addPatient,
  fetchPatientId,
  addPatientFamilyMember,
  approveMedicalRecordAccess,
}
