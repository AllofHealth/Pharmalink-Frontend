'use server'

import { PatientService } from '../contract/patient/patient.service.c'
import { ContractProvider } from '../contract/provider/contract.provider'
import { DatabaseServiceProviders } from '../database/providers/db.providers'
import type { RegisterPatient } from '../interfaces/Patient/app.patient.interface'
import { EnsureConnection } from '../decorators/ensure_conntection'
import {
  ContractError,
  PatientError,
  PatientServiceError,
} from '../shared/global'

class SuperPatientService {
  @EnsureConnection()
  async createPatient(args: RegisterPatient) {
    const { name, age, address, city, bloodGroup, genotype } = args
    try {
      const signer = await ContractProvider.Factory().getSigner()
      const walletAddress = await signer.getAddress()

      if (!walletAddress) {
        throw new PatientServiceError(
          'Wallet address not found, please connect wallet',
        )
      }

      const { patientId } = await PatientService.addPatient()
      if (!patientId) {
        throw new ContractError('Failed to add patient to contract')
      }

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
