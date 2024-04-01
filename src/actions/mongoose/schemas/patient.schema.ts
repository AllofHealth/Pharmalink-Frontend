import mongoose from 'mongoose'

const MedicalRecordPreview = {
  id: { type: Number, required: true },
  principalPatient: { type: String, required: true },
  diagnosis: { type: String },
  doctorsName: { type: String, required: true },
  hospitalName: { type: String, required: true },
  date: { type: Date, required: true },
}

const FamilyMemberSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  principalPatient: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  genotype: {
    type: String,
    required: true,
  },
  medicalRecord: [MedicalRecordPreview],
})

const PatientSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  appointmentCount: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  genotype: {
    type: String,
    required: true,
  },
  medicalRecords: [MedicalRecordPreview],
  familyMembers: [FamilyMemberSchema],
  category: {
    type: String,
    default: 'patient',
    required: true,
  },
})

const Patient =
  mongoose.models.Patient || mongoose.model('Patient', PatientSchema)

export default Patient
