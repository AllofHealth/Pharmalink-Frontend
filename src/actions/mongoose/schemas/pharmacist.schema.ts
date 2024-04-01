import mongoose from 'mongoose'

const ApprovalList = {
  patientId: { type: Number, required: true },
  name: { type: String, required: true },
  recordId: { type: Number, required: true },
  profilePicture: { type: String },
  patientAddress: { type: String, required: true },
  doctorAddress: { type: String, required: true },
  approvalType: { type: String, required: true },
  recordOwner: { type: String, required: true },
}

const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sideEffects: {
    type: String,
  },
  image: {
    type: String,
  },
  medicineGroup: {
    type: String,
    required: true,
  },
})

const InventorySchema = new mongoose.Schema({
  numberOfMedicine: Number,
  numberOfMedicineGroup: Number,
  numberOfMedicineSold: Number,
  medicines: [MedicineSchema],
})

const PharmacistSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  hospitalIds: [Number],
  numberOfApprovals: {
    type: Number,
    required: true,
    default: 0,
  },
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
  status: {
    type: String,
    required: true,
  },
  inventory: InventorySchema,
  approvalList: [ApprovalList],
  category: {
    type: String,
    default: 'pharmacist',
    required: true,
  },
})

const Pharmacists =
  mongoose.models.Pharmacists || mongoose.model('Pharmacists', PharmacistSchema)

export default Pharmacists
