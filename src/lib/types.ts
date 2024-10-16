import type { UploadImageInterface } from "@/actions/interfaces/Record/app.record.interface";

export interface AllofHealthTableProps {
  children: React.ReactNode;
  labels: string[];
  caption: string;
  headClassName: string;
  headElementsClassName?: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface Patient {
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
  sharedPrescriptions: any[];
  __v: number;
}

export interface GetPharmacistMessage {
  success: number;
  pharmacist: Pharmacist;
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
  phoneNo: string;
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
  regNo: string;
  type: string;
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
  isVerified: boolean;
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
  medicalRecord: MedicalRecord[];
  _id: string;
  __v: number;
};

export type FamilyMemberApiResponse = {
  success: number;
  members: FamilyMember[];
  message: string;
};

export type FamilyMemberDetailResponse = {
  success: number;
  member: FamilyMember;
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

export type AllPharmacistAPIResponse = {
  success: number;
  pharmacists: AllPharmacist[];
};

export interface MedicalRecord {
  id: number;
  principalPatient: string;
  doctorAddress: string;
  diagnosis: string;
  doctorsName: string;
  hospitalName: string;
  date: string;
  _id: string;
  __v: number;
}

export interface MedicalRecordsResponse {
  success: number;
  medicalRecords: MedicalRecord[];
}

export interface FamilyMemberMedicalRecordsResponse {
  success: number;
  records: MedicalRecord[];
}

export interface InstitutionPractitioner {
  walletAddress: string;
  hospitalIds: number[];
  profilePicture: string;
  name: string;
  status: string;
  category: string;
  _id: string;
  id: number;
}

export interface InstitutionPractitionersApiResponse {
  success: number;
  practitioners: Practitioner[];
}

export type UpdateInstitutionValues = {
  name: string;
  email: string;
  phoneNo: string;
  location: string;
  description: string;
  profilePicture: string;
};

export type Approval = {
  patientId: number;
  patientName: string;
  recordId: number;
  profilePicture: string;
  approvalType: string;
  approvalStatus: string;
  approvalDuration: string;
  recordOwner: string;
  recordTag: string;
  _id: string;
  __v: number;
};

export type ApprovalsResponse = {
  success: number;
  approvals: Approval[];
};

export type CreateMedicalRecordValues = {
  diagnosis: string;
  medication: string;
  products: string;
};

export type UpdateDoctorValues = {
  name: string;
};

export interface Medicine {
  name: string;
  price: number;
  quantity: number;
  description: string;
  sideEffects: string;
  image: string;
  medicineGroup: string;
  _id: string;
  __v: number;
}

export interface Inventory {
  numberOfMedicine: number;
  numberOfMedicineGroup: number;
  numberOfMedicineSold: number;
  medicines: Medicine[];
  _id: string;
  __v: number;
}

export interface AllMedicinesApiResponse {
  success: number;
  medicines: Medicine[];
}

export interface AllInventoryApiResponse {
  success: number;
  inventory: Inventory;
}

export type EditMedicineValues = {
  name: string;
  price: number;
  medicineGroup: string;
  quantity: number;
  description: string;
  sideEffects: string;
};

export type updatePharmacistValues = {
  name: string;
};

export interface VerificationDocuments {
  identificationCard: string;
  medicalLicense: string;
}

export interface Record {
  diagnosis: string;
  description: string;
  testname: string;
  referenceRange: string;
  units: string;
  comments: string;
  heartbeat: string;
  bloodPressure: string;
  sugarLevel: string;
  haemoglobin: string;
  labImages: UploadImageInterface[];
}
