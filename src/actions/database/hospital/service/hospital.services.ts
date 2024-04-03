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
  JoinHospitalType,
} from '../interface/hospital.interface'
import { DatabaseProvider } from '../../providers/db.providers'

class HospitalHelpers {
  private static DB = DatabaseProvider.HospitalProvider
  private static DoctorDB = DatabaseProvider.DoctorProvider
  private static PharmacistDB = DatabaseProvider.PharmacistProvider

  static async returnDoctorFromHospital(
    hospital: HospitalType,
    walletAddress: string,
  ): Promise<PreviewType | undefined> {
    try {
      const Doctor = hospital.doctors.find((d: PreviewType) => {
        return d.walletAddress === walletAddress
      })

      if (!Doctor) {
        console.info('Doctor not found')
      }

      return Doctor
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error finding doctor')
    }
  }

  static async returnPharmacistFromHospital(
    hospital: HospitalType,
    walletAddress: string,
  ): Promise<PreviewType | undefined> {
    try {
      const pharmacists = hospital.pharmacists.find((d: PreviewType) => {
        return d.walletAddress === walletAddress
      })
      if (!pharmacists) {
        console.info('pharmacist not found')
      }

      return pharmacists
    } catch (error) {
      console.error(error)
      throw new HospitalError('pharmacists not found')
    }
  }

  static async removeDoctorFromHospital(
    hospital: HospitalType,
    doctorAddress: string,
  ) {
    try {
      hospital.doctors = hospital.doctors.filter(
        (d: PreviewType) => d.walletAddress !== doctorAddress,
      )
      console.info('doctor removed')
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error removing doctor')
    }
  }

  static async removePharmacistFromHospital(
    hospital: HospitalType,
    pharmacistAddress: string,
  ) {
    try {
      hospital.pharmacists = hospital.pharmacists.filter(
        (d: PreviewType) => d.walletAddress !== pharmacistAddress,
      )
      console.info('pharmacist removed')
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error removing pharmacist')
    }
  }

  static async removeHospitalIdFromDoctorDocument(
    hospital: HospitalType,
    doctorAddress: string,
  ) {
    try {
      const Doctor = await this.DoctorDB.fetchDoctorByAddress(doctorAddress)
      if (!Doctor) {
        throw new HospitalError("doctor doesn't exist")
      }

      Doctor.hospitalIds.splice(Doctor.hospitalIds.indexOf(hospital.id), 1)
      if (Doctor.hospitalIds.length === 0) {
        Doctor.hospitalIds = []
        Doctor.status = ApprovalStatus.Pending
      }
      console.log('hospital id removed')
      await Doctor.save()
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error removing hospital id from doctor')
    }
  }

  static async removeHospitalIdFromPharmacistDocument(
    hospital: HospitalType,
    pharmacistAddress: string,
  ) {
    try {
      const pharmacist = await this.PharmacistDB.fetchPharmacistByAddress(
        pharmacistAddress,
      )
      if (!pharmacist) {
        throw new HospitalError("pharmacist doesn't exist")
      }

      pharmacist.hospitalIds.splice(
        pharmacist.hospitalIds.indexOf(hospital.id),
        1,
      )
      if (pharmacist.hospitalIds.length === 0) {
        pharmacist.hospitalIds = []
        pharmacist.status = ApprovalStatus.Pending
      }
      console.info('hospital id removed')
      await pharmacist.save()
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error removing hospital id from pharmacist')
    }
  }

  static async validateHospitalAdmin(
    hospital: HospitalType,
    adminAddress: string,
  ) {
    if (!hospital || !adminAddress || adminAddress.length < 42) {
      throw new HospitalError('Error validating parameters')
    }

    let isAdmin = false
    try {
      if (hospital.admin === adminAddress) {
        isAdmin = true
      }
      return isAdmin
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error validating admin')
    }
  }
}

