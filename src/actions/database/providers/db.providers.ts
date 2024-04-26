'use server'

import { AdminDB } from '../admin/dao/admin.dao'
import { HospitalDB } from '../hospital/dao/hospital.dao'
import { DoctorDB } from '../doctor/dao/doctor.dao'
import { PharmacistDB } from '../pharmacist/dao/pharmacist.dao'
import { PatientDB } from '../patient/dao/patient.dao'
import { PatientService } from '../patient/service/patient.service'
import { DoctorService } from '../doctor/service/doctor.service'
import { PharmacistService } from '../pharmacist/service/pharmacist.service'
import { HospitalService } from '../hospital/service/hospital.services'
import { AdminServices } from '../admin/service/admin.service'

export const DatabaseProvider = {
  AdminProvider: AdminDB,
  HospitalProvider: HospitalDB,
  DoctorProvider: DoctorDB,
  PharmacistProvider: PharmacistDB,
  PatientProvider: PatientDB,
}

export const DatabaseServiceProviders = {
  PatientDatabaseServices: PatientService,
  DoctorDatabaseServices: DoctorService,
  PharmacistDatabaseServices: PharmacistService,
  HospitalDatabaseServices: HospitalService,
  AdminDatabaseServices: AdminServices,
}
