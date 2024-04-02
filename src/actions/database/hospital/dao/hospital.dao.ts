'use server'
import { schemaProvider } from '@/actions/mongoose/schemas/schema_provider/schema.providers'
import { ApprovalStatus, Category } from '@/actions/shared/global'
import { CreateHospitalType } from '../interface/hospital.interface'
import mongoose from 'mongoose'

export class HospitalDB {
  static Hospital = schemaProvider.getSchema('Hospital')
  static async createNewHospital(hospital: CreateHospitalType) {
    return await this.Hospital.create({
      id: hospital.id,
      name: hospital.name,
      admin: hospital.admin,
      email: hospital.email,
      phoneNo: hospital.phoneNo,
      regNo: hospital.regNo,
      location: hospital.location,
      profilePicture: hospital.profilePicture ? hospital.profilePicture : '',
      description: hospital.description,
      status: ApprovalStatus.Pending,
      category: Category.Hospital,
    })
  }

  static async fetchHospital(_id: string) {
    return await this.Hospital.findOne({
      _id: new mongoose.Types.ObjectId(_id),
    })
  }

  static async fetchHospitalByRegNo(regNo: string) {
    return await this.Hospital.findOne({ regNo })
  }

  static async fetchAllHospitals() {
    return await this.Hospital.find()
  }

  static async fetchHospitalWithPendingStatus() {
    return await this.Hospital.find({
      status: ApprovalStatus.Pending,
    })
  }

  static async fetchHospitalWithApprovedStatus() {
    return await this.Hospital.find({
      status: ApprovalStatus.Approved,
    })
  }

  static async removeHospital(id: number) {
    return await this.Hospital.deleteOne({ id })
  }
}
