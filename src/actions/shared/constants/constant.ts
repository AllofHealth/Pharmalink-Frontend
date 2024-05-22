import dotenv from 'dotenv'
dotenv.config()

export const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || '0x891525d01dc10b6690f5DE2200d28B18864FE187'
export const IPFS_API_KEY =
  process.env.IPFS_API_KEY || '2WJpI7hd9vAuxRx3fsVOP8MHmZg'
export const IPFS_API_SECRET =
  process.env.IPFS_API_SECRET || '77ba2d6ddc757ec9ede30775ea2b0a20'
export const PROJECT_ID =
  process.env.PROJECT_ID || '27414159f22891f65dac78f285165179'
