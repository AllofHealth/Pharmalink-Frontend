import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosError, AxiosInstance } from "axios";

// Define a type for the state returned by useAxios
interface UseAxiosState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  axiosInstance: AxiosInstance; // Added AxiosInstance to the return type
}

// Define a type for the hook parameters
interface UseAxiosParams {
  baseURL?: string; // Base URL for the API
  endpoint?: string; // Endpoint for the request
  options?: AxiosRequestConfig; // Additional Axios options (like headers, params, etc.)
}

// Custom hook with type support and generics
function useAxios<T = any>({
  baseURL = process.env.NEXT_PUBLIC_URL_BACKEND,
  endpoint,
  options,
}: UseAxiosParams): UseAxiosState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  // Create a new Axios instance with the specified baseURL and options
  const axiosInstance = axios.create({
    baseURL,
    ...options,
  });

  useEffect(() => {
    const source = axios.CancelToken.source(); // Axios cancel token for cleanup

    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axiosInstance({
          url: endpoint,
          cancelToken: source.token, // Attach cancel token to request
        });

        setData(response.data); // Store response data
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          setError(err as AxiosError); // Store error
        }
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();

    return () => {
      source.cancel("Component unmounted, request canceled"); // Cleanup on unmount
    };
  }, [axiosInstance, endpoint]); // Re-run if dependencies change

  return { data, loading, error, axiosInstance }; // Return state values along with Axios instance
}

export const useAxiosInstance = ({
  baseURL = process.env.NEXT_PUBLIC_URL_BACKEND,
  options,
}: {
  baseURL?: string;
  options?: AxiosRequestConfig;
}) => {
  const axiosInstance = axios.create({
    baseURL,
    ...options, // Spread additional options
  });

  // Optionally, set up interceptors or default headers here if needed
  // For example, you can add a response interceptor to handle common HTTP errors
  axiosInstance.interceptors.response.use(
    (response) => {
      return response; // Return the response if successful
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error occurred:", error.message); // Log the error message
      }
      return Promise.reject(error); // Reject the promise to propagate the error
    }
  );

  return { axiosInstance }; // Return the created Axios instance
};

export default useAxios;
