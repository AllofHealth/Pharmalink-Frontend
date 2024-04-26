'use server'
import { adminService } from '../contract/admin/admin.service.c'
import { DatabaseServiceProviders } from '../database/providers/db.providers'
import { EnsureDbConnection } from '../decorators/ensure_conntection'
import type { RegisterAdminArgs } from '../interfaces/Admin/app.admin.interface'
import { AdminError, AdminServiceError, ContractError } from '../shared/global'

class SuperAdminService {
  @EnsureDbConnection
  async createAdmin(args: RegisterAdminArgs) {
    const { name, email, walletAddress } = args

    try {
      const { adminId } = await adminService.createSystemAdmin(walletAddress)
      if (!adminId) {
        throw new ContractError('Failed to add admin to contract')
      }

      return await DatabaseServiceProviders.AdminDatabaseServices.createAdmin({
        id: adminId,
        name,
        walletAddress,
        email,
      })
    } catch (error) {
      if (error instanceof AdminError || error instanceof ContractError) {
        throw new AdminServiceError(error.message)
      }

      console.error('Unexpected error in createDoctor:', error)
      throw new AdminServiceError(
        'An unexpected error occurred while creating doctor',
      )
    }
  }
}

export const superAdminService = new SuperAdminService()
