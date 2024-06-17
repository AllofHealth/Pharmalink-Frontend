import { processEvent } from '@/actions/shared/utils/EventLogger/event.processor'
import { provideContract, getSigner } from '../provider/contract.provider'
import {
  ContractEvents,
  DoctorError,
  ErrorCodes,
  EventNames,
} from '@/actions/shared/global'
import {
  AddMedicalRecordType,
  RecordAccessPermissionType,
  RecordApprovalType,
} from '@/actions/interfaces/Doctor/app.doctor.interface'
import {
  getEmptyBytes32,
  string2Bytes32,
} from '@/actions/shared/utils/bytes.utils'

async function addDoctor(
  hospitalIds: number,
): Promise<{ success: number; doctorId: number }> {
  try {
    const contract = await provideContract()
    const signer = await getSigner()
    const address = await signer.getAddress()
    const transaction = await contract.createDoctor(hospitalIds, address)

    const receipt = await transaction.wait()
    const eventResult = await processEvent(
      receipt,
      EventNames.DoctorAdded,
      ContractEvents.DoctorAdded,
    )

    return {
      success: ErrorCodes.Success,
      doctorId: eventResult.doctorId,
    }
  } catch (error) {
    console.error(error)
    throw new DoctorError('Error adding doctor to contract')
  }
}

async function fetchDoctorId(address: string) {
  try {
    const contract = await provideContract()
    const doctor = await contract.doctors(address)
    return Number(doctor.doctorId)
  } catch (error) {
    console.error(error)
    throw new DoctorError('Error fetching doctor id from contract')
  }
}

async function isApprovedToAddNewRecord(patientId: number) {
  try {
    const contract = await provideContract()
    const signer = await getSigner()
    const address = await signer.getAddress()

    const isApproved = await contract.isApprovedByPatientToAddNewRecord(
      patientId,
      address,
    )
    return isApproved
  } catch (error) {
    console.error(error)
    throw new DoctorError(
      'Error checking if doctor is approved to add new record',
    )
  }
}

async function isApprovedToAddRecord(args: RecordApprovalType) {
  const { patientId, recordId } = args
  try {
    const contract = await provideContract()
    const signer = await getSigner()
    const address = await signer.getAddress()

    const isApproved = await contract.isPatientApprovedDoctors(
      patientId,
      recordId,
      address,
    )
    return isApproved
  } catch (error) {
    console.error(error)
    throw new DoctorError(
      'Error checking if doctor is approved to update existing record',
    )
  }
}

async function validateRecordAccessPermission(
  args: RecordAccessPermissionType,
) {
  const { patientId, recordId } = args
  try {
    const isApproved: boolean = recordId
      ? await isApprovedToAddRecord({ patientId, recordId })
      : await isApprovedToAddNewRecord(patientId)

    return isApproved
  } catch (error) {
    console.error(error)
    throw new DoctorError('Error validating record access permission')
  }
}

async function addMedicalRecord(args: AddMedicalRecordType) {
  const {
    patientAddress,
    patientId,
    diagnosis,
    ipfsHash,
    recordImageHash,
  } = args
  try {
    const doctorAddress = await getSigner().then((signer) =>
      signer.getAddress(),
    )
    const encodedDiagnosis = string2Bytes32(diagnosis)
    const encodedIpfsHash = string2Bytes32(ipfsHash)
    let encodedRecordImageHash

    if (recordImageHash) {
      encodedRecordImageHash = string2Bytes32(recordImageHash)
    } else {
      encodedRecordImageHash = getEmptyBytes32()
    }

    const contract = await provideContract()
    const transaction = await contract.addMedicalRecord(
      doctorAddress,
      patientAddress,
      patientId,
      encodedDiagnosis,
      encodedIpfsHash,
      recordImageHash,
    )

    const receipt = await transaction.wait()
    const eventResult = await processEvent(
      receipt,
      EventNames.MedicalRecordAdded,
      ContractEvents.MedicalRecordAdded,
    )

    return {
      success: ErrorCodes.Success,
      medicalRecordId: eventResult.medicalRecordId,
      patientAddress: eventResult.patient,
      doctorAddress: eventResult.doctor,
    }
  } catch (error) {
    console.error(error)
    throw new DoctorError('Error adding medical record to contract')
  }
}

export {
  addDoctor,
  fetchDoctorId,
  addMedicalRecord,
  isApprovedToAddNewRecord,
  isApprovedToAddRecord,
  validateRecordAccessPermission,
}
