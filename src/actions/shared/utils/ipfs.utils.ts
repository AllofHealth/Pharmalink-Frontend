import { IPFS_API_KEY, IPFS_API_SECRET } from '../constants/constant'
import { create } from 'kubo-rpc-client'

const auth =
  'Basic ' +
  Buffer.from(`${IPFS_API_KEY}:${IPFS_API_SECRET}`).toString('base64')

export const initializeIPFS = () => {
  return create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  })
}
