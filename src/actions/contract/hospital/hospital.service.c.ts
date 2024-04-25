'use server'

import { bytes32ToString } from '@/actions/shared/utils/bytes.utils'
import { ContractProvider } from '../provider/contract.provider'
import { processEvent } from '@/actions/shared/utils/EventLogger/event.processor'
import {
  ContractEvents,
  ErrorCodes,
  EventNames,
  HospitalError,
} from '@/actions/shared/global'

class Hospital {
  private provider = ContractProvider.Factory()
  async createHospital(
    regNo: string,
  ): Promise<{ success: number; hospitalId: number }> {
    try {
      const contract = await this.provider.provideContract()
      const transaction = await contract.createHospital(bytes32ToString(regNo))

      const receipt = await transaction.wait()

      const eventResult = await processEvent(
        receipt,
        EventNames.HospitalCreated,
        ContractEvents.HospitalCreated,
      )

      return {
        success: ErrorCodes.Success,
        hospitalId: eventResult.hospitalId.toNumber(),
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error creating hospital')
    }
  }
}

export const HospitalService = new Hospital()
