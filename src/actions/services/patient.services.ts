'use server'

import { PatientService } from '../contract/patient/patient.service.c'
import { ContractProvider } from '../contract/provider/contract.provider'
import { DatabaseServiceProviders } from '../database/providers/db.providers'
import {
  ContractError,
  PatientError,
  PatientServiceError,
} from '../shared/global'

class SuperPatientService {
  async createPatient(
    name: string,
    age: number,
    address: string,
    city: string,
    bloodGroup: string,
    genotype: string,
  ) {
    try {
      const signer = await ContractProvider.Factory().getSigner()
      const walletAddress = await signer.getAddress()

      if (!walletAddress) {
        throw new PatientServiceError('Wallet address not found')
      }

      // Attempt to add patient to the contract
      const { patientId } = await PatientService.addPatient()
      if (!patientId) {
        throw new ContractError('Failed to add patient to contract')
      }

      // If the contract call was successful, proceed to save the patient in the database
      return await DatabaseServiceProviders.PatientDatabaseServices.createNewPatient(
        {
          id: patientId,
          name,
          age,
          address,
          city,
          walletAddress,
          bloodGroup,
          genotype,
        },
      )
    } catch (error) {
      if (error instanceof PatientError || error instanceof ContractError) {
        throw new PatientServiceError(error.message)
      }
      console.error('Unexpected error in createPatient:', error)
      throw new PatientServiceError(
        'An unexpected error occurred while creating patient',
      )
    }
  }
}

export const superPatientService = new SuperPatientService()
