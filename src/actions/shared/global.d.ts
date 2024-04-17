import mongoose from 'mongoose'

enum Category {
  Admin = 'admin',
  Doctor = 'doctor',
  Hospital = 'hospital',
  Pharmacist = 'pharmacist',
  Patient = 'patient',
}

enum ApprovalStatus {
  Approved = 'approved',
  Rejected = 'rejected',
  Pending = 'pending',
}

enum RecordOwner {
  Patient = 'principal',
  FamilyMember = 'family member',
}

enum Relationship {
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

enum ErrorCodes {
  Success = 200,
  NotFound = 404,
  Error = 500,
}

export enum ContractEvents {
  PatientAdded = 'event PatientAdded(address indexed patient, uint256 indexed patientId)',
}

export enum EventNames {
  PatientAdded = 'PatientAdded',
}

type ProfileType = {
  address: string
  info: string
}

type DbType = {
  DB: mongoose.Model<any, {}, {}, {}, any, any>
}

class AdminError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AdminError'
  }
}

class PatientError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PatientError'
  }
}

class PatientServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PatientServiceError'
  }
}

class DoctorError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DoctorError'
  }
}

class HospitalError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'HospitalError'
  }
}

class PharmacistError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PharmacistError'
  }
}

class MetamaskError extends Error {
  constructor(message?: string) {
    super(message ? message : 'Metamask is not installed')
    this.name = 'MetamaskError'
  }
}

class ContractError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ContractError'
  }
}
