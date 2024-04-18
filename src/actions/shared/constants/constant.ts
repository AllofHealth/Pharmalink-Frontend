'use server'
import dotenv from 'dotenv'
dotenv.config()

export const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || '0x08cE200554d317bAD4d880C82E5fb21fA632a8de'
export const IPFS_API_KEY =
  process.env.IPFS_API_KEY || '2WJpI7hd9vAuxRx3fsVOP8MHmZg'
export const IPFS_API_SECRET =
  process.env.IPFS_API_SECRET || '77ba2d6ddc757ec9ede30775ea2b0a20'
