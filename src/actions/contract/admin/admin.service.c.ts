import { processEvent } from '../../shared/utils/EventLogger/event.processor'
import { provideContract } from '../provider/contract.provider'
import {
  AdminError,
  ContractEvents,
  ErrorCodes,
  EventNames,
} from '../../shared/global'

async function createSystemAdmin(
  address: string,
): Promise<{ success: number; adminId: number }> {
  try {
    const contract = await provideContract()
    const transaction = await contract.addSystemAdmin(address)

    const receipt = await transaction.wait()
    const eventResult = await processEvent(
      receipt,
      EventNames.SystemAdminAdded,
      ContractEvents.SystemAdminAdded,
    )

    return {
      success: ErrorCodes.Success,
      adminId: Number(eventResult.adminId),
    }
  } catch (error) {
    console.error(error)
    throw new AdminError('Error adding admin to contract')
  }
}

async function removeAdmin(address: string) {
  try {
    const contract = await provideContract()
    const isSystemAdmin = await contract.systemAdmins(address)
    if (!isSystemAdmin) {
      return {
        success: ErrorCodes.NotFound,
        message: 'Admin not found',
      }
    }

    const transaction = await contract.removeSystemAdmin(address)
    const receipt = await transaction.wait()
    const eventResult = await processEvent(
      receipt,
      EventNames.SystemAdminRemoved,
      ContractEvents.SystemAdminRemoved,
    )

    const addressRemoved = String(eventResult.admin)

    return {
      success: ErrorCodes.Success,
      adminId: Number(eventResult.adminId),
      removedAddress: addressRemoved,
    }
  } catch (error) {
    console.error(error)
    throw new AdminError('Error removing admin from contract')
  }
}

async function approveHospital(hospitalId: number) {
  try {
    const contract = await provideContract()
    const transaction = await contract.approveHospital(hospitalId)

    const receipt = await transaction.wait()
    const eventResult = await processEvent(
      receipt,
      EventNames.HospitalApproved,
      ContractEvents.HospitalApproved,
    )

    return {
      success: ErrorCodes.Success,
      hospitalId: Number(eventResult.hospitalId),
    }
  } catch (error) {
    console.error(error)
    throw new AdminError(
      'An error occurred while approving hospital, are you admin?',
    )
  }
}

export { createSystemAdmin, approveHospital, removeAdmin }
