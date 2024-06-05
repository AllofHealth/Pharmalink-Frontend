import {
  RecordInterface,
  UploadImageInterface,
} from '@/actions/interfaces/Record/app.record.interface'
import { initializeIPFS } from './ipfs.utils'

export const uploadRecordToIpfs = async (newRecord: RecordInterface) => {
  try {
    const ipfs = initializeIPFS()
    const record = await ipfs.add(JSON.stringify(newRecord))
    await ipfs.pin.add(record.cid)

    return record.cid.toString()
  } catch (error) {
    console.error(error)
    throw new Error('An error occurred while uploading to ipfs')
  }
}

export const uploadRecordImageToIpfs = async (args: UploadImageInterface) => {
  try {
    const ipfs = initializeIPFS()
    const file = await ipfs.add(args.image)
    await ipfs.pin.add(file.cid)
    return file.cid.toString()
  } catch (error) {
    console.error(error)
    throw new Error('An error occurred while uploading to ipfs')
  }
}

export const retrieveRecordFromIpfs = async (ipfsHash: string) => {
  try {
    const ipfs = initializeIPFS()
    console.log(ipfs)
    const record = ipfs.get(ipfsHash)
    return record
  } catch (error) {
    console.error(error)
    throw new Error('An error occurred while retrieving from ipfs')
  }
}
