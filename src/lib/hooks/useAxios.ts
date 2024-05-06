import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

// Define a type for the state returned by useAxios
interface UseAxiosState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

// Define a type for the hook parameters
interface UseAxiosParams {
  baseURL?: string; // Base URL for the API
  endpoint: string; // Endpoint for the request
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // HTTP method
  options?: AxiosRequestConfig; // Additional Axios options (like headers, params, etc.)
  requestData?: any; // Data for POST, PUT, PATCH requests
}

// Custom hook with type support and generics
function useAxios<T = any>({
  baseURL = process.env.NEXT_PUBLIC_URL_BACKEND,
  endpoint,
  method,
  options,
  requestData,
}: UseAxiosParams): UseAxiosState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source(); // Axios cancel token for cleanup

    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios({
          method,
          baseURL,
          url: endpoint,
          data: requestData,
          cancelToken: source.token, // Attach cancel token to request
          ...options, // Additional Axios options
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
  }, [baseURL, endpoint, method, options, requestData]); // Re-run if dependencies change

  return { data, loading, error }; // Return state values
}

export default useAxios;
