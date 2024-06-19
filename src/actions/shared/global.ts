import mongoose from 'mongoose'

export enum Category {
  Admin = 'admin',
  Doctor = 'doctor',
  Hospital = 'hospital',
  Pharmacist = 'pharmacist',
  Patient = 'patient',
}

export enum ApprovalStatus {
  Approved = 'approved',
  Rejected = 'rejected',
  Pending = 'pending',
}

export enum RecordOwner {
  Patient = 'principal',
  FamilyMember = 'family member',
}

export enum Relationship {
  Father = 'father',
  Mother = 'mother',
  Brother = 'brother',
  Sister = 'sister',
  Aunt = 'aunt',
  Uncle = 'uncle',
  Nephew = 'nephew',
  Niece = 'niece',
  GrandFather = 'grandfather',
  GrandMother = 'grandmother',
  Grandson = 'grandson',
  Granddaughter = 'granddaughter',
  Son = 'son',
  Daughter = 'daughter',
  Wife = 'wife',
  Husband = 'husband',
  Friend = 'friend',
  Cousin = 'cousin',
  Other = 'other',
}

export enum ErrorCodes {
  Success = 200,
  NotFound = 404,
  Error = 500,
}

export enum ContractEvents {
  PatientAdded = 'event PatientAdded(address indexed patient, uint256 indexed patientId)',
  DoctorAdded = 'event DoctorAdded(address indexed doctor, uint256 indexed hospitalId, uint256 indexed doctorId)',
  PharmacistAdded = 'event PharmacistAdded(address indexed pharmacist, uint256 indexed hospitalId, uint256 indexed pharmacistId)',
  HospitalCreated = ' event HospitalCreated(address indexed admin, uint256 indexed hospitalId)',
  SystemAdminAdded = 'event SystemAdminAdded(address indexed admin, uint256 indexed adminId)',
  HospitalApproved = 'event HospitalApproved(uint256 indexed hospitalId)',
  DoctorApproved = 'event DoctorApproved(uint256 indexed hospitalId, uint256 indexed doctorId, address indexed doctor)',
  PharmacistApproved = 'event PharmacistApproved(uint256 indexed hospitalId, uint256 indexed pharmacistId, address indexed pharmacist)',
  SystemAdminRemoved = 'event SystemAdminRemoved(address indexed admin, uint256 indexed adminId)',
  PatientFamilyMemberAdded = 'event PatientFamilyMemberAdded(uint256 indexed principalPatientId, uint256 indexed patientId)',
  WriteAccessGranted = 'event WriteAccessGranted(address indexed doctor, uint256 indexed patientId)',
  RecordAccessRevoked = 'event RecordAccessRevoked(address indexed patient, address indexed approvedDoctor, uint256 indexed medicalRecordId)',
  MedicalRecordAdded = 'event MedicalRecordAdded(address indexed doctor, address indexed patient, uint256 indexed medicalRecordId)',
  MedicalRecordAccessed = ' event MedicalRecordAccessed(bytes32 indexed diagnosis, bytes32 indexed recordDetailsUri, bytes32 indexed recordImageUri)',
  ReadAccessGranted = 'event MedicalRecordAccessApproved(address indexed patient, address indexed approvedDoctor, uint256 indexed medicalRecordId)',
}

export enum EventNames {
  PatientAdded = 'PatientAdded',
  DoctorAdded = 'DoctorAdded',
  PharmacistAdded = 'PharmacistAdded',
  HospitalCreated = 'HospitalCreated',
  SystemAdminAdded = 'SystemAdminAdded',
  HospitalApproved = 'HospitalApproved',
  DoctorApproved = 'DoctorApproved',
  PharmacistApproved = 'PharmacistApproved',
  SystemAdminRemoved = 'SystemAdminRemoved',
  PatientFamilyMemberAdded = 'PatientFamilyMemberAdded',
  WriteAccessGranted = 'WriteAccessGranted',
  RecordAccessRevoked = 'RecordAccessRevoked',
  MedicalRecordAdded = 'MedicalRecordAdded',
  MedicalRecordAccessed = 'MedicalRecordAccessed',
  ReadAccessGranted = 'ReadAccessGranted',
}

export type ProfileType = {
  address: string
  info: string
}

export type DbType = {
  DB: mongoose.Model<any, {}, {}, {}, any, any>
}

export class AdminError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AdminError'
  }
}

export class PatientError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PatientError'
  }
}

export class PatientServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PatientServiceError'
  }
}

export class DoctorServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DoctorServiceError'
  }
}

export class PharmacistServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PharmacistServiceError'
  }
}

export class HospitalServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'HospitalServiceError'
  }
}
export class DoctorError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DoctorError'
  }
}

export class HospitalError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'HospitalError'
  }
}

export class PharmacistError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PharmacistError'
  }
}

export class MetamaskError extends Error {
  constructor(message?: string) {
    super(message ? message : 'Metamask is not installed')
    this.name = 'MetamaskError'
  }
}

export class ContractError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ContractError'
  }
}

export class AdminServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AdminServiceError'
  }
}
