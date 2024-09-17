import {processEvent} from '@/actions/shared/utils/EventLogger/event.processor'
import {provideContract, getSigner} from '../provider/contract.provider'
import {
    ContractEvents,
    DoctorError,
    ErrorCodes,
    EventNames,
} from '@/actions/shared/global'
import {
    AddMedicalRecordType,
    RecordAccessPermissionType,
    RecordApprovalType,
} from '@/actions/interfaces/Doctor/app.doctor.interface'


async function addDoctor(
    hospitalIds: number,
): Promise<{ success: number; doctorId: number }> {
    try {
        const contract = await provideContract()
        const signer = await getSigner()
        const address = await signer.getAddress()
        const transaction = await contract.createDoctor(hospitalIds, address)

        const receipt = await transaction.wait()
        const eventResult = await processEvent(
            receipt,
            EventNames.DoctorAdded,
            ContractEvents.DoctorAdded,
        )

        return {
            success: ErrorCodes.Success,
            doctorId: eventResult.doctorId,
        }
    } catch (error) {
        console.error(error)
        throw new DoctorError('Error adding doctor to contract')
    }
}

async function fetchDoctorId(address: string) {
    try {
        const contract = await provideContract()
        const doctor = await contract.doctors(address)
        return Number(doctor.doctorId)
    } catch (error) {
        console.error(error)
        throw new DoctorError('Error fetching doctor id from contract')
    }
}

async function isApprovedToAddNewRecord(patientId: number) {
    try {
        const contract = await provideContract()
        const signer = await getSigner()
        const address = await signer.getAddress()

        return await contract.isApprovedByPatientToAddNewRecord(
            patientId,
            address,
        )

    } catch (error) {
        console.error(error)
        throw new DoctorError(
            'Error checking if doctor is approved to add new record',
        )
    }
}

async function isApprovedToAddRecord(args: RecordApprovalType) {
    const {patientId, recordId} = args
    try {
        const contract = await provideContract()
        const signer = await getSigner()
        const address = await signer.getAddress()

        return await contract.isPatientApprovedDoctors(
            patientId,
            recordId,
            address,
        )

    } catch (error) {
        console.error(error)
        throw new DoctorError(
            'Error checking if doctor is approved to update existing record',
        )
    }
}

async function validateRecordAccessPermission(
    args: RecordAccessPermissionType,
) {
    const {patientId, recordId} = args
    try {
        const isApproved: boolean = recordId
            ? await isApprovedToAddRecord({patientId, recordId})
            : await isApprovedToAddNewRecord(patientId)

        return isApproved
    } catch (error) {
        console.error(error)
        throw new DoctorError('Error validating record access permission')
    }
}

async function addMedicalRecord(args: AddMedicalRecordType) {
    const {patientAddress, patientId, ipfsHash} = args
    try {
        const doctorAddress = await getSigner().then((signer) =>
            signer.getAddress(),
        )

        if (!ipfsHash.startsWith('Qm') || ipfsHash.length !== 46) {
            throw new DoctorError("Invalid CID format");
        }

        const contract = await provideContract()
        const transaction = await contract.addMedicalRecord(
            doctorAddress,
            patientAddress,
            patientId,
            ipfsHash
        )

        const receipt = await transaction.wait()
        const eventResult = await processEvent(
            receipt,
            EventNames.MedicalRecordAdded,
            ContractEvents.MedicalRecordAdded,
        )

        return {
            success: ErrorCodes.Success,
            medicalRecordId: eventResult.medicalRecordId,
            patientAddress: eventResult.patient,
            doctorAddress: eventResult.doctor,
        }
    } catch (error) {
        console.error(error)
        throw new DoctorError('Error adding medical record to contract')
    }
}

export {
    addDoctor,
    fetchDoctorId,
    addMedicalRecord,
    isApprovedToAddNewRecord,
    isApprovedToAddRecord,
    validateRecordAccessPermission,
}
