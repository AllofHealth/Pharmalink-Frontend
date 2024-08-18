'use client';

import React from 'react';
import {
  uploadRecordToIpfs,
  retrieveRecordFromIpfs,
} from '@/actions/shared/utils/upload.to.ipfs';
import { RecordInterface } from '@/actions/interfaces/Record/app.record.interface';

const Page = () => {
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
  return (
    <section className="flex justify-center items-center flex-col">
      <div className=" gap-5">
        <h1 className="text-black font-black text-3xl">Record Test</h1>
        <button
          className="border border-black rounded-[12px] bg-black px-3 shadow-md w-[fit-content] text-white"
          onClick={retrieveRecord}
        >
          Upload Record
        </button>
      </div>
    </section>
  );
};

export default Page;
