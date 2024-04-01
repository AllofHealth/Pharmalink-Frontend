import mongoose from 'mongoose'

const approvalSchema = new mongoose.Schema({
  patientId: { type: Number, required: true },
  patientName: { type: String, required: true },
  recordId: { type: Number },
  profilePicture: { type: String, required: true },
  patientAddress: { type: String, required: true },
  approvalType: { type: String, required: true },
  approvalStatus: { type: String, required: true },
  approvalTime: { type: Date, required: true },
  recordOwner: { type: String, required: true },
})

const DoctorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    sparse: true,
  },
  hospitalIds: [Number],
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
  },
  numberOfApprovals: {
    type: Number,
    default: 0,
  },
  activeApprovals: [approvalSchema],
  status: {
    type: String,
    default: 'pending',
    required: true,
  },
  category: {
    type: String,
    default: 'doctor',
    required: true,
  },
})

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema)

export default Doctor
