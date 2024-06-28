import useAxios from "@/lib/hooks/useAxios";
import type { AllDoctorApiResponse, ApprovalsResponse } from "@/lib/types";
import { useEffect, useState } from "react";

export const useGetAllDoctors = () => {
  const [doctors, setDoctors] = useState<AllDoctorApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      const doctors = await axios.get(`/api/doctor/allDoctors`);
      setDoctors(doctors.data);
    } catch (error: any) {
      console.error("Error getting doctors:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchDoctors();
  }, []);

  return {
    doctors,
    loading,
    error,
  };
};

export const useGetDoctorApprovalList = ({
  address,
  isConnected,
}: {
  address: string;
  isConnected: boolean;
}) => {
  const [doctorApprovalList, setDoctorsApprovalList] =
    useState<ApprovalsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchDoctorApprovalList = async () => {
    try {
      const doctorApprovalList = await axios.get(
        `/api/doctor/allRecordRequests?doctorAddress=${address}`
      );
      setDoctorsApprovalList(doctorApprovalList.data);
    } catch (error: any) {
      console.error("Error getting doctor Approval List:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchDoctorApprovalList();
  }, [isConnected, address]);

  return {
    doctorApprovalList,
    loading,
    error,
  };
};
