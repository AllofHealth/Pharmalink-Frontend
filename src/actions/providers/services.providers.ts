'use server'

import { superDoctorService } from '../services/doctor.services'
import { superHospitalService } from '../services/hospital.services'
import { superPatientService } from '../services/patient.services'
import { superPharmacistService } from '../services/pharmacist.services'

export const SuperServicesProvider = {
  SuperPatientService: superPatientService,
  SuperDoctorService: superDoctorService,
  SuperPharmacistService: superPharmacistService,
  SuperHospitalService: superHospitalService,
}
