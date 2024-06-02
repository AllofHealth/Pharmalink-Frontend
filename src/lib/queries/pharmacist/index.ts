import useAxios from "@/lib/hooks/useAxios";
import type { AllPharmacistAPIResponse } from "@/lib/types";
import { useEffect, useState } from "react";

export const useGetAllPharmacists = () => {
  const [pharmacists, setPharmacists] =
    useState<AllPharmacistAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchPharmacists = async () => {
    try {
      const pharmacists = await axios.get(`/api/pharmacist/getAllPharmacists`);
      setPharmacists(pharmacists.data);
    } catch (error: any) {
      console.error("Error getting pharmacists:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchPharmacists();
  }, []);

  return {
    pharmacists,
    loading,
    error,
  };
};
