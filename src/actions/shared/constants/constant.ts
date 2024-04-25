'use server'
import dotenv from 'dotenv'
dotenv.config()

export const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || '0xBf344DB3C370E18c1bBed941D5ADA201de0F8E3B'
export const IPFS_API_KEY =
  process.env.IPFS_API_KEY || '2WJpI7hd9vAuxRx3fsVOP8MHmZg'
export const IPFS_API_SECRET =
  process.env.IPFS_API_SECRET || '77ba2d6ddc757ec9ede30775ea2b0a20'
export const PROFILE_PLACEHOLDER =
  'https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png'
export const HOSPITAL_PLACEHOLDER =
  'https://www.kindpng.com/picc/m/264-2646273_hydrodent-micro-channel-icon-hospital-navigation-icon-hospital.png'
