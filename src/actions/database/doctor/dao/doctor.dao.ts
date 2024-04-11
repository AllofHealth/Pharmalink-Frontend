'use server'
/**
 * @author 3illBaby
 * @description Database functions for doctors
 */

import { schemaProvider } from '@/actions/mongoose/schemas/schema_provider/schema.providers'
import { ApprovalStatus, Category } from '@/actions/shared/global'
import { CreateDoctorType } from '../interface/doctor.interface'

export class DoctorDB {
  private static Doctor = schemaProvider.getSchema('Doctor')

  static async createNewDoctor(doctor: CreateDoctorType) {
    return await this.Doctor.create({
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
      profilePicture: doctor.profilePicture || '',
      specialty: doctor.specialty,
      location: doctor.location,
      phoneNumber: doctor.phoneNumber,
      walletAddress: doctor.walletAddress,
      regNo: doctor.regNo,
      numberOfApprovals: 0,
      status: ApprovalStatus.Pending,
      category: Category.Doctor,
    })
  }

  static async fetchDoctorByAddress(address: string) {
    return await this.Doctor.findOne({ walletAddress: address })
  }

  static async fetchAllDoctors() {
    return await this.Doctor.find()
  }

  static async fetchDoctorWithPendingStatus() {
    return await this.Doctor.find({ status: ApprovalStatus.Pending })
  }

  static async fetchDoctorWithApprovedStatus() {
    return await this.Doctor.find({ status: ApprovalStatus.Approved })
  }

  static async deleteDoctor(address: string) {
    return await this.Doctor.deleteOne({ walletAddress: address })
  }
}
