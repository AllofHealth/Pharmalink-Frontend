'use server'

import Admin from '../admin.schema'
import Doctor from '../doctor.schema'
import Hospital from '../hospital.schema'
import Pharmacist from '../pharmacist.schema'
import Patient from '../patient.schema'

export const SchemaProvider = {
  Admin: Admin,
  Doctor: Doctor,
  Hospital: Hospital,
  Pharmacist: Pharmacist,
  Patient: Patient,
}
