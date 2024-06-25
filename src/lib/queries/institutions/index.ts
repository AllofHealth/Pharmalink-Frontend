import useAxios from "@/lib/hooks/useAxios";
import type { InstitutionApiResponse } from "@/lib/types";
import { useEffect, useState } from "react";

export const useGetInstitutions = () => {
  const [institutions, setInstitutions] =
    useState<InstitutionApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchInstitutions = async () => {
    try {
      const institutionsDataResponse = await axios.get(
        `/api/hospital/allHospitals`
      );
      setInstitutions(institutionsDataResponse.data);
    } catch (error: any) {
      console.error("Error getting institutions:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchInstitutions();
  }, []);

  return {
    institutions,
    loading,
    error,
  };
};

export const useGetPractitionerInstitutions = ({
  walletAddress,
  isConnected,
}: {
  walletAddress: string;
  isConnected: boolean;
}) => {
  const [practitionerInstitutions, setPractitionerInstitutions] =
    useState<InstitutionApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);
  console.log(walletAddress);

  const fetchPractitionerInstitutions = async () => {
    try {
      const practitionerInstitutionsDataResponse = await axios.get(
        `/api/hospital/practitionerCreatedHospitals?walletAddress=${walletAddress}`
      );
      setPractitionerInstitutions(practitionerInstitutionsDataResponse.data);
    } catch (error: any) {
      console.error("Error getting practitioner Institutions:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchPractitionerInstitutions();
  }, [walletAddress, isConnected]);

  return {
    practitionerInstitutions,
    loading,
    error,
  };
};
