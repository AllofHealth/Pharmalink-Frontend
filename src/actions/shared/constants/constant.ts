import dotenv from 'dotenv'
dotenv.config()

export const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || '0x8e83522949c54DF5B028E5ff7BE0b16b76f914Fa'
export const IPFS_API_KEY =
  process.env.IPFS_API_KEY || '3a7f7aa0e3864e3c97172d8ebabd12c0'
export const IPFS_API_SECRET =
  process.env.IPFS_API_SECRET || '558fc131c6f94df5b242b9d17442014f'
export const PROJECT_ID =
  process.env.PROJECT_ID || '27414159f22891f65dac78f285165179'
