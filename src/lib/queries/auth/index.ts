import useAxios from "@/lib/hooks/useAxios";
import type {
  GetDoctorMessage,
  GetDoctorNotExistMessage,
  GetPatientMessage,
  GetPatientNotExistMessage,
  GetPharmacistMessage,
  GetPharmacistNotExistMessage,
} from "@/lib/types";

export const useGetPatientByAddress = ({
  connected,
  address,
}: {
  connected: boolean;
  address: string;
}) => {
  const { data, loading, error } = useAxios<
    GetPatientMessage | GetPatientNotExistMessage
  >({
    endpoint: `api/patient/getPatientByAddress?walletAddress=${address}`,
  });

  if (!connected) {
    return {
      data: null,
      loading: false,
      error: null,
    };
  }

  return {
    data,
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
  const { data, loading, error } = useAxios<
    GetDoctorMessage | GetDoctorNotExistMessage
  >({
    endpoint: `api/doctor/doctorByAddress??walletAddress=${address}`,
  });

  if (!connected) {
    return {
      data: null,
      loading: false,
      error: null,
    };
  }

  return {
    data,
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
  const { data, loading, error } = useAxios<
    GetPharmacistMessage | GetPharmacistNotExistMessage
  >({
    endpoint: `api/pharmacist/getPharmacist?walletAddress=${address}`,
  });

  if (!connected) {
    return {
      data: null,
      loading: false,
      error: null,
    };
  }

  return {
    data,
    loading,
    error,
  };
};
