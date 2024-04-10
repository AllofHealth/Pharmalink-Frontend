'use server'

import {
  ApprovalStatus,
  ErrorCodes,
  PatientError,
  ProfileType,
  RecordOwner,
  Relationship,
} from '@/actions/shared/global'
import { DatabaseProvider } from '../../providers/db.providers'
import {
  ApprovalInputType,
  CreatePatientType,
  FamilyMemberApprovalInputType,
  FamilyMemberType,
  PatientType,
  RelationShipType,
} from '../interface/patient.interface'
import { DoctorHelpers } from '../../doctor/service/doctor.service'
import {
  ActiveApprovalType,
  DoctorType,
} from '../../doctor/interface/doctor.interface'

class PatientHelpers {
  static async sanitizeRelationship(
    relationship: string,
  ): Promise<RelationShipType> {
    if (!relationship) {
      throw new PatientError('relationship not passed')
    }
    const formattedRelationship = relationship.toLowerCase()

    let sanitizedRelationship: RelationShipType

    try {
      switch (formattedRelationship) {
        case 'father':
          sanitizedRelationship = Relationship.Father
          break
        case 'mother':
          sanitizedRelationship = Relationship.Mother
          break
        case 'brother':
          sanitizedRelationship = Relationship.Brother
          break
        case 'sister':
          sanitizedRelationship = Relationship.Sister
          break
        case 'grandfather':
          sanitizedRelationship = Relationship.GrandFather
          break
        case 'grandmother':
          sanitizedRelationship = Relationship.GrandMother
          break
        case 'uncle':
          sanitizedRelationship = Relationship.Uncle
          break
        case 'aunt':
          sanitizedRelationship = Relationship.Aunt
          break
        case 'cousin':
          sanitizedRelationship = Relationship.Cousin
          break
        case 'nephew':
          sanitizedRelationship = Relationship.Nephew
          break
        case 'niece':
          sanitizedRelationship = Relationship.Niece
          break
        case 'other':
          sanitizedRelationship = Relationship.Other
          break
        default:
          sanitizedRelationship = Relationship.Other
          break
      }

      return sanitizedRelationship
    } catch (error) {
      console.error(error)
      throw new PatientError('An error occurred while sanitizing relationship')
    }
  }

  static async addActiveApproval(
    doctor: DoctorType,
    patient: PatientType,
    activeApproval: ActiveApprovalType,
  ) {
    try {
      doctor.activeApprovals.push(activeApproval)
    } catch (error) {
      doctor.numberOfApprovals--
      patient.appointmentCount--

      console.info('An error occurred while adding active approval to doctor')
    }
  }
}

class PatientReadOperations {
  static async returnPatientFamilyMember(
    patient: PatientType,
    id: number,
  ): Promise<FamilyMemberType> {
    const familyMember = patient.familyMembers.find(
      (familyMember) => familyMember.id === id,
    )
    if (!familyMember) {
      throw new PatientError('Family member not found')
    }
    return familyMember
  }
}

export class PatientService {
  private static DB = DatabaseProvider.PatientProvider
  private static Helper = PatientHelpers
  private static Read = PatientReadOperations
  private static DoctorHelpers = DoctorHelpers

  static async createNewPatient(args: CreatePatientType) {
    const {
      id,
      name,
      age,
      address,
      city,
      walletAddress,
      bloodGroup,
      genotype,
    } = args
    if (
      !Number.isInteger(id) ||
      id <= 0 ||
      !Number.isInteger(age) ||
      age <= 0 ||
      !name ||
      !address ||
      !city ||
      !walletAddress ||
      walletAddress.length < 42 ||
      !bloodGroup ||
      !genotype
    ) {
      throw new PatientError('Invalid parameter')
    }
    try {
      const patient = await this.DB.createNewPatient(args)
      return {
        success: true,
        patient,
        message: 'Patient created successfully',
      }
    } catch (error) {
      console.error(error)
      throw new PatientError('An error occurred while creating patient')
    }
  }

  static async addFamilyMember(
    walletAddress: string,
    args: FamilyMemberType,
  ): Promise<{ success: number; message: string }> {
    const {
      id,
      name,
      relationship,
      email,
      address,
      age,
      bloodGroup,
      genotype,
    } = args
    if (
      !Number.isInteger(id) ||
      id <= 0 ||
      !Number.isInteger(age) ||
      age <= 0 ||
      !name ||
      !relationship ||
      !email ||
      !address ||
      !bloodGroup ||
      !genotype ||
      !walletAddress
    ) {
      throw new PatientError('Invalid parameter')
    }

    try {
      const patient = await this.DB.fetchPatientByAddress(walletAddress)
      if (!patient) {
        throw new PatientError('Patient not found')
      }

      const familyMember: FamilyMemberType = {
        id,
        principalPatient: walletAddress,
        name,
        relationship: await this.Helper.sanitizeRelationship(relationship),
        email,
        address,
        age,
        bloodGroup,
        genotype,
      }

      patient.familyMembers.push(familyMember)
      await patient.save()

      return {
        success: ErrorCodes.Success,
        message: 'Family member added successfully',
      }
    } catch (error) {
      console.error(error)
      throw new PatientError('An error occurred while adding family member')
    }
  }

