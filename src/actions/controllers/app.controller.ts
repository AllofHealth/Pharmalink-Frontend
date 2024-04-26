'use server'

import { RegisterDoctor } from '../interfaces/Doctor/app.doctor.interface'
import { RegisterPatient } from '../interfaces/Patient/app.patient.interface'
import { RegisterPharmacist } from '../interfaces/Pharmacist/app.pharmacist.interface'
import { AddHospitalArgs } from '../interfaces/Hospital/app.hospital.interface'
import { SuperServicesProvider } from '../providers/services.providers'
import { RegisterAdminArgs } from '../interfaces/Admin/app.admin.interface'

/**
 * @author 3illBaby
 * @description controller for all of health
 */

/**
 * Provides methods to register various entities in the health system, including patients, doctors, pharmacists, and hospitals.
 */
export class AppControllers {
  async registerPatient(args: RegisterPatient) {
    return SuperServicesProvider.SuperPatientService.createPatient(args)
  }

  async registerDoctor(args: RegisterDoctor) {
    return SuperServicesProvider.SuperDoctorService.createDoctor(args)
  }

  async registerPharmacist(args: RegisterPharmacist) {
    return SuperServicesProvider.SuperPharmacistService.createPharmacist(args)
  }

  async registerHospital(args: AddHospitalArgs) {
    return SuperServicesProvider.SuperHospitalService.createHospital(args)
  }

  async registerAdmin(args: RegisterAdminArgs) {
    return SuperServicesProvider.SuperAdminService.createAdmin(args)
  }
}
