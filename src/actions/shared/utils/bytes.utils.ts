'use server'

import { ethers } from 'ethers'

export const string2Bytes32 = (str: string): string => {
  return ethers.encodeBytes32String(str)
}

export const bytes32ToString = (bytes32: string): string => {
  return ethers.decodeBytes32String(bytes32)
}
