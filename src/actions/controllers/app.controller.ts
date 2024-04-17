'use server'

import { RegisterPatient } from '../interfaces/Patient/app.patient.interface'
import { SuperServicesProvider } from '../providers/services.providers'

/**
 * @author 3illBaby
 * @description controller for all of health
 */

export class AppControllers {
  async registerPatient(args: RegisterPatient) {
    return SuperServicesProvider.SuperPatientService.createPatient(args)
  }
}
