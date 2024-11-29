import {RecordInterface, UploadImageInterface,} from '@/actions/interfaces/Record/app.record.interface'
import {initializeIPFS} from './ipfs.utils'

export const uploadRecordToIpfs = async (newRecord: RecordInterface) => {
    const {images, ...rest} = newRecord
    let uploadedImagesUri: string[] = []
    try {
        const ipfs = initializeIPFS()

        if (images && images.length > 0) {
            for (const image of images) {
                uploadedImagesUri.push(await uploadRecordImageToIpfs({image}))
            }
        }

        const preparedRecord = {
            ...rest,
            recordImages: uploadedImagesUri,
        }
        const record = await ipfs.add(JSON.stringify(preparedRecord))
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
        const cid = file.cid.toString()

        if (!cid) {
            throw new Error('An error occurred while uploading to ipfs')
        }

        return cid
    } catch (error) {
        console.error(error)
        throw new Error('An error occurred while uploading to ipfs')
    }
}

export const retrieveRecordFromIpfs = async (ipfsHash: string) => {
    try {
        const ipfs = initializeIPFS()
        const asyncIterable = ipfs.get(ipfsHash)
        const chunks = []
        for await (const chunk of asyncIterable) {
            chunks.push(chunk)
        }
        const content = Buffer.concat(chunks)
        const contentString = content.toString()

        const jsonMatch = contentString.match(/{[\s\S]*}/)
        if (jsonMatch) {
            const jsonString = jsonMatch[0]
            return JSON.parse(jsonString)
        } else {
            throw new Error('No valid JSON object found in the IPFS content')
        }
    } catch (error) {
        console.error(error)
        throw new Error('An error occurred while retrieving from ipfs')
    }
}