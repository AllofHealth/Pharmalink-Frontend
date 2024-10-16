export const abi = [
  { "type": "constructor", "inputs": [], "stateMutability": "nonpayable" },
  { "type": "receive", "stateMutability": "payable" },
  {
    "type": "function",
    "name": "addMedicalRecord",
    "inputs": [
      {
        "name": "_doctorAddress",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_patientAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_patientId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "_recordDetailsUri",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addMedicalRecordForFamilyMember",
    "inputs": [
      {
        "name": "_doctorAddress",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_principalPatientId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_familyMemberId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_recordDetailsUri",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addPatient",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addPatientFamilyMember",
    "inputs": [
      {
        "name": "_principalPatientId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addSystemAdmin",
    "inputs": [
      { "name": "_admin", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "approveAccessToAddNewRecord",
    "inputs": [
      {
        "name": "_doctorAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_patientId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "approveAccessToAddNewRecordForFamilyMember",
    "inputs": [
      {
        "name": "_doctorAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_patientId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "_principalPatientId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "approveDoctor",
    "inputs": [
      {
        "name": "_doctorAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_hospitalId", "type": "uint256", "internalType": "uint256" },
      { "name": "_doctorId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "approveFamilyMemberMedicalRecordAccess",
    "inputs": [
      {
        "name": "_doctorAddress",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_principalPatientId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_familyMemberId",
        "type": "uint256",
        "internalType": "uint256"
      },
      { "name": "_recordId", "type": "uint256", "internalType": "uint256" },
      { "name": "_duration", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "approveHospital",
    "inputs": [
      { "name": "_hospitalId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "approveMedicalRecordAccess",
    "inputs": [
      {
        "name": "_practitionerAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_patientId", "type": "uint256", "internalType": "uint256" },
      { "name": "_recordId", "type": "uint256", "internalType": "uint256" },
      { "name": "_duration", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "approvePharmacist",
    "inputs": [
      {
        "name": "_pharmacistAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_hospitalId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "_pharmacistId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "approvedDoctorCount",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approvedDoctors",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approvedPharmacistCount",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approvedPharmacists",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createDoctor",
    "inputs": [
      { "name": "_hospitalId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "_doctorAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "createHospital",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "createPharmacist",
    "inputs": [
      { "name": "_hospitalId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "_pharmacistAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "doctorCount",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "doctorExists",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "doctors",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [
      { "name": "doctorId", "type": "uint256", "internalType": "uint256" },
      { "name": "hospitalId", "type": "uint256", "internalType": "uint256" },
      { "name": "doctor", "type": "address", "internalType": "address" },
      {
        "name": "approvalStatus",
        "type": "uint8",
        "internalType": "enum AllofHealthv2.approvalType"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hospitalApprovedPractitioners",
    "inputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hospitalCount",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hospitalDoctors",
    "inputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hospitalExists",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hospitalPharmacists",
    "inputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hospitals",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [
      { "name": "hospitalId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "doctorsCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "pharmacistsCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      { "name": "admin", "type": "address", "internalType": "address" },
      {
        "name": "approvalStatus",
        "type": "uint8",
        "internalType": "enum AllofHealthv2.approvalType"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isApprovedByPatientToAddNewRecord",
    "inputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isApprovedByPatientToAddNewRecordForFamilyMember",
    "inputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isDoctor",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isPatient",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isPatientApprovedDoctorForFamilyMember",
    "inputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isPatientApprovedDoctors",
    "inputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isPatientFamilyMember",
    "inputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isPharmacist",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "patientCount",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "patientFamilyMedicalRecord",
    "inputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      {
        "name": "medicalRecordId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "principalPatientId",
        "type": "uint256",
        "internalType": "uint256"
      },
      { "name": "patientId", "type": "uint256", "internalType": "uint256" },
      { "name": "duration", "type": "uint256", "internalType": "uint256" },
      { "name": "expiration", "type": "uint256", "internalType": "uint256" },
      {
        "name": "approvedDoctor",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "recordDetailsUri",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "patientFamilyMembers",
    "inputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      { "name": "patientId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "approvalCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "principalPatientId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "familyMemberMedicalRecordCount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "patientMedicalRecords",
    "inputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      {
        "name": "medicalRecordId",
        "type": "uint256",
        "internalType": "uint256"
      },
      { "name": "patientId", "type": "uint256", "internalType": "uint256" },
      { "name": "duration", "type": "uint256", "internalType": "uint256" },
      { "name": "expiration", "type": "uint256", "internalType": "uint256" },
      { "name": "patient", "type": "address", "internalType": "address" },
      {
        "name": "approvedDoctor",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "recordDetailsUri",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "patients",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [
      { "name": "patientId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "approvalCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "patientMedicalRecordCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "patientFamilyMemberCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "walletAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "pharmacistCount",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "pharmacistExists",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "pharmacists",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [
      {
        "name": "pharmacistId",
        "type": "uint256",
        "internalType": "uint256"
      },
      { "name": "hospitalId", "type": "uint256", "internalType": "uint256" },
      { "name": "pharmacist", "type": "address", "internalType": "address" },
      {
        "name": "approvalStatus",
        "type": "uint8",
        "internalType": "enum AllofHealthv2.approvalType"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "reassignHospitalAdmin",
    "inputs": [
      { "name": "_hospitalId", "type": "uint256", "internalType": "uint256" },
      { "name": "_admin", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "rejectDoctor",
    "inputs": [
      {
        "name": "_doctorAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_doctorId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "rejectHospital",
    "inputs": [
      { "name": "_hospitalId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "rejectPharmacist",
    "inputs": [
      {
        "name": "_pharmacistAddress",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_pharmacistId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "removeDoctorFromHospital",
    "inputs": [
      {
        "name": "_doctorAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_hospitalId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "_doctorHospitalId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "removePharmacistFromHospital",
    "inputs": [
      {
        "name": "_pharmacistAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_hospitalId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "_pharmacistHospitalId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "removeSystemAdmin",
    "inputs": [
      { "name": "_admin", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "revokeAccessToAddNewRecord",
    "inputs": [
      {
        "name": "_doctorAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_patientId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "revokeAccessToAddNewRecordForFamilyMember",
    "inputs": [
      {
        "name": "_doctorAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_patientId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "_principalPatientId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "revokeFamilyMemberMedicalRecordAccess",
    "inputs": [
      {
        "name": "_doctorAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_recordId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "_principalPatientId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_familyMemberId",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "revokeMedicalRecordAccess",
    "inputs": [
      { "name": "_patientId", "type": "uint256", "internalType": "uint256" },
      { "name": "_recordId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "_doctorAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "systemAdminCount",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "systemAdmins",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "viewFamilyMemberMedicalRecord",
    "inputs": [
      { "name": "_recordId", "type": "uint256", "internalType": "uint256" },
      {
        "name": "_principalPatientId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_familyMemberId",
        "type": "uint256",
        "internalType": "uint256"
      },
      { "name": "_viewer", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "viewMedicalRecord",
    "inputs": [
      { "name": "_recordId", "type": "uint256", "internalType": "uint256" },
      { "name": "_patientId", "type": "uint256", "internalType": "uint256" },
      { "name": "_viewer", "type": "address", "internalType": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "viewerHasAccessToMedicalRecord",
    "inputs": [
      { "name": "_viewer", "type": "address", "internalType": "address" },
      { "name": "_patientId", "type": "uint256", "internalType": "uint256" },
      { "name": "_recordId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "viewerHasAccessToPatientFamilyMemberMedicalRecord",
    "inputs": [
      { "name": "_viewer", "type": "address", "internalType": "address" },
      {
        "name": "_principalPatientId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_familyMemberId",
        "type": "uint256",
        "internalType": "uint256"
      },
      { "name": "_recordId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "AdminAdded",
    "inputs": [
      {
        "name": "admin",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "AdminRemoved",
    "inputs": [
      {
        "name": "admin",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "DoctorAdded",
    "inputs": [
      {
        "name": "doctor",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "hospitalId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "doctorId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "DoctorApproved",
    "inputs": [
      {
        "name": "hospitalId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "doctorId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "doctor",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "DoctorRejected",
    "inputs": [
      {
        "name": "doctor",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "doctorId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "FamilyMemberMedicalRecordAdded",
    "inputs": [
      {
        "name": "doctor",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "principalPatient",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "familyMemberId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "medicalRecordId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "HospitalApproved",
    "inputs": [
      {
        "name": "hospitalId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "HospitalCreated",
    "inputs": [
      {
        "name": "admin",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "hospitalId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "HospitalRejected",
    "inputs": [
      {
        "name": "hospitalId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "HospitalRemovedDoctor",
    "inputs": [
      {
        "name": "doctor",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "hospitalId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "HospitalRemovedPharmacist",
    "inputs": [
      {
        "name": "pharmacist",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "hospitalId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "MedicalRecordAccessApproved",
    "inputs": [
      {
        "name": "patient",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "approvedDoctor",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "medicalRecordId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "MedicalRecordAccessed",
    "inputs": [
      {
        "name": "recordDetailsUri",
        "type": "string",
        "indexed": true,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "MedicalRecordAdded",
    "inputs": [
      {
        "name": "doctor",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "patient",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "medicalRecordId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "PatientAdded",
    "inputs": [
      {
        "name": "patient",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "patientId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "PatientFamilyMemberAdded",
    "inputs": [
      {
        "name": "principalPatientId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "patientId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "PharmacistAdded",
    "inputs": [
      {
        "name": "pharmacist",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "hospitalId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "pharmacistId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "PharmacistApproved",
    "inputs": [
      {
        "name": "hospitalId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "pharmacistId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "pharmacist",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "PharmacistRejected",
    "inputs": [
      {
        "name": "pharmacist",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "pharmacistId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RecordAccessRevoked",
    "inputs": [
      {
        "name": "patient",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "approvedDoctor",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "medicalRecordId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SystemAdminAdded",
    "inputs": [
      {
        "name": "admin",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "adminId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SystemAdminRemoved",
    "inputs": [
      {
        "name": "admin",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "adminId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "WriteAccessGranted",
    "inputs": [
      {
        "name": "doctor",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "patientId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "WriteAccessRevoked",
    "inputs": [
      {
        "name": "doctor",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "patientId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  { "type": "error", "name": "AccessAlreadyGranted", "inputs": [] },
  { "type": "error", "name": "AccessNotGranted", "inputs": [] },
  { "type": "error", "name": "AccessToRecordAlreadyGranted", "inputs": [] },
  { "type": "error", "name": "AccessToRecordNotGranted", "inputs": [] },
  { "type": "error", "name": "DoctorAlreadyRejected", "inputs": [] },
  { "type": "error", "name": "DoctorNotApproved", "inputs": [] },
  { "type": "error", "name": "DoctorNotFound", "inputs": [] },
  { "type": "error", "name": "DuplicateDoctorAddress", "inputs": [] },
  { "type": "error", "name": "DuplicateDoctorRegNo", "inputs": [] },
  { "type": "error", "name": "DuplicateHospitalRegNo", "inputs": [] },
  { "type": "error", "name": "DuplicatePatientAddress", "inputs": [] },
  { "type": "error", "name": "DuplicatePatientFamilyMember", "inputs": [] },
  { "type": "error", "name": "DuplicatePharmacistAddress", "inputs": [] },
  { "type": "error", "name": "HospitalNotApproved", "inputs": [] },
  { "type": "error", "name": "InvalidAddress", "inputs": [] },
  { "type": "error", "name": "InvalidDoctorId", "inputs": [] },
  { "type": "error", "name": "InvalidFamilyMemberId", "inputs": [] },
  { "type": "error", "name": "InvalidHospitalId", "inputs": [] },
  { "type": "error", "name": "InvalidMedicalRecordDetail", "inputs": [] },
  { "type": "error", "name": "InvalidMedicalRecordId", "inputs": [] },
  { "type": "error", "name": "InvalidPatientId", "inputs": [] },
  { "type": "error", "name": "InvalidPharmacistId", "inputs": [] },
  { "type": "error", "name": "InvalidPractitioner", "inputs": [] },
  { "type": "error", "name": "InvalidRecordType", "inputs": [] },
  { "type": "error", "name": "InvalidRegNo", "inputs": [] },
  { "type": "error", "name": "MedicalRecordAccessRevoked", "inputs": [] },
  { "type": "error", "name": "MedicalRecordNotFound", "inputs": [] },
  { "type": "error", "name": "NotRecordOwner", "inputs": [] },
  { "type": "error", "name": "OnlyAdminAllowed", "inputs": [] },
  { "type": "error", "name": "OnlyPatientAllowed", "inputs": [] },
  { "type": "error", "name": "OnlySystemAdminAllowed", "inputs": [] },
  { "type": "error", "name": "PharmacistAlreadyRejected", "inputs": [] },
  { "type": "error", "name": "PharmacistNotApproved", "inputs": [] },
  { "type": "error", "name": "PharmacistNotFound", "inputs": [] },
  { "type": "error", "name": "PractitionerNotApproved", "inputs": [] },
  { "type": "error", "name": "RecordNotFound", "inputs": [] },
  { "type": "error", "name": "Unauthorized", "inputs": [] }
]