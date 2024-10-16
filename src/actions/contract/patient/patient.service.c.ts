import { processEvent } from '@/actions/shared/utils/EventLogger/event.processor'
import { provideContract, getSigner } from '../provider/contract.provider'
import {
  ContractEvents,
  ErrorCodes,
  EventNames,
  PatientError,
} from '@/actions/shared/global'
import {
  ApproveExistingRecordAccessForFamilyMemberType,
  ApproveMedicalRecordAccessType,
  ApproveNewRecordAccessForFamilyMemberType,
  IPractitionerAccess,
  IPractitionerFamilyMemberAccess,
  RecordApprovalType,
  RevokeMedicalRecordAccessType,
  ViewMedicalRecordType,
} from '@/actions/interfaces/Patient/app.patient.interface'

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
    const transaction = await contract.approveAccessToAddNewRecord(
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

async function checkPractitionerAccess(args: IPractitionerAccess) {
  const { practitionerAddress, patientId, recordId } = args
  try {
    const contract = await provideContract()
    const hasAccess = await contract.viewerHasAccessToMedicalRecord(
      practitionerAddress,
      patientId,
      recordId,
    )

    return hasAccess
  } catch (error) {
    console.error(error)
    throw new PatientError('Error checking practitioner access')
  }
}

async function checkPractitionerAccessToFamilyMemberRecords(
  args: IPractitionerFamilyMemberAccess,
) {
  const { practitionerAddress, patientId, familyMemberId, recordId } = args
  try {
    const contract = await provideContract()
    const hasAccess = await contract.viewerHasAccessToPatientFamilyMemberMedicalRecord(
      practitionerAddress,
      patientId,
      familyMemberId,
      recordId,
    )

    return hasAccess
  } catch (error) {
    console.error(error)
    throw new PatientError(
      'Error checking practitioner access to family member records',
    )
  }
}

async function approveAccessToExistingRecord(
  args: ApproveMedicalRecordAccessType,
) {
  const { practitionerAddress, patientId, recordId, durationInSeconds } = args
  try {
    const contract = await provideContract()
    const viewerHasAccess = await checkPractitionerAccess({
      practitionerAddress,
      patientId,
      recordId: recordId as number,
    })

    if (viewerHasAccess) {
      return {
        success: ErrorCodes.Error,
        message: 'Viewer already have access to this record',
      }
    }
    const transaction = await contract.approveMedicalRecordAccess(
      practitionerAddress,
      patientId,
      recordId,
      durationInSeconds,
    )
    const receipt = await transaction.wait()

    const eventResult = await processEvent(
      receipt,
      EventNames.ReadAccessGranted,
      ContractEvents.ReadAccessGranted,
    )

    return {
      success: ErrorCodes.Success,
      doctorAddress: eventResult.approvedDoctor,
      patientAddress: eventResult.patient,
      medicalRecordId: eventResult.medicalRecordId,
      message: 'Read Access Granted',
    }
  } catch (error) {
    console.error(error)
    throw new PatientError('Error approving medical record access')
  }
}

async function approveMedicalRecordAccess(
  approvalType: RecordApprovalType,
  args: ApproveMedicalRecordAccessType,
) {
  const { practitionerAddress, patientId, recordId } = args
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

    switch (approvalType) {
      case 'view':
        const readResult = await approveAccessToExistingRecord(args)
        if (readResult.success === ErrorCodes.Error) {
          return {
            success: ErrorCodes.Error,
            message: readResult.message,
          }
        }
        return {
          ...readResult,
        }

      case 'modify':
        const writeResult = await approveAccessToAddNewMedicalRecord(
          practitionerAddress,
          patientId,
        )
        return {
          ...writeResult,
        }

      case 'view & modify':
        if (recordId) {
          const readResult = await approveAccessToExistingRecord(args)
          if (readResult.success === ErrorCodes.Error) {
            return {
              success: ErrorCodes.Error,
              message: readResult.message,
            }
          }
          if (readResult.success === ErrorCodes.Success) {
            const writeResult = await approveAccessToAddNewMedicalRecord(
              practitionerAddress,
              patientId,
            )
            return {
              success: ErrorCodes.Success,
              patientId: writeResult.patientId,
              recordId: readResult.medicalRecordId,
              message: 'full access granted',
            }
          }
          throw new Error('an error occurred while granting full access')
        } else {
          const writeResult = await approveAccessToAddNewMedicalRecord(
            practitionerAddress,
            patientId,
          )
          return {
            writeAccessGranted: writeResult,
          }
        }
    }
  } catch (error) {
    console.error('Error approving medical record access')
  }
}

async function revokeMedicalRecordAccess(args: RevokeMedicalRecordAccessType) {
  const { patientId, recordId, doctorAddress } = args
  try {
    const contract = await provideContract()
    const transaction = await contract.revokeMedicalRecordAccess(
      patientId,
      recordId,
      doctorAddress,
    )

    const receipt = await transaction.wait()
    const eventResult = await processEvent(
      receipt,
      EventNames.RecordAccessRevoked,
      ContractEvents.RecordAccessRevoked,
    )

    return {
      success: ErrorCodes.Success,
      revokedDoctor: eventResult.approvedDoctor,
      recordId: eventResult.medicalRecordId,
      patientAddress: eventResult.patient,
    }
  } catch (error) {
    console.error(error)
    throw new PatientError(
      'An error occurred while revoking medical record access',
    )
  }
}

