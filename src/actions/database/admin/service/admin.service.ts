'use server'

import { AdminError } from '@/actions/shared/global'
import { DatabaseProvider } from '../../providers/db.providers'
import { CreateAdminType } from '../interface/admin.interface'

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
        success: 200,
        admin,
        message: 'admin created successfully',
      }
    } catch (error) {
      console.error(error)
      throw new AdminError('Error creating admin')
    }
  }
}
