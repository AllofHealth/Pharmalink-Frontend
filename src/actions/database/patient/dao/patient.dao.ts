'use server'

import { Category } from '@/actions/shared/global'
import { CreatePatientType } from '../interface/patient.interface'
import Patient from '@/actions/mongoose/schemas/patient.schema'

export class PatientDB {
  static async createNewPatient(patient: CreatePatientType) {
    return await Patient.create({
      id: patient.id,
      appointmentCount: 0,
      name: patient.name,
      age: patient.age,
      profilePicture: patient.profilePicture ? patient.profilePicture : '',
      address: patient.address,
      city: patient.city,
      walletAddress: patient.walletAddress,
      bloodGroup: patient.bloodGroup,
      genotype: patient.genotype,
      category: Category.Patient,
    })
  }

  static async fetchPatientByAddress(walletAddress: string) {
    return await Patient.findOne({ walletAddress })
  }

  static async fetchAllPatients() {
    return await Patient.find()
  }

  static async DeletePatient(walletAddress: string) {
    return await Patient.deleteOne({ walletAddress })
  }
}
