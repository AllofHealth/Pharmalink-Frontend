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
