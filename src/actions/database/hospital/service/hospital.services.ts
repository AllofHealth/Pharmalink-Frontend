'use server'

import {
  ApprovalStatus,
  Category,
  ErrorCodes,
  HospitalError,
} from '@/actions/shared/global'
import {
  HospitalType,
  CreateHospitalType,
  PreviewType,
  ApprovePractitionerType,
} from '../interface/hospital.interface'
import { DatabaseProvider } from '../../providers/db.providers'

class HospitalHelpers {
  static DB = DatabaseProvider.HospitalProvider
}

export class HospitalReadOperations {
  static DB = DatabaseProvider.HospitalProvider

  static async fetchPendingDoctors(
    hospitalId: string,
  ): Promise<{
    success: number
    doctors: PreviewType[]
    message: string
  }> {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id')
    }

    try {
      const { hospital } = await this.DB.fetchHospital(hospitalId)
      if (!hospital) {
        throw new HospitalError("hospital doesn't exist")
      }

      const doctors = hospital.doctors.filter((doctor: PreviewType) => {
        return doctor.status === ApprovalStatus.Pending
      })

      if (doctors.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          doctors: [],
          message: 'No pending doctors found',
        }
      }

      return {
        success: ErrorCodes.Success,
        doctors,
        message: 'pending doctors found',
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error fetching pending doctors')
    }
  }

  static async fetchPendingPharmacist(
    hospitalId: string,
  ): Promise<{
    success: number
    pharmacists: PreviewType[]
    message: string
  }> {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id')
    }

    try {
      const { hospital } = await this.DB.fetchHospital(hospitalId)
      if (!hospital) {
        throw new HospitalError("hospital doesn't exist")
      }

      const pharmacists = hospital.pharmacists.filter(
        (pharmacist: PreviewType) => {
          return pharmacist.status === ApprovalStatus.Pending
        },
      )

      if (pharmacists.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          pharmacists: [],
          message: 'No pending pharmacists found',
        }
      }

      return {
        success: ErrorCodes.Success,
        pharmacists,
        message: 'pending pharmacists found',
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error fetching pharmacists')
    }
  }

  static async fetchApprovedDoctors(
    hospitalId: string,
  ): Promise<{
    success: number
    doctors: PreviewType[]
    message: string
  }> {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id')
    }

    try {
      const { hospital } = await this.DB.fetchHospital(hospitalId)
      if (!hospital) {
        throw new HospitalError("hospital doesn't exists")
      }

      const doctors = hospital.doctors.filter((doctor: PreviewType) => {
        return doctor.status === ApprovalStatus.Approved
      })

      if (doctors.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          doctors: [],
          message: 'No approved doctors found',
        }
      }

      console.log(doctors)

      return {
        success: ErrorCodes.Success,
        doctors,
        message: 'Approved doctors fetched successfully',
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error fetching approved doctors')
    }
  }

  static async fetchApprovedPharmacists(
    hospitalId: string,
  ): Promise<{
    success: number
    pharmacists: PreviewType[]
    message: string
  }> {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id')
    }

    try {
      const { hospital } = await this.DB.fetchHospital(hospitalId)
      if (!hospital) {
        throw new HospitalError("hospital doesn't exists")
      }

      const pharmacists = hospital.pharmacists.filter(
        (pharmacist: PreviewType) => {
          return pharmacist.status === ApprovalStatus.Approved
        },
      )

      if (pharmacists.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          pharmacists: [],
          message: 'No approved pharmacists found',
        }
      }

      return {
        success: ErrorCodes.Success,
        pharmacists,
        message: 'Approved pharmacists fetched successfully',
      }
    } catch (error) {
      console.error(error)
      throw new Error('Error fetching pharmacists')
    }
  }

  static async fetchAllDoctors(
    hospitalId: string,
  ): Promise<{ success: number; doctors: PreviewType[] }> {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id')
    }

    try {
      const { hospital } = await this.DB.fetchHospital(hospitalId)
      if (!hospital) {
        throw new HospitalError("hospital doesn't exist")
      }

      const doctors = hospital.doctors

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
      throw new HospitalError('Error fetching approved doctors')
    }
  }

  static async fetchAllPharmacists(
    hospitalId: string,
  ): Promise<{ success: number; pharmacists: PreviewType[] }> {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id')
    }

    try {
      const { hospital } = await this.DB.fetchHospital(hospitalId)
      if (!hospital) {
        throw new HospitalError("hospital doesn't exist")
      }
      const pharmacists = hospital.pharmacists
      if (!pharmacists) {
        return {
          success: ErrorCodes.NotFound,
          pharmacists: [],
        }
      }

      return {
        success: ErrorCodes.Success,
        pharmacists,
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error fetching pharmacists')
    }
  }
}

export class HospitalService {
  static Helpers = HospitalHelpers
  static Read = HospitalReadOperations
  static DB = DatabaseProvider.HospitalProvider

  static async getHospitalById(
    _id: string,
  ): Promise<{ success: number; hospital: HospitalType }> {
    if (!_id) {
      throw new HospitalError('Invalid or missing hospital id')
    }

    try {
      const hospital = await this.DB.fetchHospital(_id)
      if (!hospital) {
        throw new HospitalError("hospital doesn't exist")
      }

      return {
        success: 200,
        hospital,
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error fetching hospital')
    }
  }

  static async fetchPendingHospitals(): Promise<{
    success: number
    Hospital: HospitalType[]
  }> {
    try {
      const Hospital = await this.DB.fetchHospitalWithPendingStatus()
      if (Hospital.length === 0) {
        return {
          success: 200,
          Hospital: [],
        }
      }
      console.log(Hospital)
      return {
        success: 200,
        Hospital,
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error fetching pending hospitals')
    }
  }

  static async fetchApprovedHospitals(): Promise<{
    success: number
    hospitals: HospitalType[]
  }> {
    try {
      const hospitals = await this.DB.fetchHospitalWithApprovedStatus()
      if (!hospitals) {
        console.log('No approved hospitals')
        throw new HospitalError('No approved hospitals found')
      }
      if (hospitals.length === 0) {
        return {
          success: 404,
          hospitals: [],
        }
      }

      return {
        success: 200,
        hospitals,
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error fetching approved hospitals')
    }
  }
}
