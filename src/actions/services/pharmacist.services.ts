'use server'

import { PharmacistService } from '../contract/pharmacist/pharmacist.service.c'
import { ContractProvider } from '../contract/provider/contract.provider'
import { DatabaseServiceProviders } from '../database/providers/db.providers'
import { EnsureDbConnection } from '../decorators/ensure_conntection'
import type { RegisterPharmacist } from '../interfaces/Pharmacist/app.pharmacist.interface'
import {
  ContractError,
  PharmacistError,
  PharmacistServiceError,
} from '../shared/global'

class SuperPharmacistService {
  @EnsureDbConnection
  async createPharmacist(args: RegisterPharmacist) {
    const { hospitalIds, name, email, location, phoneNumber, regNo } = args

    try {
      const signer = await ContractProvider.Factory().getSigner()
      const walletAddress = await signer.getAddress()

      if (!walletAddress) {
        throw new PharmacistServiceError(
          'wallet address not found, please connect wallet',
        )
      }

      const { pharmacistId } = await PharmacistService.addPharmacist(
        hospitalIds as number,
        regNo,
      )

      if (!pharmacistId) {
        throw new ContractError('Failed to add pharmacist to contract')
      }

      return await DatabaseServiceProviders.PharmacistDatabaseServices.createPharmacist(
        {
          id: pharmacistId,
          hospitalIds,
          name,
          email,
          location,
          phoneNumber,
          walletAddress,
          regNo,
        },
      )
    } catch (error) {
      if (error instanceof PharmacistError || error instanceof ContractError) {
        throw new PharmacistServiceError(error.message)
      }
      console.error('Unexpected error ocurred in createPharmacist:', error)
      throw new PharmacistServiceError(
        'Unexpected error ocurred in createPharmacist',
      )
    }
  }
}

export const superPharmacistService = new SuperPharmacistService()