async function viewMedicalRecord(args: ViewMedicalRecordType) {
  const { recordId, patientId, viewerAddress } = args
  try {
    const contract = await provideContract()
    const transaction = await contract.viewMedicalRecord(
      recordId,
      patientId,
      viewerAddress,
    )

    const receipt = await transaction.wait()
    const eventResult = await processEvent(
      receipt,
      EventNames.MedicalRecordAccessed,
      ContractEvents.MedicalRecordAccessed,
    )

    return {
      recordDetailsUri: eventResult.recordDetailsUri,
    }
  } catch (error) {
    console.error(error)
    throw new PatientError('An error occurred while accessing medical record')
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

async function approveAccessToAddNewMedicalRecordForFamilyMember(
  args: ApproveNewRecordAccessForFamilyMemberType,
) {
  const { doctorAddress, familyMemberId, principalPatientId } = args
  try {
    const contract = await provideContract()
    const transaction = await contract.approveAccessToAddNewRecordForFamilyMember(
      doctorAddress,
      familyMemberId,
      principalPatientId,
    )
    const receipt = await transaction.wait()

    const eventResult = await processEvent(
      receipt,
      EventNames.WriteAccessGranted,
      ContractEvents.WriteAccessGranted,
    )

    return {
      success: ErrorCodes.Success,
      familyMemberId: Number(eventResult.patientId),
      doctorAddress,
      message: 'Write Access Granted',
    }
  } catch (error) {
    console.error(error)
    throw new PatientError(
      'An error occurred while approving new medical record access for family member',
    )
  }
}

async function approveAccessToExistingFamilyMemberMedicalRecord(
  args: ApproveExistingRecordAccessForFamilyMemberType,
) {
  const {
    practitionerAddress,
    familyMemberId,
    patientId,
    recordId,
    durationInSeconds,
  } = args
  try {
    const contract = await provideContract()
    const viewerHasAccess = await checkPractitionerAccessToFamilyMemberRecords({
      practitionerAddress,
      patientId,
      familyMemberId,
      recordId: recordId as number,
    })

    if (viewerHasAccess) {
      return {
        success: ErrorCodes.Error,
        message: 'Viewer already has access to this record',
      }
    }
    const transaction = await contract.approveFamilyMemberMedicalRecordAccess(
      practitionerAddress,
      patientId,
      familyMemberId,
      recordId,
      durationInSeconds,
    )

    const receipt = await transaction.wait()

    const eventResult = await processEvent(
      receipt,
      EventNames.ReadAccessGranted,
      ContractEvents.ReadAccessGranted,
    )

    return {
      success: ErrorCodes.Success,
      doctorAddress: eventResult.approvedDoctor,
      patientAddress: eventResult.patient,
      medicalRecordId: Number(eventResult.medicalRecordId),
      message: 'Read Access Granted',
    }
  } catch (error) {
    console.error(error)
    throw new PatientError(
      'An error occurred while approving existing medical record access for family member',
    )
  }
}

async function approveFamilyMemberMedicalRecordAccess(
  approvalType: RecordApprovalType,
  args: ApproveExistingRecordAccessForFamilyMemberType,
) {
  const { practitionerAddress, familyMemberId, patientId, recordId } = args
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
    switch (approvalType) {
      case 'view':
        const readResult = await approveAccessToExistingFamilyMemberMedicalRecord(
          args,
        )

        if (readResult.success === ErrorCodes.Error) {
          return {
            success: ErrorCodes.Error,
            message: readResult.message,
          }
        }

        return {
          ...readResult,
        }
      case 'modify':
        const writeResult = await approveAccessToAddNewMedicalRecordForFamilyMember(
          {
            doctorAddress: practitionerAddress,
            familyMemberId,
            principalPatientId: patientId,
          },
        )

        return {
          ...writeResult,
        }
      case 'view & modify':
        if (recordId) {
          const readResult = await approveAccessToExistingFamilyMemberMedicalRecord(
            args,
          )

          if (readResult.success === ErrorCodes.Error) {
            return {
              success: ErrorCodes.Error,
              message: readResult.message,
            }
          }

          if (readResult.success === ErrorCodes.Success) {
            const writeResult = await approveAccessToAddNewMedicalRecordForFamilyMember(
              {
                doctorAddress: practitionerAddress,
                familyMemberId,
                principalPatientId: patientId,
              },
            )

            if (writeResult.success === ErrorCodes.Success) {
              return {
                success: ErrorCodes.Success,
                familyMemberId: Number(writeResult.familyMemberId),
                doctorAddress: readResult.doctorAddress,
                message: 'Full Access Granted',
              }
            }
          }

          throw new Error('an error occurred while granting full access')
        } else {
          const fullWriteResult = await approveAccessToAddNewMedicalRecordForFamilyMember(
            {
              doctorAddress: practitionerAddress,
              familyMemberId,
              principalPatientId: patientId,
            },
          )

          return {
            writeAccessGranted: fullWriteResult,
          }
        }
    }
  } catch (error) {
    console.error(error)
    throw new Error('An error occurred while approving medical record access')
  }
}

export {
  addPatient,
  fetchPatientId,
  addPatientFamilyMember,
  approveMedicalRecordAccess,
  revokeMedicalRecordAccess,
  viewMedicalRecord,
  approveFamilyMemberMedicalRecordAccess,
  getPatientRecordCount,
}
