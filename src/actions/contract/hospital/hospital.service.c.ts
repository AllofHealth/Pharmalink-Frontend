import { bytes32ToString } from '@/actions/shared/utils/bytes.utils'
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
} from '@/actions/interfaces/Doctor/app.doctor.interface'

/**
 * todo: implement high order function to determine role of wallet address and serve the correct function to approve practitioner
 */

async function createHospital(
  regNo: string,
): Promise<{ success: number; hospitalId: number }> {
  try {
    const contract = await provideContract()
    const transaction = await contract.createHospital(bytes32ToString(regNo))

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
    const { doctorAddress, doctorId, hospitalId, regNo } = args
    const contract = await provideContract()
    const transaction = await contract.approveDoctor(
      doctorAddress,
      hospitalId,
      doctorId,
      bytes32ToString(regNo),
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
    const { pharmacistAddress, hospitalId, pharmacistId, regNo } = args
    const contract = await provideContract()
    const transaction = await contract.approvePharmacist(
      pharmacistAddress,
      hospitalId,
      pharmacistId,
      bytes32ToString(regNo),
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

async function approvePractitioner() {}

export { createHospital, approveDoctor, approvePharmacist }
