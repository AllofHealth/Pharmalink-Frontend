import useAxios from "@/lib/hooks/useAxios";
import type { PractitionersApiResponse } from "@/lib/types";
import { useEffect, useState } from "react";

export const useGetAllPractitioners = () => {
  const [practitioners, setPractitioners] =
    useState<PractitionersApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchPractitioners = async () => {
    try {
      const practitioners = await axios.get(`/api/admin/getAllPractitioners`);
      setPractitioners(practitioners.data);
    } catch (error: any) {
      console.error("Error getting practitioners:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchPractitioners();
  }, []);

  return {
    practitioners,
    loading,
    error,
  };
};
