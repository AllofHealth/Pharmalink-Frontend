'use server'

import { connectDB } from '../mongoose/db.service'

export async function EnsureConnection() {
  return async function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    await connectDB()

    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      return originalMethod.apply(this, args)
    }

    return descriptor
  }
}
