'use server'

import mongoose from 'mongoose'
import { MONGODB_URI } from '../lib/constants'

let cached = (global as any).mongoose || { conn: null, promise: null }

export const connectDB = async () => {
  mongoose.set('strictQuery', true)

  if (cached.conn) {
    return cached.conn
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI not found')
  }

  cached.promise = mongoose.connect(MONGODB_URI, {
    dbName: 'Pharmalink',
    bufferCommands: false,
  })

  console.log('Connecting to MongoDB...')

  cached.conn = await cached.promise

  console.log('MongoDB connected')

  return cached.conn
}
