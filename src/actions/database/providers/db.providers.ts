'use server'

import { AdminDB } from '../admin/dao/admin.dao'
import { HospitalDB } from '../hospital/dao/hospital.dao'
import { DoctorDB } from '../doctor/dao/doctor.dao'
import { PharmacistDB } from '../pharmacist/dao/pharmacist.dao'
import { PatientDB } from '../patient/dao/patient.dao'

export const DatabaseProvider = {
  AdminProvider: AdminDB,
  HospitalProvider: HospitalDB,
  DoctorProvider: DoctorDB,
  PharmacistProvider: PharmacistDB,
  PatientProvider: PatientDB,
}
