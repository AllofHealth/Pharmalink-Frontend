export interface RegisterPatient {
  name: string
  age: number
  address: string
  city: string
  bloodGroup: string
  genotype: string
}

export interface ApproveMedicalRecordAccessType {
  practitionerAddress: string
  patientId: number
  recordId?: number
  durationInSeconds?: number
}
