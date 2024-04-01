'use server'

import { AdminError, ApprovalStatus, ErrorCodes } from '@/actions/shared/global'
import { DatabaseProvider } from '../../providers/db.providers'
import {
  AdminType,
  CreateAdminType,
  RemoveAdminType,
} from '../interface/admin.interface'
import { PreviewType } from '../../hospital/interface/hospital.interface'

export class AdminHelpers {
  static Provider = DatabaseProvider.AdminProvider

  static async validateAdminExists(address: string): Promise<boolean> {
    let adminExists: boolean = false
    try {
      const admin = await this.Provider.fetchAdminByAddress(address)

      if (admin) {
        adminExists = true
      }

      return adminExists
    } catch (error) {
      console.error(error)
      throw new AdminError('Error validating admin exists')
    }
  }
}

export class AdminServices {
  static Provider = DatabaseProvider.AdminProvider
  static Hospital = DatabaseProvider.HospitalProvider
  static Helper = AdminHelpers

  static async createAdmin(args: CreateAdminType) {
    const requiredParams = ['id', 'name', 'email', 'walletAddress']

    if (
      !requiredParams.every((param) => args[param as keyof CreateAdminType])
    ) {
      throw new AdminError('Required parameters missing')
    }

    if (await this.Helper.validateAdminExists(args.walletAddress)) {
      throw new AdminError('Admin already exists')
    }

    try {
      const admin = await this.Provider.createNewAdmin(args)
      return {
        success: ErrorCodes.Success,
        admin,
        message: 'admin created successfully',
      }
    } catch (error) {
      console.error(error)
      throw new AdminError('Error creating admin')
    }
  }

  static async fetchAdmin(
    address: string,
  ): Promise<{ success: number; admin: AdminType; message: string }> {
    if (!address || address.length > 42) {
      throw new AdminError('Invalid address')
    }

    try {
      const admin = await this.Provider.fetchAdminByAddress(address)
      if (!admin) {
        throw new AdminError('Admin not found')
      }

      return {
        success: ErrorCodes.Success,
        admin,
        message: 'admin fetched successfully',
      }
    } catch (error) {
      console.error(error)
      throw new AdminError('Error fetching admin')
    }
  }

  static async removeAdmin(
    args: RemoveAdminType,
  ): Promise<{ success: number; message: string }> {
    const { adminAddressToAuthorize, adminAddressToRemove } = args

    if (
      !adminAddressToAuthorize ||
      adminAddressToAuthorize.length > 42 ||
      !adminAddressToRemove ||
      adminAddressToRemove.length > 42
    ) {
      throw new AdminError('Invalid admin address')
    }

    if (
      !(await this.Helper.validateAdminExists(adminAddressToAuthorize)) ||
      !(await this.Helper.validateAdminExists(adminAddressToRemove))
    ) {
      throw new AdminError('Not authorized')
    }

    try {
      await this.Provider.removeAdminByAddress(adminAddressToRemove)
      return {
        success: ErrorCodes.Success,
        message: 'admin removed successfully',
      }
    } catch (error) {
      console.error(error)
      throw new AdminError('Error removing admin')
    }
  }

  static async approveHospital(
    hospitalId: number,
    adminAddress: string,
  ): Promise<{ success: number; message: string }> {
    if (
      !Number.isInteger(hospitalId) ||
      hospitalId <= 0 ||
      !adminAddress ||
      adminAddress.length > 42
    ) {
      throw new AdminError('Invalid hospital or admin address')
    }

    if (!(await this.Helper.validateAdminExists(adminAddress))) {
      throw new AdminError('Not Authorized')
    }

    try {
      const hospital = await this.Hospital.fetchHospital(hospitalId)
      if (!hospital) {
        throw new AdminError('Hospital not found')
      }

      switch (hospital.status) {
        case ApprovalStatus.Approved:
          throw new AdminError('Hospital already approved')

        case ApprovalStatus.Pending:
          hospital.status = ApprovalStatus.Approved
          await hospital.save()
          break

        default:
          throw new AdminError('Hospital not pending')
      }

      return {
        success: ErrorCodes.Success,
        message: 'Hospital approved successfully',
      }
    } catch (error) {
      console.error(error)
      throw new AdminError('Error approving hospital')
    }
  }

  static async removeDoctorFromAllHospitals(
    doctorAddress: string,
    adminAddress: string,
  ): Promise<{ success: number; message: string }> {
    if (
      !doctorAddress ||
      doctorAddress.length > 42 ||
      !adminAddress ||
      adminAddress.length > 42
    ) {
      throw new AdminError('Invalid doctor or admin address')
    }

    if (!(await this.Helper.validateAdminExists(adminAddress))) {
      throw new AdminError('Not Authorized')
    }

    try {
      const hospitals = await this.Hospital.fetchAllHospitals()
      for (const hospital of hospitals) {
        if (!hospital) {
          console.log('Hospital not found')
          continue
        }

        const isDoctorInHospital = hospital.doctors.some(
          (doctor: PreviewType) => doctor.walletAddress === doctorAddress,
        )

        if (isDoctorInHospital) {
          hospital.doctors = hospital.doctors.filter(
            (doctor: PreviewType) => doctor.walletAddress !== doctorAddress,
          )
          console.log('Doctor removed from hospital')
          await hospital.save()
        }
      }

      return {
        success: ErrorCodes.Success,
        message: 'Doctor removed from all hospitals',
      }
    } catch (error) {
      console.error(error)
      throw new AdminError('Error removing doctor from all hospitals')
    }
  }

  static async removeHospital(hospitalId: number, adminAddress: string) {
    if (
      !Number.isInteger(hospitalId) ||
      hospitalId <= 0 ||
      !adminAddress ||
      adminAddress.length > 42
    ) {
      throw new AdminError('Invalid hospital or admin address')
    }

    if (!(await this.Helper.validateAdminExists(adminAddress))) {
      throw new AdminError('Not Authorized')
    }

    try {
      const hospital = await this.Hospital.fetchHospital(hospitalId)
      if (!hospital) {
        throw new AdminError('Hospital not found')
      }

      await this.Hospital.removeHospital(hospitalId)

      return {
        success: ErrorCodes.Success,
        message: 'Hospital removed successfully',
      }
    } catch (error) {
      console.error(error)
      throw new AdminError('Error removing hospital')
    }
  }
}
