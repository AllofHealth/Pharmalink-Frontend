import { processEvent } from '@/actions/shared/utils/EventLogger/event.processor'
import { provideContract, getSigner } from '../provider/contract.provider'

import {
  ContractEvents,
  ErrorCodes,
  EventNames,
  PharmacistError,
} from '@/actions/shared/global'

async function addPharmacist(
  hospitalIds: number,
): Promise<{ success: number; pharmacistId: number; address: string }> {
  try {
    const contract = await provideContract()
    const signer = await getSigner()
    const address = await signer.getAddress()

    const transaction = await contract.createPharmacist(hospitalIds, address)

    const receipt = await transaction.wait()
    const eventResult = await processEvent(
      receipt,
      EventNames.PharmacistAdded,
      ContractEvents.PharmacistAdded,
    )

    return {
      success: ErrorCodes.Success,
      pharmacistId: eventResult.pharmacistId,
      address,
    }
  } catch (error) {
    console.error(error)
    throw new PharmacistError('Error adding pharmacist to contract')
  }
}

async function fetchPharmacistId(address: string) {
  try {
    const contract = await provideContract()
    const pharmacist = await contract.pharmacists(address)
    return Number(pharmacist.pharmacistId)
  } catch (error) {
    console.error(error)
    throw new PharmacistError('Error fetching pharmacist id from contract')
  }
}

export { addPharmacist, fetchPharmacistId }
