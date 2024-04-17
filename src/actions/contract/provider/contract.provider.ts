'use server'

import { CONTRACT_ADDRESS } from '@/actions/shared/constants/constant'
import { MetamaskError } from '@/actions/shared/global'
import { ethers } from 'ethers'
import { abi } from '../abi/abi'

export const ContractProvider = {
  Factory: () => {
    return {
      getSigner: async () => {
        if (typeof window === 'undefined' || !(window as any).ethereum) {
          throw new MetamaskError()
        }

        const provider = new ethers.BrowserProvider((window as any).ethereum)
        const signer = await provider.getSigner()

        return signer
      },

      provideContract: async () => {
        const signer = await ContractProvider.Factory().getSigner()
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)

        return contract
      },
    }
  },
}
