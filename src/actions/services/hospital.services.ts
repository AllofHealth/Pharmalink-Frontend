'use server'

import { HospitalService } from '../contract/hospital/hospital.service.c'
import { ContractProvider } from '../contract/provider/contract.provider'
import { DatabaseServiceProviders } from '../database/providers/db.providers'
import { EnsureDbConnection } from '../decorators/ensure_conntection'
import type { AddHospitalArgs } from '../interfaces/Hospital/app.hospital.interface'
import {
  ContractError,
  HospitalError,
  HospitalServiceError,
} from '../shared/global'

class SuperHospitalService {
  @EnsureDbConnection
  
  async createHospital(args: AddHospitalArgs) {
    const provider = ContractProvider.Factory()
    const { name, email, location, phoneNo, regNo } = args

    try {
      const signer = await provider.getSigner()
      const walletAddress = await signer.getAddress()

      if(!walletAddress) { 
        throw new HospitalServiceError(
          'wallet address not found, please connect wallet',
        )
      }

      const {hospitalId} = await HospitalService.createHospital(regNo);

      if(!hospitalId) { 
        throw new ContractError('Failed to add hospital to contract')
      }

      return await DatabaseServiceProviders.HospitalDatabaseServices.createHospital({
        id: hospitalId as number,
        name,
        email,
        location,
        phoneNo,
        regNo,
        admin: walletAddress
        
      })
    } catch (error) {
      if (error instanceof HospitalError || error instanceof ContractError) {
        throw new HospitalServiceError(error.message)
      }
      console.error('Unexpected error in createDoctor:', error)
      throw new HospitalServiceError(
        'An unexpected error occurred while creating doctor',
      )
    }
  }
}

export const superHospitalService = new SuperHospitalService()
