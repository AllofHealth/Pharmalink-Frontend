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
