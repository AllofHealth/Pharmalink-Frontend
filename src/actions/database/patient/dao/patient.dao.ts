'use server'

/**
 * @author 3illBaby
 * @description Database funcs for patient
 */

import { Category } from '@/actions/shared/global'
import { CreatePatientType } from '../interface/patient.interface'
import Patient from '@/actions/mongoose/schemas/patient.schema'
import { PROFILE_PLACEHOLDER } from '@/actions/shared/constants/constant'

class patientDB {
  async createNewPatient(patient: CreatePatientType) {
    return await Patient.create({
      id: patient.id,
      appointmentCount: 0,
      name: patient.name,
      age: patient.age,
      profilePicture: patient.profilePicture
        ? patient.profilePicture
        : PROFILE_PLACEHOLDER,
      address: patient.address,
      city: patient.city,
      walletAddress: patient.walletAddress,
      bloodGroup: patient.bloodGroup,
      genotype: patient.genotype,
      category: Category.Patient,
    })
  }

  async fetchPatientByAddress(walletAddress: string) {
    return await Patient.findOne({ walletAddress })
  }

  async fetchAllPatients() {
    return await Patient.find()
  }

  async DeletePatient(walletAddress: string) {
    return await Patient.deleteOne({ walletAddress })
  }
}

export const PatientDB = new patientDB()
