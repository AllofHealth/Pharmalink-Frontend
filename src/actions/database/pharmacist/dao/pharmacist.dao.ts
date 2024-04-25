'use server'

import { schemaProvider } from '@/actions/mongoose/schemas/schema_provider/schema.providers'
import { ApprovalStatus } from '@/actions/shared/global'
import { CreatePharmacistType } from '../interface/pharmacist.interface'
import { PROFILE_PLACEHOLDER } from '@/actions/shared/constants/constant'

export class PharmacistDB {
  static Pharmacists = schemaProvider.getSchema('Pharmacist')

  static async createNewPharmacist(pharmacist: CreatePharmacistType) {
    return await this.Pharmacists.create({
      id: pharmacist.id,
      name: pharmacist.name,
      email: pharmacist.email,
      profilePicture: pharmacist.profilePicture
        ? pharmacist.profilePicture
        : PROFILE_PLACEHOLDER,
      location: pharmacist.location,
      phoneNumber: pharmacist.phoneNumber,
      walletAddress: pharmacist.walletAddress,
      regNo: pharmacist.regNo,
      status: ApprovalStatus.Pending,
    })
  }

  static async fetchPharmacist(id: number) {
    return await this.Pharmacists.findOne({ id })
  }

  static async fetchPharmacistByAddress(address: string) {
    return await this.Pharmacists.findOne({ walletAddress: address })
  }

  static async fetchAllPharmacist() {
    return await this.Pharmacists.find()
  }

  static async fetchPharmacistWithPendingStatus() {
    return await this.Pharmacists.find({ status: ApprovalStatus.Pending })
  }

  static async fetchPharmacistsWithApprovedStatus() {
    return await this.Pharmacists.find({ status: ApprovalStatus.Approved })
  }

  static async removePharmacist(address: string) {
    return await this.Pharmacists.deleteOne({ walletAddress: address })
  }
}