  static async updateName(
    args: ProfileType,
  ): Promise<{ success: number; message: string }> {
    const { address, info } = args
    if (!address || !info) {
      throw new PatientError('Invalid parameter')
    }

    try {
      const patient = await this.DB.fetchPatientByAddress(address)
      if (!patient) {
        throw new PatientError('Patient not found')
      }
      patient.name = info
      await patient.save()
      return {
        success: ErrorCodes.Success,
        message: 'Name updated successfully',
      }
    } catch (error) {
      console.error(error)
      throw new PatientError('An error occurred while updating name')
    }
  }

  static async updateProfilePicture(
    args: ProfileType,
  ): Promise<{ success: number; message: string }> {
    const { address, info } = args
    if (!address || !info) {
      throw new PatientError('Invalid parameter')
    }

    try {
      const patient = await this.DB.fetchPatientByAddress(address)
      if (!patient) {
        throw new PatientError('Patient not found')
      }
      patient.profilePicture = info
      await patient.save()

      return {
        success: ErrorCodes.Success,
        message: 'Profile picture updated successfully',
      }
    } catch (error) {
      console.error(error)
      throw new PatientError('An error occurred while updating profile picture')
    }
  }

  static async updateAddress(
    args: ProfileType,
  ): Promise<{ success: number; message: string }> {
    const { address, info } = args
    if (!address || !info) {
      throw new PatientError('Invalid parameter')
    }

    try {
      const patient = await this.DB.fetchPatientByAddress(address)
      if (!patient) {
        throw new PatientError('Patient not found')
      }
      patient.address = info
      await patient.save()

      return {
        success: ErrorCodes.Success,
        message: 'Address updated successfully',
      }
    } catch (error) {
      console.error(error)
      throw new PatientError('An error occurred while updating address')
    }
  }

  static async updateFamilyMemberName(
    familyMemberId: number,
    args: ProfileType,
  ): Promise<{ success: number; message: string }> {
    const { address, info } = args
    if (
      !Number.isInteger(familyMemberId) ||
      familyMemberId <= 0 ||
      !address ||
      address.length < 42 ||
      !info
    ) {
      throw new PatientError('Invalid parameter')
    }

    try {
      const patient = await this.DB.fetchPatientByAddress(address)
      if (!patient) {
        throw new PatientError('Patient not found')
      }

      const familyMember: FamilyMemberType = patient.familyMembers.find(
        (member: FamilyMemberType) => member.id === familyMemberId,
      )
      if (!familyMember) {
        throw new PatientError('Family member not found')
      }
      familyMember.name = info
      await patient.save()

      return {
        success: ErrorCodes.Success,
        message: 'Family member name updated successfully',
      }
    } catch (error) {
      console.error(error)
      throw new PatientError(
        'An error occurred while updating family member name',
      )
    }
  }

  static async updateCity(
    args: ProfileType,
  ): Promise<{ success: number; message: string }> {
    const { address, info } = args
    if (!address || address.length < 42 || !info) {
      throw new PatientError('Invalid parameter')
    }

    try {
      const patient = await this.DB.fetchPatientByAddress(address)
      if (!patient) {
        throw new PatientError('Patient not found')
      }
      patient.city = info
      await patient.save()

      return {
        success: ErrorCodes.Success,
        message: 'City updated successfully',
      }
    } catch (error) {
      console.error(error)
      throw new PatientError('An error occurred while updating city')
    }
  }

  static async fetchAllPatients(): Promise<PatientType[]> {
    try {
      const allPatients = await this.DB.fetchAllPatients()
      return allPatients
    } catch (error) {
      console.error(error)
      throw new PatientError('An error occurred while fetching all patients')
    }
  }

  static async fetchPatientByAddress(
    walletAddress: string,
  ): Promise<PatientType> {
    if (!walletAddress || walletAddress.length < 42)
      throw new PatientError('Invalid parameter')
    try {
      const patient = await this.DB.fetchPatientByAddress(walletAddress)
      if (!patient) {
        throw new PatientError('Patient not found')
      }
      return patient
    } catch (error) {
      console.error(error)
      throw new PatientError(
        'An error occurred while fetching patient by address',
      )
    }
  }

