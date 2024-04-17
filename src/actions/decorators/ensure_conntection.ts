'use server'

import { connectDB } from '../mongoose/db.service'

export function EnsureDbConnection(
  target: Object,
  propertyName: string | symbol,
  descriptor: TypedPropertyDescriptor<any>,
): TypedPropertyDescriptor<any> | void {
  const originalMethod = descriptor.value

  if (originalMethod) {
    descriptor.value = async function (...args: any[]) {
      await connectDB()
      return originalMethod.apply(this, args)
    }
  }

  return descriptor
}
