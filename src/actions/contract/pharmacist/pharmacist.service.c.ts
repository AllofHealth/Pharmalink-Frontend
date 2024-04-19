'use server'
import { processEvent } from '@/actions/shared/utils/EventLogger/event.processor'
import { ContractProvider } from '../provider/contract.provider'
import { string2Bytes32 } from '@/actions/shared/utils/bytes.utils'
import {
  ContractEvents,
  ErrorCodes,
  EventNames,
  PharmacistError,
} from '@/actions/shared/global'

class Pharmacist {
  async addPharmacist(
    hospitalIds: number,
    regNo: string,
  ): Promise<{ success: number; pharmacistId: number }> {
    try {
      const contract = await ContractProvider.Factory().provideContract()
      const signer = await ContractProvider.Factory().getSigner()
      const address = await signer.getAddress()
      const transaction = await contract.createPharmacist(
        hospitalIds,
        address,
        string2Bytes32(regNo),
      )

      const receipt = await transaction.wait()
      const eventResult = await processEvent(
        receipt,
        EventNames.PharmacistAdded,
        ContractEvents.PharmacistAdded,
      )

      return {
        success: ErrorCodes.Success,
        pharmacistId: eventResult.pharmacistId.toNumber(),
      }
    } catch (error) {
      console.error(error)
      throw new PharmacistError('Error adding pharmacist to contract')
    }
  }
}

export const PharmacistService = new Pharmacist()
