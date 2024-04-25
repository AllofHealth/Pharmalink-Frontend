'use server'

/**
 * @author 3illbaby
 * @description Admin database
 */

import { schemaProvider } from '@/actions/mongoose/schemas/schema_provider/schema.providers'
import { Category } from '@/actions/shared/global'
import { CreateAdminType } from '../interface/admin.interface'
import { PROFILE_PLACEHOLDER } from '@/actions/shared/constants/constant'

export class AdminDB {
  private static Admin = schemaProvider.getSchema('Admin')
  static async createNewAdmin(admin: CreateAdminType) {
    return await this.Admin.create({
      id: admin.id,
      name: admin.name,
      profilePicture: admin.profilePicture
        ? admin.profilePicture
        : PROFILE_PLACEHOLDER,
      email: admin.email,
      walletAddress: admin.walletAddress,
      category: Category.Admin,
    })
  }

  static async fetchAllAdmins() {
    return await this.Admin.find()
  }

  static async fetchAdminByAddress(address: string) {
    return await this.Admin.findOne({ walletAddress: address })
  }

  static async removeAdmin(id: number) {
    return await this.Admin.deleteOne({ id })
  }

  static async removeAdminByAddress(address: string) {
    return await this.Admin.deleteOne({ walletAddress: address })
  }
}
