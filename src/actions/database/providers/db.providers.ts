'use server'

import { AdminDB } from '../admin/dao/admin.dao'
import { HospitalDB } from '../hospital/dao/hospital.dao'

export const DatabaseProvider = {
  AdminProvider: AdminDB,
  HospitalProvider: HospitalDB,
}
