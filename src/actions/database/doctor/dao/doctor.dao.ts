'use server'
/**
 * @author 3illBaby
 * @description Database functions for doctors
 */

import { schemaProvider } from '@/actions/mongoose/schemas/schema_provider/schema.providers'
import { ApprovalStatus, Category } from '@/actions/shared/global'
import { CreateDoctorType } from '../interface/doctor.interface'
import { PROFILE_PLACEHOLDER } from '@/actions/shared/constants/constant'

class doctorDB {
  private Doctor = schemaProvider.getSchema('Doctor')

  async createNewDoctor(doctor: CreateDoctorType) {
    return await this.Doctor.create({
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
      profilePicture: doctor.profilePicture || PROFILE_PLACEHOLDER,
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

  async fetchDoctorByAddress(address: string) {
    return await this.Doctor.findOne({ walletAddress: address })
  }

  async fetchAllDoctors() {
    return await this.Doctor.find()
  }

  async fetchDoctorWithPendingStatus() {
    return await this.Doctor.find({ status: ApprovalStatus.Pending })
  }

  async fetchDoctorWithApprovedStatus() {
    return await this.Doctor.find({ status: ApprovalStatus.Approved })
  }

  async deleteDoctor(address: string) {
    return await this.Doctor.deleteOne({ walletAddress: address })
  }
}

export const DoctorDB = new doctorDB()
