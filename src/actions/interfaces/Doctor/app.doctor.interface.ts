export interface RegisterDoctor {
  hospitalIds?: number
  name: string
  email: string
  specialty: string
  location: string
  phoneNumber: string
  regNo: string
}

export interface AddMedicalRecordType {
  patientAddress: string
  patientId: number
  ipfsHash: string
}

export interface RecordApprovalType {
  patientId: number
  recordId: number
}

export interface RecordAccessPermissionType {
  patientId: number
  recordId?: number
}
