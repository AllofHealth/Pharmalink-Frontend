'use server'

import {
  ErrorCodes,
  PharmacistError,
  ProfileType,
} from '@/actions/shared/global'
import { DatabaseProvider } from '../../providers/db.providers'
import {
  CreatePharmacistType,
  InventoryType,
  MedicineType,
  PharmacistType,
} from '../interface/pharmacist.interface'
import { PreviewType } from '../../hospital/interface/hospital.interface'

class PharmacistHelpers {
  private static DB = DatabaseProvider.PharmacistProvider
  private static HospitalDB = DatabaseProvider.HospitalProvider

  static async validatePharmacistExistsInHospital(
    hospitalId: number,
    pharmacistAddress: string,
  ) {
    if (
      !Number(hospitalId) ||
      hospitalId <= 0 ||
      !pharmacistAddress ||
      pharmacistAddress.length < 42
    ) {
      throw new PharmacistError('Invalid or missing pharmacist address')
    }

    let pharmacistExists: boolean = false

    try {
      const hospital = await this.HospitalDB.fetchHospitalWithBlockchainId(
        hospitalId,
      )
      if (!hospital) {
        throw new PharmacistError('Hospital not found')
      }

      const pharmacist = hospital.pharmacists.find(
        (pharmacist: PreviewType) =>
          pharmacist.walletAddress === pharmacistAddress,
      )

      if (pharmacist) {
        pharmacistExists = true
      }

      return pharmacistExists
    } catch (error) {
      console.error(error)
      throw new PharmacistError(
        'Error validating pharmacist exists in hospital',
      )
    }
  }

  static async checkIfMedicineGroupExist(
    pharmacist: PharmacistType,
    groupName: string,
  ): Promise<boolean> {
    let medicineGroupExists: boolean = false

    try {
      const groupExist = pharmacist.inventory.medicines.some(
        (medicine: MedicineType) => medicine.medicineGroup === groupName,
      )

      if (groupExist) {
        medicineGroupExists = true
      }

      return medicineGroupExists
    } catch (error) {
      console.error(error)
      throw new PharmacistError('Error checking if medicine group exists')
    }
  }

  static async fetchInventory(args: PharmacistType) {
    try {
      const inventory: InventoryType = args.inventory
      return inventory
    } catch (error) {
      console.error(error)
      throw new PharmacistError('Error fetching inventory')
    }
  }
}

export class PharmacistReadOperations {
  private static Helper = PharmacistHelpers
  private static DB = DatabaseProvider.PharmacistProvider
  static async fetchPendingPharmacists(): Promise<{
    success: number
    pharmacist: PharmacistType[]
  }> {
    try {
      const pharmacist = await this.DB.fetchPharmacistWithPendingStatus()

      if (!pharmacist || pharmacist.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          pharmacist: [],
        }
      }

      return {
        success: ErrorCodes.Success,
        pharmacist,
      }
    } catch (error) {
      console.error(error)
      throw new PharmacistError('Error fetching pharmacists')
    }
  }

  static async fetchApprovedPharmacists(): Promise<{
    success: number
    pharmacists: PharmacistType[]
  }> {
    try {
      const pharmacists = await this.DB.fetchPharmacistsWithApprovedStatus()

      if (!pharmacists || pharmacists.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          pharmacists: [],
        }
      }

      return {
        success: ErrorCodes.Success,
        pharmacists,
      }
    } catch (error) {
      console.error(error)
      throw new PharmacistError('Error fetching pharmacists')
    }
  }
}

class PharmacistWriteOperations {
  private static Helper = PharmacistHelpers
  static async createInventory(pharmacist: PharmacistType, args: MedicineType) {
    try {
      const newMedicine = {
        ...args,
      }
      pharmacist.inventory = {
        numberOfMedicine: 1,
        numberOfMedicineGroup: 1,
        numberOfMedicineSold: 0,
        medicines: [newMedicine],
      }
    } catch (error) {
      console.error(error)
      throw new PharmacistError('An error ocurred while creating inventory')
    }
  }

