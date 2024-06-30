import useAxios from "@/lib/hooks/useAxios";
import type {
  AllInventoryApiResponse,
  AllMedicinesApiResponse,
  AllPharmacistAPIResponse,
  PatientPrescriptionsApiResponse,
} from "@/lib/types";
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

export const useGetInventory = ({
  walletAddress,
}: {
  walletAddress: string;
}) => {
  const [inventory, setInventory] = useState<AllInventoryApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchAllInventory = async () => {
    try {
      const inventory = await axios.get(
        `/api/pharmacist/getInventory?walletAddress=${walletAddress}`
      );
      setInventory(inventory.data);
    } catch (error: any) {
      console.error("Error getting inventory:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchAllInventory();
  }, []);

  return {
    inventory,
    loading,
    error,
  };
};

export const useGetAllMedicines = ({
  walletAddress,
}: {
  walletAddress: string;
}) => {
  const [medicines, setMedicines] = useState<AllMedicinesApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchAllMedicines = async () => {
    try {
      const medicines = await axios.get(
        `/api/pharmacist/getAllMedicines?walletAddress=${walletAddress}`
      );
      setMedicines(medicines.data);
    } catch (error: any) {
      console.error("Error getting medicines:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchAllMedicines();
  }, []);

  return {
    medicines,
    loading,
    error,
  };
};

export const useGetSharedPrescriptions = ({
  walletAddress,
}: {
  walletAddress: string;
}) => {
  const [sharedPrescriptions, setSharedPrescriptions] =
    useState<PatientPrescriptionsApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { axios } = useAxios({
    baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  });
  const [error, setError] = useState(null);

  const fetchSharedPrescriptions = async () => {
    try {
      const sharedPrescriptions = await axios.get(
        `/api/pharmacist/getAllSharedPrescriptions?walletAddress=${walletAddress}`
      );
      setSharedPrescriptions(sharedPrescriptions.data);
    } catch (error: any) {
      console.error("Error getting shared Prescriptions:", error);
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchSharedPrescriptions();
  }, []);

  return {
    sharedPrescriptions,
    loading,
    error,
  };
};
