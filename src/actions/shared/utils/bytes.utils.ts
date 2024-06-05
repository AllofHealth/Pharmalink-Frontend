import { ethers } from 'ethers'

export const string2Bytes32 = (str: string) => {
  return ethers.encodeBytes32String(str)
}

export const bytes32ToString = (bytes32: string) => {
  return ethers.decodeBytes32String(bytes32)
}

export const getEmptyBytes32 = () => {
  return ethers.ZeroHash
}
