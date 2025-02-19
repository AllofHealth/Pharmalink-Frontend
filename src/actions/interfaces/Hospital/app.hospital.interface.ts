export interface AddHospitalArgs {
  name: string
  admin: string
  email: string
  phoneNo: string
  location: string
}

export interface ApproveDoctorType {
  doctorAddress: string
  hospitalId: number
  doctorId: number
}

export interface ApprovePharmacistType {
  pharmacistAddress: string
  hospitalId: number
  pharmacistId: number
}

export interface ApprovePractitionerType {
  practitionerAddress: string
  hospitalId: number
  practitionerId: number
}
