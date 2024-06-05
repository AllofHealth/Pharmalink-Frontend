export interface AllofHealthTableProps {
  children: React.ReactNode;
  labels: string[];
  caption: string;
  headClassName: string;
  headElementsClassName?: string;
  icon?: React.ReactNode;
  className?: string;
}

interface Patient {
  _id: string;
  id: number;
  appointmentCount: number;
  name: string;
  age: number;
  email: string;
  profilePicture: string;
  address: string;
  city: string;
  walletAddress: string;
  bloodGroup: string;
  genotype: string;
  category: string;
  medicalRecords: [];
  familyMembers: [];
  __v: number;
}

export interface GetPatientMessage {
  success: number;
  patient: Patient;
}

export interface GetPatientNotExistMessage {
  success: number;
  message: string;
}

export interface GetPatientSuccessResponse {
  data: GetPatientMessage | GetPatientNotExistMessage | null;
  loading: boolean;
  error: any;
}

interface Doctor {
  _id: string;
  id: number;
  appointmentCount: number;
  name: string;
  age: number;
  profilePicture: string;
  address: string;
  city: string;
  walletAddress: string;
  bloodGroup: string;
  genotype: string;
  category: string;
  medicalRecords: [];
  familyMembers: [];
  __v: number;
}

export interface GetDoctorMessage {
  success: number;
  doctor: Doctor;
}

export interface GetDoctorNotExistMessage {
  success: number;
  message: string;
}

export interface GetDoctorSuccessResponse {
  data: GetDoctorMessage | GetDoctorNotExistMessage | null;
  loading: boolean;
  error: any;
}

interface Pharmacist {
  _id: string;
  id: number;
  appointmentCount: number;
  name: string;
  age: number;
  profilePicture: string;
  address: string;
  city: string;
  walletAddress: string;
  bloodGroup: string;
  genotype: string;
  category: string;
  medicalRecords: [];
  familyMembers: [];
  __v: number;
}

export interface GetPharmacistMessage {
  success: number;
  patient: Pharmacist;
}

export interface GetPharmacistNotExistMessage {
  success: number;
  message: string;
}

export interface GetPharmacistSuccessResponse {
  data: GetPharmacistMessage | GetPharmacistNotExistMessage | null;
  loading: boolean;
  error: any;
}

export interface Admin {
  _id: string;
  id: number;
  name: string;
  profilePicture: string;
  email: string;
  walletAddress: string;
  category: string;
  __v: number;
}

export interface GetAdminNotExistMessage {
  success: number;
  message: string;
}

export interface CreatePatientValues {
  name: string;
  age: number;
  email: string;
  address: string;
  city: string;
  walletAddress: string;
  bloodGroup: string;
  genotype: string;
}

export interface CreateDoctorValues {
  name: string;
  hospitalIds: number;
  email: string;
  specialty: string;
  location: string;
  phoneNumber: string;
}

export interface CreatePharmacistValues {
  name: string;
  hospitalIds: number;
  email: string;
  location: string;
  phoneNumber: string;
}

export interface CreateSystemAdminValues {
  name: string;
  email: string;
}

export interface CreateInstitutionValues {
  name: string;
  email: string;
  phoneNo: string;
  location: string;
  description: string;
}

export type Institution = {
  _id: string;
  id: number;
  name: string;
  admin: string;
  email: string;
  phoneNo: string;
  regNo: string;
  location: string;
  profilePicture: string;
  description: string;
  status: string;
  category: string;
  doctors: any[];
  pharmacists: any[];
  __v: number;
};

export type InstitutionApiResponse = {
  success: number;
  hospitals: Institution[];
};

export interface Practitioner {
  _id: string;
  id: number;
  hospitalIds: number[];
  numberOfApprovals: number;
  name: string;
  email: string;
  profilePicture: string;
  location: string;
  phoneNumber: string;
  walletAddress: string;
  status: string;
  category: string;
  approvalList: any[];
  __v: number;
}

export interface PractitionersApiResponse {
  success: number;
  allPractitioners: Practitioner[];
}

export type AllDoctor = {
  _id: string;
  id: number;
  hospitalIds: number[];
  name: string;
  email: string;
  profilePicture: string;
  specialty: string;
  location: string;
  phoneNumber: string;
  walletAddress: string;
  numberOfApprovals: number;
  status: string;
  category: string;
  activeApprovals: any[];
  __v: number;
};

export type AllDoctorApiResponse = {
  success: number;
  allDoctors: AllDoctor[];
};

export type FamilyMember = {
  id: number;
  principalPatient: string;
  name: string;
  relationship: string;
  email: string;
  address: string;
  age: number;
  dob: string;
  bloodGroup: string;
  genotype: string;
  medicalRecord: any[];
  _id: string;
  __v: number;
};

export type FamilyMemberApiResponse = {
  success: number;
  members: FamilyMember[];
  message: string;
};

export type CreateFamilyMemberValues = {
  id: number;
  name: string;
  relationship: string;
  email: string;
  address: string;
  age: number;
  dob: string;
  bloodGroup: string;
  genotype: string;
};

export type UpdatePatientValues = {
  name: string;
};

export interface Prescription {
  doctorName: string;
  recordId: number;
  patientAddress: string;
  doctorAddress: string;
  medicineName: string;
  medicineId: string;
  medicineGroup: string;
  description: string;
  sideEffects: string;
  date: string;
  _id: string;
  __v: number;
}

export interface PatientPrescriptionsApiResponse {
  success: number;
  prescriptions: Prescription[];
}

export interface SharedPrescription {
  doctorName: string;
  recordId: number;
  patientAddress: string;
  doctorAddress: string;
  medicineName: string;
  medicineId: string;
  medicineGroup: string;
  description: string;
  sideEffects: string;
  date: string;
  _id: string;
  __v: number;
}

export interface AllPharmacist {
  _id: string;
  id: number;
  hospitalIds: number[];
  numberOfApprovals: number;
  name: string;
  email: string;
  profilePicture: string;
  location: string;
  phoneNumber: string;
  walletAddress: string;
  status: string;
  category: string;
  approvalList: any[];
  sharedPrescriptions: SharedPrescription[];
  __v: number;
}

export type AllPharmacistAPIResponse = AllPharmacist[];
