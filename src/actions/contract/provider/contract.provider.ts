import { CONTRACT_ADDRESS } from '@/actions/shared/constants/constant'
import { MetamaskError } from '@/actions/shared/global'
import { ethers } from 'ethers'
import { abi } from '../abi/abi'

export const getSigner = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    return signer
  } else {
    throw new MetamaskError('Metamask not found')
  }
}

export const provideContract = async () => {
  const signer = await getSigner()
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)

  return contract
}
