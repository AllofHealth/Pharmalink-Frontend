'use server'

/**
 * @author 3illBaby
 * @description service functions for doctors
 */

import { DoctorError, ErrorCodes, ProfileType } from '@/actions/shared/global'
import { DatabaseProvider } from '../../providers/db.providers'
import { CreateDoctorType, DoctorType } from '../interface/doctor.interface'
import { PreviewType } from '../../hospital/interface/hospital.interface'

class doctorHelpers {
  private DB = DatabaseProvider.DoctorProvider

  async fetchPendingDoctors(): Promise<{
    success: number
    doctors: DoctorType[]
  }> {
    try {
      const doctors = await this.DB.fetchDoctorWithPendingStatus()
      if (!doctors) {
        return {
          success: ErrorCodes.NotFound,
          doctors: [],
        }
      }

      return {
        success: ErrorCodes.Success,
        doctors,
      }
    } catch (error) {
      console.error(error)
      throw new DoctorError('Error fetching doctors')
    }
  }

  async fetchApprovedDoctors(): Promise<{
    success: number
    doctors: DoctorType[]
  }> {
    try {
      const doctors = await this.DB.fetchDoctorWithApprovedStatus()
      if (!doctors) {
        return {
          success: ErrorCodes.NotFound,
          doctors: [],
        }
      }

      return {
        success: ErrorCodes.Success,
        doctors,
      }
    } catch (error) {
      console.error(error)
      throw new DoctorError('Error fetching approved doctors')
    }
  }

  async validateDoctorExistsInHospital(
    hospitalId: number,
    doctorAddress: string,
  ): Promise<boolean> {
    if (!hospitalId) {
      throw new DoctorError('Invalid or missing doctor address')
    }

    let doctorExists: boolean = false

    try {
      const hospital = await DatabaseProvider.HospitalProvider.fetchHospitalWithBlockchainId(
        hospitalId,
      )
      if (!hospital) {
        throw new DoctorError('Hospital not found')
      }

      const doctor = hospital.doctors.find(
        (doctor: PreviewType) => doctor.walletAddress === doctorAddress,
      )
      if (doctor) {
        doctorExists = true
      }

      return doctorExists
    } catch (error) {
      console.error(error)
      throw new DoctorError('Error validating doctor exists in hospital')
    }
  }

  async validateDoctorExists(address: string) {
    try {
      const doctor = await this.DB.fetchDoctorByAddress(address)

      if (!doctor) throw new DoctorError('Doctor not found')
      return doctor
    } catch (error) {
      console.error(error)
      throw new DoctorError('Error validating doctor exists')
    }
  }
}

export const DoctorHelpers = new doctorHelpers()

/**
 * todo implement function to add to patient record
 */
class doctorService {
  private DB = DatabaseProvider.DoctorProvider
  private HospitalDB = DatabaseProvider.HospitalProvider
  private Helper = DoctorHelpers

  async createDoctor(
    args: CreateDoctorType,
  ): Promise<{ success: number; doctor: DoctorType; message: string }> {
    const requiredParams = [
      'id',
      'email',
      'regNo',
      'phoneNumber',
      'specialty',
      'location',
      'walletAddress',
    ]

    if (
      !requiredParams.every((param) => args[param as keyof CreateDoctorType])
    ) {
      throw new DoctorError('Missing required parameter')
    }

    if (
      await this.Helper.validateDoctorExistsInHospital(
        args.hospitalIds as number,
        args.walletAddress,
      )
    ) {
      throw new DoctorError('Doctor already exists in hospital')
    }

    try {
      const hospital = await this.HospitalDB.fetchHospitalWithBlockchainId(
        args.hospitalIds as number,
      )

      if (!hospital) {
        throw new DoctorError("Hospital doesn't exist")
      }

      let doctor = await this.DB.createNewDoctor(args)
      doctor = await this.DB.fetchDoctorByAddress(args.walletAddress)

      doctor.hospitalIds.push(args.hospitalIds)

      const doctorPreview = {
        walletAddress: doctor.walletAddress,
        profilePicture: doctor.profilePicture,
        name: doctor.name,
        regNo: doctor.regNo,
        status: doctor.status,
      }

      try {
        hospital.doctors.push(doctorPreview)
      } catch (error) {
        await this.DB.deleteDoctor(args.walletAddress)
        throw new Error('Error adding doctor to hospital')
      }

      await doctor.save()
      await hospital.save()

      return {
        success: ErrorCodes.Success,
        doctor,
        message: 'Doctor created successfully',
      }
    } catch (error) {
      console.error(error)
      throw new DoctorError('Error creating doctor')
    }
  }