  static async updateInventory(pharmacist: PharmacistType, args: MedicineType) {
    try {
      const newMedicine = {
        ...args,
      }
      const inventory: InventoryType = pharmacist.inventory
      inventory.medicines.push(newMedicine)
      inventory.numberOfMedicine++

      if (
        !(await this.Helper.checkIfMedicineGroupExist(
          pharmacist,
          args.medicineGroup,
        ))
      ) {
        inventory.numberOfMedicineGroup++
      }
    } catch (error) {
      console.error(error)
      throw new PharmacistError('An error ocurred while updating inventory')
    }
  }
}
export class PharmacistService {
  private static DB = DatabaseProvider.PharmacistProvider
  private static Helper = PharmacistHelpers
  private static Read = PharmacistReadOperations
  private static Write = PharmacistWriteOperations
  private static HospitalDB = DatabaseProvider.HospitalProvider

  static async createPharmacist(args: CreatePharmacistType) {
    const requiredParams = [
      'id',
      'hospitalIds',
      'name',
      'email',
      'location',
      'phoneNumber',
      'walletAddress',
      'regNo',
    ]

    if (
      !requiredParams.every(
        (param) => args[param as keyof CreatePharmacistType],
      )
    ) {
      throw new Error('Missing required parameter')
    }

    if (
      await this.Helper.validatePharmacistExistsInHospital(
        args.hospitalIds as number,
        args.walletAddress,
      )
    ) {
      throw new PharmacistError('Pharmacist already exists in hospital')
    }

    try {
      const hospital = await this.HospitalDB.fetchHospitalWithBlockchainId(
        args.hospitalIds as number,
      )

      if (!hospital) {
        throw new PharmacistError("Hospital doesn't exist")
      }

      await this.DB.createNewPharmacist(args)
      const pharmacist = await this.DB.fetchPharmacistByAddress(
        args.walletAddress,
      )
      pharmacist.hospitalIds.push(args.hospitalIds)

      const pharmacistPreview = {
        walletAddress: pharmacist.walletAddress,
        profilePicture: pharmacist.profilePicture,
        name: pharmacist.name,
        regNo: pharmacist.regNo,
        status: pharmacist.status,
      }

      try {
        hospital.pharmacists.push(pharmacistPreview)
      } catch (error) {
        await this.DB.removePharmacist(pharmacist.walletAddress)
        throw new PharmacistError('Error adding pharmacist to hospital')
      }

      await pharmacist.save()
      await hospital.save()

      return {
        success: ErrorCodes.Success,
        pharmacist,
        message: 'Pharmacist created successfully',
      }
    } catch (error) {
      console.error(error)
      throw new PharmacistError('An error ocurred while creating pharmacist')
    }
  }

  static async updatePharmacistProfilePicture(
    args: ProfileType,
  ): Promise<{ success: number; message: string }> {
    const { address, info } = args
    if (!address || address.length < 42 || !info) {
      throw new PharmacistError('Invalid or missing address or profile picture')
    }

    try {
      const { pharmacist } = await this.DB.fetchPharmacistByAddress(address)
      if (!pharmacist) {
        throw new PharmacistError("pharmacist doesn't exist")
      }
      pharmacist.profilePicture = info
      await pharmacist.save()

      return {
        success: ErrorCodes.Success,
        message: 'Profile picture updated',
      }
    } catch (error) {
      console.error(error)
      throw new PharmacistError('Error fetching pharmacist')
    }
  }

  static async updatePharmacistName(
    args: ProfileType,
  ): Promise<{ success: number; message: string }> {
    const { address, info } = args
    if (!address || address.length < 5 || !info) {
      throw new PharmacistError('Invalid or missing address or name')
    }

    try {
      const pharmacist = await this.DB.fetchPharmacistByAddress(address)
      if (!pharmacist) {
        throw new PharmacistError("pharmacist doesn't exist")
      }

      pharmacist.name = info
      await pharmacist.save()
      return {
        success: ErrorCodes.Success,
        message: 'Name updated successfully',
      }
    } catch (error) {
      console.error(error)
      throw new PharmacistError('Error updating name, please try again')
    }
  }

