'use server'
import dotenv from 'dotenv'
dotenv.config()

export const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || '0x31fAe14A19e494f4B8eD2Ff2ea9FB2fc4B422cCA'
