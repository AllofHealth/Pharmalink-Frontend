'use server'

import { processEvent } from '@/actions/shared/utils/EventLogger/event.processor'
import { ContractProvider } from '../provider/contract.provider'
import {
  AdminError,
  ContractEvents,
  ErrorCodes,
  EventNames,
} from '@/actions/shared/global'

export class Admin {
  private provider = ContractProvider.Factory()

  async createSystemAdmin(
    address: string,
  ): Promise<{ success: number; adminId: number }> {
    try {
      const contract = await this.provider.provideContract()
      const transaction = await contract.addSystemAdmin(address)

      const receipt = await transaction.wait()
      const eventResult = await processEvent(
        receipt,
        EventNames.SystemAdminAdded,
        ContractEvents.SystemAdminAdded,
      )

      return {
        success: ErrorCodes.Success,
        adminId: eventResult.adminId.toNumber(),
      }
    } catch (error) {
      console.error(error)
      throw new AdminError('Error adding admin to contract')
    }
  }
}

export const adminService = new Admin()