  static async updatePharmacistEmail(
    args: ProfileType,
  ): Promise<{ success: number; message: string }> {
    const { address, info } = args
    if (!address || address.length < 5 || !info) {
      throw new PharmacistError('Invalid or missing address or email')
    }

    try {
      const pharmacist = await this.DB.fetchPharmacistByAddress(address)
      if (!pharmacist) {
        throw new PharmacistError("pharmacist doesn't exist")
      }

      pharmacist.email = info
      await pharmacist.save()

      return {
        success: ErrorCodes.Success,
        message: 'Email updated successfully',
      }
    } catch (error) {
      console.error(error)
      throw new PharmacistError('Error updating email, please try again')
    }
  }

  static async updatePharmacistPhoneNumber(
    args: ProfileType,
  ): Promise<{ success: number; message: string }> {
    const { address, info } = args
    if (!address || address.length < 5 || !info) {
      throw new PharmacistError('Invalid or missing address or phone number')
    }

    try {
      const pharmacist = await this.DB.fetchPharmacistByAddress(address)
      if (!pharmacist) {
        throw new PharmacistError("pharmacist doesn't exist")
      }
      pharmacist.phoneNumber = info
      await pharmacist.save()

      return {
        success: ErrorCodes.Success,
        message: 'Phone number updated successfully',
      }
    } catch (error) {
      console.error(error)
      throw new PharmacistError('Error updating phone number, please try again')
    }
  }

  static async fetchPharmacistByAddress(
    address: string,
  ): Promise<{ success: number; pharmacist: PharmacistType }> {
    if (!address || address.length < 42) {
      throw new PharmacistError('Invalid or missing pharmacist address')
    }

    try {
      const pharmacist = await this.DB.fetchPharmacistByAddress(address)
      if (!pharmacist) {
        throw new PharmacistError('Pharmacist not found')
      }

      return {
        success: ErrorCodes.Success,
        pharmacist,
      }
    } catch (error) {
      console.error(error)
      throw new PharmacistError('Error fetching pharmacist by address')
    }
  }

  static async addMedicine(
    address: string,
    args: MedicineType,
  ): Promise<{ success: number; message: string }> {
    const {
      name,
      price,
      quantity,
      description,
      sideEffects,
      image,
      medicineGroup,
    } = args
    if (
      !name ||
      name.length < 5 ||
      !address ||
      address.length < 42 ||
      !price ||
      !quantity ||
      !description ||
      !sideEffects ||
      !image ||
      !medicineGroup
    ) {
      throw new PharmacistError('Invalid or missing parameter')
    }

    try {
      const pharmacist = await this.DB.fetchPharmacistByAddress(address)
      if (!pharmacist) {
        throw new PharmacistError("pharmacist doesn't exist")
      }

      if (pharmacist.inventory) {
        await this.Write.updateInventory(pharmacist, args)
        await pharmacist.save()
        return {
          success: ErrorCodes.Success,
          message: 'Updated existing inventory',
        }
      } else {
        await this.Write.createInventory(pharmacist, args)
        await pharmacist.save()
        return {
          success: ErrorCodes.Success,
          message: 'Created new inventory',
        }
      }
    } catch (error) {
      console.error(error)
      throw new PharmacistError('Error adding medicine')
    }
  }

  static async fetchInventory(
    address: string,
  ): Promise<{
    numberOfMedicine: number
    numberOfMedicineGroup: number
    numberOfMedicineSold: number
    medicines: MedicineType[]
  }> {
    {
      if (!address || address.length < 42) {
        throw new PharmacistError('Invalid or missing address')
      }

      try {
        const pharmacist = await this.DB.fetchPharmacistByAddress(address)
        if (!pharmacist) {
          throw new PharmacistError("pharmacist doesn't exist")
        }
        const inventory = await this.Helper.fetchInventory(pharmacist)
        if (!inventory) {
          return {
            numberOfMedicine: 0,
            numberOfMedicineGroup: 0,
            numberOfMedicineSold: 0,
            medicines: [],
          }
        }

        return {
          numberOfMedicine: inventory.numberOfMedicine,
          numberOfMedicineGroup: inventory.numberOfMedicineGroup,
          numberOfMedicineSold: inventory.numberOfMedicineSold,
          medicines: inventory.medicines,
        }
      } catch (error) {
        console.error(error)
        throw new PharmacistError('Error fetching inventory')
      }
    }
  }
}
