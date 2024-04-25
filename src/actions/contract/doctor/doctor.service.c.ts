'use server'
import { processEvent } from '@/actions/shared/utils/EventLogger/event.processor'
import { ContractProvider } from '../provider/contract.provider'
import {
  ContractEvents,
  DoctorError,
  ErrorCodes,
  EventNames,
} from '@/actions/shared/global'
import { string2Bytes32 } from '@/actions/shared/utils/bytes.utils'

class Doctor {
  private provider = ContractProvider.Factory()
  async addDoctor(
    hospitalIds: number,
    regNo: string,
  ): Promise<{ success: number; doctorId: number }> {
    try {
      const contract = await this.provider.provideContract()
      const signer = await this.provider.getSigner()
      const address = await signer.getAddress()
      const transaction = await contract.createDoctor(
        hospitalIds,
        address,
        string2Bytes32(regNo),
      )

      const receipt = await transaction.wait()
      const eventResult = await processEvent(
        receipt,
        EventNames.DoctorAdded,
        ContractEvents.DoctorAdded,
      )

      return {
        success: ErrorCodes.Success,
        doctorId: eventResult.doctorId.toNumber(),
      }
    } catch (error) {
      console.error(error)
      throw new DoctorError('Error adding doctor to contract')
    }
  }
}

export const DoctorService = new Doctor()
