import useAxios from "@/lib/hooks/useAxios";
import {
  type FamilyMemberMedicalRecordsResponse,
  type FamilyMemberApiResponse,
  type MedicalRecordsResponse,
  type PatientPrescriptionsApiResponse,
} from "@/lib/types";
import { useEffect, useState } from "react";

export const useGetAllPatientFamilyMembers = ({
  walletAddress,
}: {
  walletAddress: string;
}) => {
  const [familyMembers, setFamilyMembers] =
    useState<FamilyMemberApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchFamilyMembers = async () => {
    try {
      const familyMembers = await axios.get(
        `/api/patient/allFamilyMembers?walletAddress=${walletAddress}`
      );
      setFamilyMembers(familyMembers.data);
    } catch (error: any) {
      console.error("Error getting familyMembers:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchFamilyMembers();
  }, []);

  return {
    familyMembers,
    loading,
    error,
  };
};

export const useGetAllPatientPresciptions = ({
  walletAddress,
}: {
  walletAddress: string;
}) => {
  const [patientPrescriptions, setPatientPrescriptions] =
    useState<PatientPrescriptionsApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchPatientPrescriptions = async () => {
    try {
      const patientPrescriptions = await axios.get(
        `/api/patient/allPrescriptions?walletAddress=${walletAddress}`
      );
      setPatientPrescriptions(patientPrescriptions.data);
    } catch (error: any) {
      console.error("Error getting Patient Prescriptions:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchPatientPrescriptions();
  }, []);

  return {
    patientPrescriptions,
    loading,
    error,
  };
};

export const useGetAllPatientMedicalRecords = ({
  walletAddress,
  familyMemberId,
}: {
  walletAddress: string;
  familyMemberId: number;
}) => {
  const [medicalRecords, setMedicalRecords] =
    useState<MedicalRecordsResponse | null>(null);
  const [familyMemberMedicalRecords, setFamilyMemberMedicalRecords] =
    useState<FamilyMemberMedicalRecordsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchMedicalRecords = async () => {
    try {
      const medicalRecords = await axios.get(
        `/api/patient/allMedicalRecords?walletAddress=${walletAddress}`
      );
      setMedicalRecords(medicalRecords.data);
    } catch (error: any) {
      console.error("Error getting Patient medical records:", error);
      setError(error);
    }

    try {
      const familyMemberMedicalRecordsResponse = await axios.get(
        `/api/patient/familyMemberMedicalRecords?principalPatientAddress=${walletAddress}&familyMemberId=${familyMemberId}`
      );
      setFamilyMemberMedicalRecords(familyMemberMedicalRecordsResponse.data);
    } catch (error: any) {
      console.error(
        "Error getting Patient Family member medical records:",
        error
      );
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchMedicalRecords();
  }, []);

  return {
    medicalRecords,
    familyMemberMedicalRecords,
    loading,
    error,
  };
};
