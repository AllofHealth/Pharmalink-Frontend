import dotenv from 'dotenv'
dotenv.config()

export const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || '0x5fE8843Df15505A1BFa0A5C267ca81735C2235Dd'
export const IPFS_API_KEY =
  process.env.IPFS_API_KEY || '2WJpI7hd9vAuxRx3fsVOP8MHmZg'
export const IPFS_API_SECRET =
  process.env.IPFS_API_SECRET || '77ba2d6ddc757ec9ede30775ea2b0a20'
export const PROFILE_PLACEHOLDER =
  'https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png'
export const HOSPITAL_PLACEHOLDER =
  'https://www.kindpng.com/picc/m/264-2646273_hydrodent-micro-channel-icon-hospital-navigation-icon-hospital.png'
export const PROJECT_ID =
  process.env.PROJECT_ID || '27414159f22891f65dac78f285165179'