  async getDoctorByAddress(address: string) {
    if (!address || address.length !== 42) {
      throw new Error('Invalid address')
    }

    try {
      const doctor = await this.DB.fetchDoctorByAddress(address)

      if (!doctor) {
        throw new DoctorError("Doctor doesn't exist")
      }

      console.log(doctor)
      return {
        success: ErrorCodes.Success,
        doctor,
      }
    } catch (error) {
      console.error(error)
      throw new DoctorError('error fetching doctor by address')
    }
  }

  async updateDoctorProfilePicture(
    args: ProfileType,
  ): Promise<{ success: number; message: string }> {
    const { address, info } = args
    if (
      !address ||
      address.length !== 42 ||
      !info ||
      (!info.includes('.com') && !info.includes('https://'))
    ) {
      throw new DoctorError('Invalid address or info')
    }

    try {
      const { doctor } = await this.getDoctorByAddress(address)
      if (!doctor) {
        throw new DoctorError("doctor doesn't exist")
      }

      doctor.profilePicture = info
      await doctor.save()

      return {
        success: ErrorCodes.Success,
        message: 'Profile picture updated successfully',
      }
    } catch (error) {
      console.error(error)
      throw new DoctorError('Error updating profile picture')
    }
  }

  async updateDoctorName(
    args: ProfileType,
  ): Promise<{ success: number; message: string }> {
    const { address, info } = args
    if (!address || address.length !== 42 || !info) {
      throw new DoctorError('Invalid address')
    }

    try {
      const { doctor } = await this.getDoctorByAddress(address)
      if (!doctor) {
        throw new DoctorError('doctor does not exist')
      }

      doctor.name = info
      await doctor.save()

      return {
        success: ErrorCodes.Success,
        message: 'Name updated successfully',
      }
    } catch (error) {
      console.error(error)
      throw new DoctorError('Error updating name')
    }
  }

  async updateDoctorEmail(
    args: ProfileType,
  ): Promise<{ success: number; message: string }> {
    const { address, info } = args
    if (
      !address ||
      address.length !== 42 ||
      !info ||
      info.length < 5 ||
      !info.includes('@') ||
      !info.includes('.com')
    ) {
      throw new DoctorError('Invalid address or email')
    }

    try {
      const { doctor } = await this.getDoctorByAddress(address)
      if (!doctor) {
        throw new DoctorError("doctor doesn't exist")
      }

      doctor.email = info
      await doctor.save()

      return {
        success: ErrorCodes.Success,
        message: 'Email updated successfully',
      }
    } catch (error) {
      console.error(error)
      throw new DoctorError('error updating email')
    }
  }

  async updateDoctorPhoneNumber(
    args: ProfileType,
  ): Promise<{ success: number; message: string }> {
    const { address, info } = args
    if (!address || address.length !== 42 || !info || info.length < 5) {
      throw new DoctorError('Invalid address or phone number')
    }

    try {
      const { doctor } = await this.getDoctorByAddress(address)
      if (!doctor) {
        throw new DoctorError("doctor doesn't exist")
      }
      doctor.phoneNumber = info
      await doctor.save()

      return {
        success: ErrorCodes.Success,
        message: 'phone number updated successfully',
      }
    } catch (error) {
      console.error(error)
      throw new DoctorError('error updating phone number')
    }
  }

  async updateDoctorSpecialty(args: ProfileType) {
    const { address, info } = args
    if (!address || address.length !== 42 || !info) {
      throw new DoctorError('Invalid address')
    }

    try {
      const { doctor } = await this.getDoctorByAddress(address)
      if (!doctor) {
        throw new DoctorError("doctor doesn't exist")
      }
      doctor.specialty = info
      return {
        success: ErrorCodes.Success,
        message: 'Specialty updated successfully',
      }
    } catch (error) {
      console.error(error)
      throw new DoctorError('error updating specialty')
    }
  }

  async addToPatientRecord() {}
}

export const DoctorService = new doctorService()
