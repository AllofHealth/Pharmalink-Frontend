import mongoose from 'mongoose'

const Doctors = {
  walletAddress: { type: String, required: true, unique: true },
  profilePicture: { type: String },
  name: { type: String },
  regNo: { type: String, required: true, unique: true },
  status: { type: String },
}

const Pharmacists = {
  walletAddress: { type: String, required: true, unique: true },
  profilePicture: { type: String },
  name: { type: String },
  regNo: { type: String, required: true, unique: true },
  status: { type: String },
}

const HospitalSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  doctors: [Doctors],
  pharmacists: [Pharmacists],

  status: {
    type: String,
    required: true,
    default: 'pending',
  },
  category: {
    type: String,
    default: 'hospital',
    required: true,
  },
})

const Hospital =
  mongoose.models.Hospital || mongoose.model('Hospital', HospitalSchema)

export default Hospital