  static async fetchAllFamilyMembers(
    walletAddress: string,
  ): Promise<FamilyMemberType[]> {
    if (!walletAddress || walletAddress.length < 42) {
      throw new PatientError('Invalid parameter')
    }

    try {
      const patient = await this.fetchPatientByAddress(walletAddress)
      if (!patient) {
        throw new PatientError('Patient not found')
      }
      return patient.familyMembers
    } catch (error) {
      console.error(error)
      throw new PatientError(
        'An error occurred while fetching patient family members',
      )
    }
  }

  static async fetchFamilyMember(
    walletAddress: string,
    id: number,
  ): Promise<FamilyMemberType> {
    if (
      !walletAddress ||
      walletAddress.length < 42 ||
      !Number.isInteger(id) ||
      id <= 0
    ) {
      throw new PatientError('Invalid parameter')
    }

    try {
      const patient = await this.fetchPatientByAddress(walletAddress)
      if (!patient) {
        throw new PatientError('Patient not found')
      }
      return await this.Read.returnPatientFamilyMember(patient, id)
    } catch (error) {
      console.error(error)
      throw new PatientError('An error occurred while fetching family member')
    }
  }

  static async approveRecordAccess(
    args: ApprovalInputType,
  ): Promise<{ success: number; message: string }> {
    const { patientAddress, doctorAddress, approvalType, recordId } = args
    if (!patientAddress || !doctorAddress || !approvalType) {
      throw new PatientError('Invalid parameter')
    }

    try {
      const patient = await this.DB.fetchPatientByAddress(patientAddress)
      if (!patient) {
        throw new PatientError('Patient not found')
      }

      const { doctor } = await this.DoctorHelpers.validateDoctorExists(
        doctorAddress,
      )
      if (!doctor || doctor.status != ApprovalStatus.Approved) {
        return {
          success: ErrorCodes.Success,
          message: 'Doctor not found or not approved',
        }
      }

      doctor.numberOfApprovals += 1
      patient.appointmentCount += 1

      const recordIds = recordId && recordId.length ? recordId : [undefined]
      for (const record of recordIds) {
        const activeApproval: ActiveApprovalType = {
          patientId: patient.id,
          patientName: patient.name,
          recordId: record,
          profilePicture: patient.profilePicture || '',
          patientAddress,
          approvalType,
          approvalStatus: ApprovalStatus.Approved,
          approvalTime: new Date(),
          recordOwner: RecordOwner.Patient,
        }

        await this.Helper.addActiveApproval(
          doctor as DoctorType,
          patient as PatientType,
          activeApproval,
        )
      }

      await doctor.save()
      await patient.save()

      return {
        success: ErrorCodes.Success,
        message: 'Record access approved successfully',
      }
    } catch (error) {
      console.error(error)
      throw new PatientError('An error occurred while approving doctor')
    }
  }

  static async approveFamilyRecordAccess(
    args: FamilyMemberApprovalInputType,
  ): Promise<{ success: number; message: string }> {
    const {
      patientAddress,
      doctorAddress,
      approvalType,
      recordId,
      familyMemberId,
    } = args
    if (
      !patientAddress ||
      !doctorAddress ||
      !approvalType ||
      !Number.isInteger(familyMemberId)
    ) {
      throw new PatientError('Invalid parameter')
    }

    try {
      const patient = await this.DB.fetchPatientByAddress(patientAddress)
      if (!patient) {
        throw new PatientError('Patient not found')
      }

      const doctor = await this.DoctorHelpers.validateDoctorExists(
        doctorAddress,
      )
      if (!doctor || doctor.status != ApprovalStatus.Approved) {
        return {
          success: ErrorCodes.Success,
          message: 'Doctor not found or not approved',
        }
      }

      const familyMember: FamilyMemberType = await this.Read.returnPatientFamilyMember(
        patient,
        familyMemberId,
      )
      if (!familyMember) {
        throw new PatientError('Family member not found')
      }

      doctor.numberOfApprovals += 1
      patient.appointmentCount += 1

      const recordIds = recordId && recordId.length ? recordId : [undefined]
      for (const record of recordIds) {
        const activeApproval: ActiveApprovalType = {
          patientId: familyMember.id,
          patientName: familyMember.name,
          recordId: record,
          patientAddress,
          profilePicture:
            familyMember.profilePicture || patient.profilePicture || '',
          approvalType,
          approvalStatus: ApprovalStatus.Approved,
          approvalTime: new Date(),
          recordOwner: RecordOwner.FamilyMember,
        }

        await this.Helper.addActiveApproval(
          doctor as DoctorType,
          patient as PatientType,
          activeApproval,
        )
      }

      await doctor.save()
      await patient.save()

      return {
        success: ErrorCodes.Success,
        message: 'Record access approved successfully',
      }
    } catch (error) {
      console.error(error)
      throw new PatientError('An error occurred while granting record access')
    }
  }
}
