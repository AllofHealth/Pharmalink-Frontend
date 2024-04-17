'use server'

import { processEvent } from '@/actions/shared/utils/EventLogger/event.processor'
import { ContractProvider } from '../provider/contract.provider'
import {
  ContractEvents,
  ErrorCodes,
  EventNames,
  PatientError,
} from '@/actions/shared/global'

class Patient {
  async addPatient(): Promise<{ success: number; patientId: number }> {
    try {
      const contract = await ContractProvider.Factory().provideContract()
      const transaction = await contract.addPatient()

      const receipt = await transaction.wait()

      const eventResult = await processEvent(
        receipt,
        EventNames.PatientAdded,
        ContractEvents.PatientAdded,
      )

      return {
        success: ErrorCodes.Success,
        patientId: eventResult.patientId.toNumber(),
      }
    } catch (error) {
      console.error(error)
      throw new PatientError('Error adding patient to contract')
    }
  }
}

export const PatientService = new Patient()
