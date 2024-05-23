import useAxios from "@/lib/hooks/useAxios";
import type {
  Admin,
  GetAdminNotExistMessage,
  GetDoctorMessage,
  GetDoctorNotExistMessage,
  GetPatientMessage,
  GetPatientNotExistMessage,
  GetPharmacistMessage,
  GetPharmacistNotExistMessage,
} from "@/lib/types";
import { useEffect, useState } from "react";

export const useGetPatientByAddress = ({
  connected,
  address,
}: {
  connected: boolean;
  address: string;
}) => {
  const [patientData, setPatientData] = useState<
    GetPatientMessage | GetPatientNotExistMessage | null
  >(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchPatientData = async () => {
    if (!connected) {
      return;
    }

    try {
      const patientDataResponse = await axios.get(
        `/api/patient/getPatientByAddress?walletAddress=${address}`
      );
      setPatientData(patientDataResponse.data);
    } catch (error: any) {
      console.error("Error getting patient by address:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchPatientData();
  }, [connected, address]);

  if (!connected) {
    return {
      patientData: null,
      loading: false,
      error: null,
    };
  }

  return {
    patientData,
    loading,
    error,
  };
};

export const useGetDoctorByAddress = ({
  connected,
  address,
}: {
  connected: boolean;
  address: string;
}) => {
  const [doctorData, setDoctorData] = useState<
    GetDoctorMessage | GetDoctorNotExistMessage | null
  >(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchDoctorData = async () => {
    if (!connected) {
      return;
    }

    try {
      const doctorDataResponse = await axios.get(
        `/api/doctor/doctorByAddress?walletAddress=${address}`
      );
      setDoctorData(doctorDataResponse.data);
    } catch (error: any) {
      console.error("Error getting doctor by address:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchDoctorData();
  }, [connected, address]);

  if (!connected) {
    return {
      doctorData: null,
      loading: false,
      error: null,
    };
  }

  return {
    doctorData,
    loading,
    error,
  };
};

export const useGetPharmacistByAddress = ({
  connected,
  address,
}: {
  connected: boolean;
  address: string;
}) => {
  const [pharmacistData, setPharmacistData] = useState<
    GetPharmacistMessage | GetPharmacistNotExistMessage | null
  >(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchPharmacistData = async () => {
    if (!connected) {
      return;
    }

    try {
      const pharmacistDataResponse = await axios.get(
        `/api/pharmacist/getPharmacist?walletAddress=${address}`
      );
      setPharmacistData(pharmacistDataResponse.data);
    } catch (error: any) {
      console.error("Error getting pharmacist by address:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchPharmacistData();
  }, [connected, address]);

  if (!connected) {
    return {
      pharmacistData: null,
      loading: false,
      error: null,
    };
  }

  return {
    pharmacistData,
    loading,
    error,
  };
};

export const useGetAdminByAddress = ({
  connected,
  address,
}: {
  connected: boolean;
  address: string;
}) => {
  const [adminData, setAdminData] = useState<
    Admin | GetAdminNotExistMessage | null
  >(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchAdminData = async () => {
    if (!connected) {
      return;
    }

    try {
      const adminDataResponse = await axios.get(
        `/api/admin/getAdminByAddress?walletAddress=${address}`
      );
      setAdminData(adminDataResponse.data);
    } catch (error: any) {
      console.error("Error getting admin by address:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchAdminData();
  }, [connected, address]);

  if (!connected) {
    return {
      adminData: null,
      loading: false,
      error: null,
    };
  }

  return {
    adminData,
    loading,
    error,
  };
};
