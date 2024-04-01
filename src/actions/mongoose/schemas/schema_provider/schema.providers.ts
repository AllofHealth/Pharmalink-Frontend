'use server'

import Admin from '../admin.schema'
import Doctor from '../doctor.schema'
import Hospital from '../hospital.schema'
import Pharmacist from '../pharmacist.schema'
import Patient from '../patient.schema'
import mongoose, { Schema } from 'mongoose'

interface ISchema {
  [key: string]: mongoose.Model<any, {}, {}, {}, any, any>
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
