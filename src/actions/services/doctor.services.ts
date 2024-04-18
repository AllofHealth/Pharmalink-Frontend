import { DoctorService } from '../contract/doctor/doctor.service.c'
import { ContractProvider } from '../contract/provider/contract.provider'
import { DatabaseServiceProviders } from '../database/providers/db.providers'
import { EnsureDbConnection } from '../decorators/ensure_conntection'
import type { RegisterDoctor } from '../interfaces/Doctor/app.doctor.interface'
import {
  ContractError,
  DoctorError,
  DoctorServiceError,
} from '../shared/global'

class SuperDoctorService {
  @EnsureDbConnection
  async createDoctor(args: RegisterDoctor) {
    const {
      hospitalIds,
      name,
      email,
      specialty,
      location,
      phoneNumber,
      regNo,
    } = args

    try {
      const signer = await ContractProvider.Factory().getSigner()
      const walletAddress = await signer.getAddress()

      if (!walletAddress) {
        throw new DoctorServiceError(
          'wallet address not found, please connect wallet',
        )
      }

      const { doctorId } = await DoctorService.addDoctor(
        hospitalIds as number,
        regNo,
      )

      if (!doctorId) {
        throw new ContractError('Failed to add doctor to contract')
      }

      return await DatabaseServiceProviders.DoctorDatabaseServices.createDoctor(
        {
          id: doctorId,
          hospitalIds,
          name,
          email,
          specialty,
          location,
          phoneNumber,
          walletAddress,
          regNo,
        },
      )
    } catch (error) {
      if (error instanceof DoctorError || error instanceof ContractError) {
        throw new DoctorServiceError(error.message)
      }
      console.error('Unexpected error in createDoctor:', error)
      throw new DoctorServiceError(
        'An unexpected error occurred while creating doctor',
      )
    }
  }
}

export const superDoctorService = new SuperDoctorService()
