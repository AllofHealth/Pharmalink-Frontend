import { processEvent } from '@/actions/shared/utils/EventLogger/event.processor'
import { provideContract, getSigner } from '../provider/contract.provider'
import {
  ContractEvents,
  DoctorError,
  ErrorCodes,
  EventNames,
} from '@/actions/shared/global'

async function addDoctor(
  hospitalIds: number,
): Promise<{ success: number; doctorId: number }> {
  try {
    const contract = await provideContract()
    const signer = await getSigner()
    const address = await signer.getAddress()
    const transaction = await contract.createDoctor(hospitalIds, address)

    const receipt = await transaction.wait()
    const eventResult = await processEvent(
      receipt,
      EventNames.DoctorAdded,
      ContractEvents.DoctorAdded,
    )

    return {
      success: ErrorCodes.Success,
      doctorId: eventResult.doctorId,
    }
  } catch (error) {
    console.error(error)
    throw new DoctorError('Error adding doctor to contract')
  }
}

async function fetchDoctorId(address: string) {
  try {
    const contract = await provideContract()
    const doctor = await contract.doctors(address)
    return Number(doctor.doctorId)
  } catch (error) {
    console.error(error)
    throw new DoctorError('Error fetching doctor id from contract')
  }
}

export { addDoctor, fetchDoctorId }