class HospitalReadOperations {
  private static DB = DatabaseProvider.HospitalProvider

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

class HospitalWriteOperations {
  private static DB = DatabaseProvider.HospitalProvider
  private static DoctorDB = DatabaseProvider.DoctorProvider
  private static PharmacistDB = DatabaseProvider.PharmacistProvider
  private static Helper = HospitalHelpers

  static async approveDoctor(
    doctorAddress: string,
  ): Promise<{ success: number; message: string }> {
    if (!doctorAddress || doctorAddress.length > 42) {
      throw new HospitalError('Missing required parameter')
    }

    try {
      const doctor = await this.DoctorDB.fetchDoctorByAddress(doctorAddress)
      if (!doctor) {
        throw new HospitalError('Doctor not found')
      }

      if (doctor.status !== ApprovalStatus.Approved) {
        doctor.status = ApprovalStatus.Approved
        await doctor.save()
        return {
          success: ErrorCodes.Success,
          message: 'Doctor approved',
        }
      } else {
        return {
          success: ErrorCodes.Error,
          message: 'Doctor already approved',
        }
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error approving doctor')
    }
  }

  static async approvePharmacist(
    pharmacistAddress: string,
  ): Promise<{ success: number; message: string }> {
    if (!pharmacistAddress || pharmacistAddress.length > 42) {
      throw new HospitalError('Missing required parameter')
    }

    try {
      const pharmacist = await this.PharmacistDB.fetchPharmacistByAddress(
        pharmacistAddress,
      )
      if (!pharmacist) {
        throw new HospitalError('Pharmacist not found')
      }

      if (pharmacist.status !== ApprovalStatus.Approved) {
        pharmacist.status = ApprovalStatus.Approved
        await pharmacist.save()
        return {
          success: ErrorCodes.Success,
          message: 'Pharmacist approved',
        }
      } else {
        return {
          success: ErrorCodes.Error,
          message: 'Pharmacist already approved',
        }
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error approving pharmacist')
    }
  }

  static async removeDoctor(
    args: ApprovePractitionerType,
  ): Promise<{ success: number; message: string }> {
    const { practitionerAddress, adminAddress, hospitalId } = args
    if (!practitionerAddress || practitionerAddress.length > 42) {
      throw new HospitalError('Missing required parameter')
    }

    try {
      const hospital = await this.DB.fetchHospital(hospitalId)
      if (!hospital) {
        throw new HospitalError("hospital doesn't exist with given id")
      }
      const isAdmin = await this.Helper.validateHospitalAdmin(
        hospital,
        adminAddress,
      )
      if (!isAdmin) {
        throw new HospitalError('Only admin can call this function')
      }

      const doctor = await this.Helper.returnDoctorFromHospital(
        hospital,
        practitionerAddress,
      )

      if (doctor) {
        await this.Helper.removeDoctorFromHospital(
          hospital,
          practitionerAddress,
        )
        await this.Helper.removeHospitalIdFromDoctorDocument(
          hospital,
          practitionerAddress,
        )
        await hospital.save()
      }

      return {
        success: ErrorCodes.Success,
        message: 'doctor removed',
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error removing Doctor')
    }
  }

  static async removePharmacist(
    args: ApprovePractitionerType,
  ): Promise<{ success: number; message: string }> {
    const { practitionerAddress, adminAddress, hospitalId } = args
    if (!practitionerAddress || practitionerAddress.length < 42) {
      throw new HospitalError('Missing required parameter')
    }

    try {
      const hospital = await this.DB.fetchHospital(hospitalId)
      if (!hospital) {
        throw new HospitalError("hospital doesn't exist with given id")
      }

      const isAdmin = await this.Helper.validateHospitalAdmin(
        hospital,
        adminAddress,
      )
      if (!isAdmin) {
        throw new HospitalError('Only admin can call this function')
      }

      const pharmacist = await this.Helper.returnPharmacistFromHospital(
        hospital,
        practitionerAddress,
      )

      if (pharmacist) {
        await this.Helper.removePharmacistFromHospital(
          hospital,
          practitionerAddress,
        )
        await hospital.save()

        await this.Helper.removeHospitalIdFromPharmacistDocument(
          hospital,
          practitionerAddress,
        )
      }

      return {
        success: ErrorCodes.Success,
        message: 'pharmacist removed',
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error removing pharmacist')
    }
  }
}

export class HospitalService {
  private static Helper = HospitalHelpers
  private static Read = HospitalReadOperations
  private static Write = HospitalWriteOperations
  private static DB = DatabaseProvider.HospitalProvider
  private static DoctorDB = DatabaseProvider.DoctorProvider
  private static PharmacistDB = DatabaseProvider.PharmacistProvider

  static async createHospital(
    args: CreateHospitalType,
  ): Promise<{ success: number; hospital: HospitalType; message: string }> {
    const requiredParams = [
      'id',
      'name',
      'admin',
      'email',
      'phoneNo',
      'regNo',
      'location',
    ]

    if (
      !requiredParams.every((param) => args[param as keyof CreateHospitalType])
    ) {
      throw new HospitalError('Invalid or missing parameters')
    }

    try {
      const hospital = await this.DB.createNewHospital(args)
      return {
        success: ErrorCodes.Success,
        hospital,
        message: 'Hospital created successfully',
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error creating hospital')
    }
  }

  static async joinHospital(
    args: JoinHospitalType,
  ): Promise<{ success: number; message: string }> {
    const { hospitalId, walletAddress, category } = args
    const requiredParams = ['hospitalId', 'walletAddress', 'category']

    if (
      !requiredParams.some((param) => args[param as keyof JoinHospitalType])
    ) {
      throw new HospitalError('Missing required parameter')
    }
    const sanitizedCategory = category.toLowerCase()

    try {
      const hospital = await this.DB.fetchHospital(hospitalId)
      if (!hospital) {
        throw new HospitalError('Hospital not found')
      }

      switch (sanitizedCategory) {
        case Category.Doctor:
          const doctor = await this.DoctorDB.fetchDoctorByAddress(walletAddress)
          if (!doctor) {
            throw new HospitalError('Doctor not found')
          }
          const doctorPreview: PreviewType = {
            walletAddress: doctor.walletAddress,
            profilePicture: doctor.profilePicture,
            name: doctor.name,
            regNo: doctor.regNo,
            status: ApprovalStatus.Pending,
          }

          doctor.hospitalIds.push(hospitalId)
          await doctor.save()

          try {
            hospital.doctors.push(doctorPreview)
          } catch (error) {
            console.info('An error occurred while adding doctor to hospital')
            await this.Helper.removeHospitalIdFromDoctorDocument(
              hospital,
              walletAddress,
            )
          }

          break

        case Category.Pharmacist:
          const pharmacist = await this.PharmacistDB.fetchPharmacistByAddress(
            walletAddress,
          )
          if (!pharmacist) {
            throw new HospitalError('Pharmacist not found')
          }
          const pharmacistPreview: PreviewType = {
            walletAddress: pharmacist.walletAddress,
            profilePicture: pharmacist.profilePicture,
            name: pharmacist.name,
            regNo: pharmacist.regNo,
            status: ApprovalStatus.Pending,
          }
          pharmacist.hospitalIds.push(hospitalId)
          await pharmacist.save()

          try {
            hospital.pharmacists.push(pharmacistPreview)
          } catch (error) {
            console.info(
              'An error occurred while adding pharmacist to hospital',
            )
            await this.Helper.removeHospitalIdFromPharmacistDocument(
              hospital,
              walletAddress,
            )
          }
          break

        default:
          throw new Error('only practitioners can join hospital')
      }
      await hospital.save()
      return {
        success: ErrorCodes.Success,
        message: 'Joined hospital',
      }
    } catch (error) {
      console.error(error)
      throw new Error('Error joining hospital')
    }
  }

  static async approvePractitioner(
    args: ApprovePractitionerType,
  ): Promise<{ success: boolean; message: string }> {
    const { practitionerAddress, adminAddress, hospitalId } = args
    if (!practitionerAddress || practitionerAddress.length < 42) {
      throw new HospitalError('Missing required parameter')
    }

    try {
      const hospital = await this.DB.fetchHospital(hospitalId)
      if (!hospital) {
        throw new HospitalError('Hospital not found')
      }

      const isAdmin = await this.Helper.validateHospitalAdmin(
        hospital,
        adminAddress,
      )
      if (!isAdmin) {
        throw new HospitalError('Only admin can call this function')
      }

      const doctor = await this.Helper.returnDoctorFromHospital(
        hospital,
        practitionerAddress,
      )
      const pharmacist = await this.Helper.returnPharmacistFromHospital(
        hospital,
        practitionerAddress,
      )

      const practitionerValidation =
        (!doctor && !pharmacist) ||
        (doctor == undefined && pharmacist == undefined)

      if (practitionerValidation) {
        throw new Error('Practitioner not found')
      }

      switch (doctor?.status) {
        case ApprovalStatus.Pending:
          doctor.status = ApprovalStatus.Approved
          const res = await this.Write.approveDoctor(practitionerAddress)
          console.info(res.success)
          break
        case ApprovalStatus.Approved:
          throw new Error('Doctor already approved')
      }

      switch (pharmacist?.status) {
        case ApprovalStatus.Pending:
          pharmacist.status = ApprovalStatus.Approved
          const res = await this.Write.approvePharmacist(practitionerAddress)
          console.info(res.success)
          break
        case ApprovalStatus.Approved:
          throw new Error('Pharmacist already approved')
      }

      await hospital.save()
      return {
        success: true,
        message: 'Practitioner approved',
      }
    } catch (error) {
      console.error(error)
      throw new Error('Error approving practitioner')
    }
  }

  static async rejectPractitioner(
    args: ApprovePractitionerType,
  ): Promise<{ success: number; message: string }> {
    const { practitionerAddress, adminAddress, hospitalId } = args
    if (!practitionerAddress || practitionerAddress.length < 42) {
      throw new HospitalError('Missing required parameter')
    }

    try {
      const hospital = await this.DB.fetchHospital(hospitalId)
      if (!hospital) {
        throw new HospitalError('Hospital not found')
      }
      const isAdmin = await this.Helper.validateHospitalAdmin(
        hospital,
        adminAddress,
      )
      if (!isAdmin) {
        throw new HospitalError('Only admin can call this function')
      }
      const doctor = await this.Helper.returnDoctorFromHospital(
        hospital,
        practitionerAddress,
      )
      const pharmacist = await this.Helper.returnPharmacistFromHospital(
        hospital,
        practitionerAddress,
      )
      if (!doctor && !pharmacist) {
        throw new Error('Practitioner not found')
      }

      if (doctor) {
        const res = await this.Write.removeDoctor(args)
      } else if (pharmacist) {
        const res = await this.Write.removePharmacist(args)
      }

      return {
        success: ErrorCodes.Success,
        message: 'Practitioner rejected',
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error rejecting practitioner')
    }
  }

  static async fetchAllPractitioners(
    hospitalId: string,
  ): Promise<PreviewType[]> {
    try {
      const { doctors } = await this.Read.fetchAllDoctors(hospitalId)
      const { pharmacists } = await this.Read.fetchAllPharmacists(hospitalId)

      const fullList = doctors.concat(pharmacists)
      return fullList
    } catch (error) {
      console.error(error)
      throw new Error('Error fetching all practitioners')
    }
  }

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

  static async fetchAllHospitals(): Promise<{
    success: number
    hospitals: HospitalType[]
  }> {
    try {
      const hospitals = await this.DB.fetchAllHospitals()
      return {
        success: ErrorCodes.Success,
        hospitals,
      }
    } catch (error) {
      console.error(error)
      throw new HospitalError('Error fetching all hospitals')
    }
  }
}
