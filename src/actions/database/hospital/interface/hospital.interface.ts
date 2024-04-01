export interface CreateHospitalType {
  id: number
  name: string
  admin: string
  email: string
  phoneNo: string
  regNo: string
  location: string
  profilePicture?: string
  description?: string
  status: string
}

export interface PreviewType {
  walletAddress: string
  profilePicture: string
  name: string
  regNo: string
  status: string
}

export interface HospitalType extends CreateHospitalType {
  doctors: PreviewType[]
  pharmacists: PreviewType[]
  category: string
}
