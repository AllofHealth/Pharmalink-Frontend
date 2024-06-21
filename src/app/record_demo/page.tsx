// "use client";
// import {
//   uploadRecordImageToIpfs,
//   uploadRecordToIpfs,
// } from "@/actions/shared/utils/upload.to.ipfs";
// import {
//   addMedicalRecord,
//   validateRecordAccessPermission,
// } from "@/actions/contract/doctor/doctor.service.c";
// import { RecordInterface } from "@/actions/interfaces/Record/app.record.interface";

// const Page = () => {
//   /**
//    * Adds a new medical record to the system.
//    *
//    * @param patientId - The ID of the patient the record is for.
//    * @param patientAddress - The Ethereum address of the patient.
//    * @param recordId - The optional ID of the record being added.
//    * @param image - The optional image file to be uploaded with the record.
//    * @returns An object containing the ID of the new medical record and the address of the doctor who added it.
//    */
//   const handleAddMedicalRecord = async (
//     patientId: number,
//     patientAddress: string,
//     recordId?: number,
//     image?: File
//   ) => {
//     const recordInput: RecordInterface = {
//       diagnosis: "Cholera",
//       doctorsName: "Dr Sweet",
//       hospitalName: "Hospital 1",
//       content: "Patient has bloody stool, type a definition of cholera",
//       date: new Date(),
//     };

//     //Checks if the patient has approved doctor to add new record or update existing record
//     const isApproved = await validateRecordAccessPermission({
//       patientId,
//       recordId,
//     });

//     if (!isApproved) {
//       return {
//         message: "doctor not approved to access or add record",
//       };
//     }

//     //uploads the record input to ipfs and gets a hash back
//     const ipfsHash = await uploadRecordToIpfs(recordInput);
//     if (!ipfsHash) {
//       return {
//         message: "Error uploading record",
//       };
//     }

//     //uploads image to ipfs if available and gets a hash back
//     const imageHash = image
//       ? await uploadRecordImageToIpfs({ image })
//       : undefined;

//     //adds record to blockchain
//     const { medicalRecordId, doctorAddress } = await addMedicalRecord({
//       patientAddress,
//       patientId,
//       diagnosis: recordInput.diagnosis,
//       ipfsHash,
//       recordImageHash: imageHash,
//     });

//     //returns medical id to be added to backend
//     return {
//       medicalRecordId,
//       doctorAddress,
//     };
//   };
//   return (
//     <section className="flex flex-col gap-7">
//       <div className="flex flex-col gap-7">
//         <h2 className=" text-4xl">Simple Record Demo</h2>
//         <button onClick={() => handleAddMedicalRecord(1, "0x1234")}>
//           <p>Upload record</p>
//         </button>
//       </div>
//     </section>
//   );
// };
// export default Page;
