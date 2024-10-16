import useAxios from "@/lib/hooks/useAxios";
import { useEffect, useState } from "react";

export const useGetAllMedicinesCategory = () => {
  const [medicinesCategory, setMedicinesCategory] = useState<string[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchMedicinesCategory = async () => {
    try {
      const medicines = await axios.get(`/api/medicine/fetchCategories`);
      setMedicinesCategory(medicines.data);
    } catch (error: any) {
      console.error("Error getting medicines category:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchMedicinesCategory();
  }, []);

  return {
    medicinesCategory,
    loading,
    error,
  };
};
