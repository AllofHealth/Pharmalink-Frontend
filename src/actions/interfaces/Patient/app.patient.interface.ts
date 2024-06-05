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

export interface RevokeMedicalRecordAccessType {
  patientId: number
  recordId: number
  doctorAddress: string
}

export interface ViewMedicalRecordType {
  recordId: number
  patientId: number
  viewerAddress: string
}
