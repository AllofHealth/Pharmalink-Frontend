'use server'

import { superPatientService } from '../services/patient.services'

export const SuperServicesProvider = {
  SuperPatientService: superPatientService,
}
