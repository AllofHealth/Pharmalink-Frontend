'use server'

import { ErrorCodes, PharmacistError } from '@/actions/shared/global'
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
}

class PharmacistReadOperations {}

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
}
