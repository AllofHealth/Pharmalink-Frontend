'use server'

/**
 * @author 3illBaby
 * @description Database func for Hospital
 */

import { schemaProvider } from '@/actions/mongoose/schemas/schema_provider/schema.providers'
import { ApprovalStatus, Category } from '@/actions/shared/global'
import { CreateHospitalType } from '../interface/hospital.interface'
import mongoose from 'mongoose'
import { HOSPITAL_PLACEHOLDER } from '@/actions/shared/constants/constant'

class hospitalDB {
  private Hospital = schemaProvider.getSchema('Hospital')
  async createNewHospital(hospital: CreateHospitalType) {
    return await this.Hospital.create({
      id: hospital.id,
      name: hospital.name,
      admin: hospital.admin,
      email: hospital.email,
      phoneNo: hospital.phoneNo,
      regNo: hospital.regNo,
      location: hospital.location,
      profilePicture: hospital.profilePicture
        ? hospital.profilePicture
        : HOSPITAL_PLACEHOLDER,
      description: hospital.description,
      status: ApprovalStatus.Pending,
      category: Category.Hospital,
    })
  }

  async fetchHospital(_id: string) {
    return await this.Hospital.findOne({
      _id: new mongoose.Types.ObjectId(_id),
    })
  }

  async fetchHospitalWithBlockchainId(id: number) {
    return await this.Hospital.findOne({ id: id })
  }

  async fetchHospitalByRegNo(regNo: string) {
    return await this.Hospital.findOne({ regNo })
  }

  async fetchAllHospitals() {
    return await this.Hospital.find()
  }

  async fetchHospitalWithPendingStatus() {
    return await this.Hospital.find({
      status: ApprovalStatus.Pending,
    })
  }

  async fetchHospitalWithApprovedStatus() {
    return await this.Hospital.find({
      status: ApprovalStatus.Approved,
    })
  }

  async removeHospital(_id: string) {
    return await this.Hospital.deleteOne({
      _id: new mongoose.Types.ObjectId(_id),
    })
  }
}

export const HospitalDB = new hospitalDB()
