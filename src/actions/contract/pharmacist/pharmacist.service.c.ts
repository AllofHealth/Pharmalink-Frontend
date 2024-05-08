import { processEvent } from '@/actions/shared/utils/EventLogger/event.processor'
import { provideContract, getSigner } from '../provider/contract.provider'
import { string2Bytes32 } from '@/actions/shared/utils/bytes.utils'
import {
  ContractEvents,
  ErrorCodes,
  EventNames,
  PharmacistError,
} from '@/actions/shared/global'

async function addPharmacist(
  hospitalIds: number,
  regNo: string,
): Promise<{ success: number; pharmacistId: number; address: string }> {
  try {
    const contract = await provideContract()
    const address = await getSigner().then((signer) => signer.getAddress())

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
      pharmacistId: eventResult.pharmacistId,
      address,
    }
  } catch (error) {
    console.error(error)
    throw new PharmacistError('Error adding pharmacist to contract')
  }
}

export default addPharmacist
