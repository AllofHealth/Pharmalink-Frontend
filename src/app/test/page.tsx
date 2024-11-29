'use client';

import React, {ChangeEvent, useEffect, useState} from 'react';
import {
    retrieveRecordFromIpfs,
    uploadRecordImageToIpfs,
    uploadRecordToIpfs,
} from '@/actions/shared/utils/upload.to.ipfs';
import {RecordInterface} from '@/actions/interfaces/Record/app.record.interface';
import {viewMedicalRecord} from '@/actions/contract/patient/patient.service.c';
import Image from "next/image";


const Page = () => {
    const [file, setFile] = useState<File | null>(null);
    const [imageCid, setImageCid] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>('https://ipfs.io/ipfs/QmUYma78kXDBRc9Rx2rdMxdge6Zr9kaTHJXEd7bUK9j2w4')


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")) {
            setFile(selectedFile);
        } else {
            alert("Please select a JPG or PNG file.");
            event.target.value = '';
        }
    }

    const handleImageUpload = async () => {
        if (file === null) {
            throw new Error('no file')
        }
        const hash = await uploadRecordImageToIpfs({image: file})
        setImageCid(hash);
    }

    const constructIpfsGateway = () => {
        if (imageCid === null) {
            alert('no cid')
        }

        const gatewayUrl = 'https://ipfs.io/ipfs/';
        const url = `${gatewayUrl}${imageCid}`
        setImageUrl(url);
    }

    const record: RecordInterface = {
        diagnosis: 'Malaria',
        content:
            'Patient suffers from stage 1 malaria, symptoms include fever, bitterness, nausea',
        doctorsName: 'Dr Mike',
        hospitalName: 'Best Care',
        labResults: {
            testName: 'Blood Test',
            referenceRange: '200mmg',
            units: 'mmg',
            comments: 'acute malaria',
        },
        generalReport: {
            heartBeat: '80bpm',
            bloodPressure: '80mmhg',
            sugarLevel: '120/50',
            haemoglobin: '80gh',
        },
        date: new Date(Date.now()),
    };

    const uploadRecord = async () => {
        const cid = await uploadRecordToIpfs(record);
        console.log(cid);
    };

    const retrieveRecord = async () => {
        const cid = 'QmY9YE1fwJEPvcLZs3QcW3ehS53XVdyaXZeRkARR9GKDVE';
        const record: RecordInterface = await retrieveRecordFromIpfs(cid);
        console.log(record);
        console.log(record.doctorsName, record.content);
    };

    const getRecordForContract = async () => {
        const hash = await viewMedicalRecord({
            recordId: 1,
            patientId: 1,
            viewerAddress: '0xF93B86F3D59399b89c3054CDa2eFcb52C37F0AEA',
        });

        console.log(hash);
    };



    return (
        <section className="flex justify-center items-center flex-col">
            <div className=" gap-5">
                <h1 className="text-black font-black text-3xl">Record Test</h1>
                <div className={`pb-9 flex flex-col gap-5`}>
                    <input type='file' accept='.jpg,.jpeg,.png' onChange={handleFileChange}
                           className={`w-full px-5 py-3 border rounded-md`}/>
                    <button
                        onClick={handleImageUpload}
                        className="border border-black rounded-[12px] bg-black px-3 shadow-md w-[fit-content] text-white">Upload
                        Picture
                    </button>


                    <Image
                        src={imageUrl as string}
                        alt="image"
                        width={300}
                        height={300}
                        className="object-contain object-center"
                    />

                </div>
                <button
                    className="border border-black rounded-[12px] bg-black px-3 shadow-md w-[fit-content] text-white"
                    onClick={getRecordForContract}
                >
                    Upload Record
                </button>
            </div>
        </section>
    );
};

export default Page;