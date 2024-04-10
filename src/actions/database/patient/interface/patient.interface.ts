export type ApprovalType = 'view' | 'full'
export type RelationShipType =
  | 'father'
  | 'mother'
  | 'brother'
  | 'sister'
  | 'aunt'
  | 'uncle'
  | 'cousin'
  | 'nephew'
  | 'niece'
  | 'grandfather'
  | 'grandmother'
  | 'grandson'
  | 'granddaughter'
  | 'son'
  | 'daughter'
  | 'wife'
  | 'husband'
  | 'friend'
  | 'other'

export interface MedicalRecordPreviewType {
  recordId: number
  diagnosis: string
  doctorsName: string
  hospitalName: string
  date: Date
}

export interface FamilyMemberType {
  id: number
  principalPatient?: string
  name: string
  profilePicture?: string
  relationship: RelationShipType
  email: string
  address: string
  age: number
  bloodGroup: string
  genotype: string
  medicalRecord?: MedicalRecordPreviewType[]
}

export interface CreatePatientType {
  id: number
  name: string
  age: number
  profilePicture?: string
  address: string
  city: string
  walletAddress: string
  bloodGroup: string
  genotype: string
  category?: string
}

export interface PatientType extends CreatePatientType {
  appointmentCount: number
  medicalRecords: MedicalRecordPreviewType[]
  familyMembers: FamilyMemberType[]
  category: string
}

export interface ApprovalInputType {
  recordId?: number[]
  patientAddress: string
  doctorAddress: string
  approvalType: ApprovalType
}
export interface FamilyMemberApprovalInputType extends ApprovalInputType {
  familyMemberId: number
}
