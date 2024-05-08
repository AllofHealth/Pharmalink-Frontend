export interface AddHospitalArgs {
  name: string
  admin: string
  email: string
  phoneNo: string
  regNo: string
  location: string
}

export interface ApproveDoctorType {
  doctorAddress: string
  hospitalId: number
  doctorId: number
  regNo: string
}

export interface ApprovePharmacistType {
  pharmacistAddress: string
  hospitalId: number
  pharmacistId: number
  regNo: string
}
