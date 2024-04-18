'use server'

import { superDoctorService } from '../services/doctor.services'
import { superPatientService } from '../services/patient.services'

export const SuperServicesProvider = {
  SuperPatientService: superPatientService,
  SuperDoctorService: superDoctorService,
}
