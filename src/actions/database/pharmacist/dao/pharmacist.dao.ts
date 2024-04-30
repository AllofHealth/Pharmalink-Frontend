'use server'

import { schemaProvider } from '@/actions/mongoose/schemas/schema_provider/schema.providers'
import { ApprovalStatus } from '@/actions/shared/global'
import { CreatePharmacistType } from '../interface/pharmacist.interface'
import { PROFILE_PLACEHOLDER } from '@/actions/shared/constants/constant'

class pharmacistDB {
  private Pharmacists = schemaProvider.getSchema('Pharmacist')

  async createNewPharmacist(pharmacist: CreatePharmacistType) {
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

  async fetchPharmacist(id: number) {
    return await this.Pharmacists.findOne({ id })
  }

  async fetchPharmacistByAddress(address: string) {
    return await this.Pharmacists.findOne({ walletAddress: address })
  }

  async fetchAllPharmacist() {
    return await this.Pharmacists.find()
  }

  async fetchPharmacistWithPendingStatus() {
    return await this.Pharmacists.find({ status: ApprovalStatus.Pending })
  }

  async fetchPharmacistsWithApprovedStatus() {
    return await this.Pharmacists.find({ status: ApprovalStatus.Approved })
  }

  async removePharmacist(address: string) {
    return await this.Pharmacists.deleteOne({ walletAddress: address })
  }
}

export const PharmacistDB = new pharmacistDB()
