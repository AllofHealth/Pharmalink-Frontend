'use server'
import dotenv from 'dotenv'
dotenv.config()

export const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || '0x21FC1569767da5B6C0Ab72eDEFC610E92FC42d43'
export const IPFS_API_KEY =
  process.env.IPFS_API_KEY || '2WJpI7hd9vAuxRx3fsVOP8MHmZg'
export const IPFS_API_SECRET =
  process.env.IPFS_API_SECRET || '77ba2d6ddc757ec9ede30775ea2b0a20'
