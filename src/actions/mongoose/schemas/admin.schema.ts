import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    default: 'admin',
    required: true,
  },
})

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

export default Admin
