import { processEvent } from '@/actions/shared/utils/EventLogger/event.processor'
import { provideContract, getSigner } from '../provider/contract.provider'
import {
  ContractEvents,
  ErrorCodes,
  EventNames,
  PatientError,
} from '@/actions/shared/global'

async function addPatient(): Promise<{
  success: number
  patientId: number
  walletAddress: string
}> {
  try {
    const contract = await provideContract()
    const walletAddress = await getSigner().then((signer) =>
      signer.getAddress(),
    )
    const transaction = await contract.addPatient()

    const receipt = await transaction.wait()

    const eventResult = await processEvent(
      receipt,
      EventNames.PatientAdded,
      ContractEvents.PatientAdded,
    )

    return {
      success: ErrorCodes.Success,
      patientId: eventResult.patientId,
      walletAddress,
    }
  } catch (error) {
    console.error(error)
    throw new PatientError('Error adding patient to contract')
  }
}

async function fetchPatientId(address: string) {
  try {
    const contract = await provideContract()
    const patient = await contract.patients(address)
    return Number(patient.patientId)
  } catch (error) {
    console.error(error)
    throw new PatientError('Error fetching patient from contract')
  }
}

export { addPatient, fetchPatientId }
