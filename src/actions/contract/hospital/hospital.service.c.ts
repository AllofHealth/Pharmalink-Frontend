import { provideContract } from '../provider/contract.provider'
import { processEvent } from '@/actions/shared/utils/EventLogger/event.processor'
import {
  ContractEvents,
  ErrorCodes,
  EventNames,
  HospitalError,
} from '@/actions/shared/global'
import {
  ApproveDoctorType,
  ApprovePharmacistType,
  ApprovePractitionerType,
} from '@/actions/interfaces/Hospital/app.hospital.interface'

async function createHospital(): Promise<{
  success: number
  hospitalId: number
}> {
  try {
    const contract = await provideContract()
    const transaction = await contract.createHospital()

    const receipt = await transaction.wait()

    const eventResult = await processEvent(
      receipt,
      EventNames.HospitalCreated,
      ContractEvents.HospitalCreated,
    )

    return {
      success: ErrorCodes.Success,
      hospitalId: eventResult.hospitalId,
    }
  } catch (error) {
    console.error(error)
    throw new HospitalError('Error creating hospital')
  }
}

async function approveDoctor(args: ApproveDoctorType) {
  try {
    const { doctorAddress, doctorId, hospitalId } = args
    const contract = await provideContract()
    const transaction = await contract.approveDoctor(
      doctorAddress,
      hospitalId,
      doctorId,
    )

    const receipt = await transaction.wait()
    const eventResult = await processEvent(
      receipt,
      EventNames.DoctorApproved,
      ContractEvents.DoctorApproved,
    )

    return {
      success: ErrorCodes.Success,
      doctorId: eventResult.doctorId,
      hospitalId: eventResult.hospitalId,
      doctorAddress: eventResult.doctor,
    }
  } catch (error) {
    console.error(error)
    throw new HospitalError('Error approving doctor')
  }
}

async function approvePharmacist(args: ApprovePharmacistType) {
  try {
    const { pharmacistAddress, hospitalId, pharmacistId } = args
    const contract = await provideContract()
    const transaction = await contract.approvePharmacist(
      pharmacistAddress,
      hospitalId,
      pharmacistId,
    )

    const receipt = await transaction.wait()
    const eventResult = await processEvent(
      receipt,
      EventNames.PharmacistApproved,
      ContractEvents.PharmacistApproved,
    )

    return {
      success: ErrorCodes.Success,
      pharmacistId: eventResult.pharmacistId,
      hospitalId: eventResult.hospitalId,
      pharmacistAddress: eventResult.pharmacist,
    }
  } catch (error) {
    console.error(error)
    throw new HospitalError('Error approving pharmacist')
  }
}

async function determinePractitionerRole(practitionerAddress: string) {
  let isDoctor = false;
  let isPharmacist = false;
  try {
    const contract = await provideContract()
    isDoctor = await contract.isDoctor(practitionerAddress)
    isPharmacist = await contract.isPharmacist(practitionerAddress);

    return {isDoctor, isPharmacist}
  } catch (error) {
    console.error(error)
    throw new Error('An error occurred while determining practitioner role')
  }
}

async function approvePractitioner(args: ApprovePractitionerType) {
  const { practitionerAddress, hospitalId, practitionerId } = args
  try {
    const { isDoctor, isPharmacist } = await determinePractitionerRole(
      practitionerAddress,
    )
    if (isDoctor) {
      return await approveDoctor({
        doctorAddress: practitionerAddress,
        doctorId: practitionerId,
        hospitalId,
      })
    } else if (isPharmacist) {
      return await approvePharmacist({
        pharmacistAddress: practitionerAddress,
        pharmacistId: practitionerId,
        hospitalId,
      })
    }
  } catch (error) {
    console.error(error)
    throw new HospitalError('An error occurred while approving practitioner')
  }
}

export { createHospital, approvePractitioner }
