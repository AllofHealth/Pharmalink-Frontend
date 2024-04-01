'use server'

import Admin from '../admin.schema'
import Doctor from '../doctor.schema'
import Hospital from '../hospital.schema'
import Pharmacist from '../pharmacist.schema'
import Patient from '../patient.schema'

import { DbType } from '@/actions/shared/global'
interface ISchema {
  [key: string]: DbType['DB']
}

class SchemaProvider {
  private schemas: ISchema

  constructor() {
    this.schemas = {
      Admin,
      Doctor,
      Hospital,
      Pharmacist,
      Patient,
    }
  }
  public getSchema(schemaName: string): any {
    return this.schemas[schemaName]
  }
}

export const schemaProvider = new SchemaProvider()
