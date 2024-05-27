import axios, { AxiosHeaders } from "axios";

type AxiosRequestHeaders = Record<string, string | number | boolean>;

const useAxios = ({
  baseURL = process.env.NEXT_PUBLIC_URL_BACKEND,
  headers,
}: {
  baseURL?: string;
  headers?: AxiosRequestHeaders;
}) => {
  const axiosInstance = axios.create({
    baseURL,
    timeout: 20000,
    headers: {
      // Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
  });

  // const refresh = () => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const data = await axiosInstance.post("/auth/refreshToken/", {
  //         refresh: refreshToken,
  //       })
  //       const newAccessToken: string = data.data.access as string

  //       if (newAccessToken) resolve(newAccessToken)
  //       else reject({ status: 401, message: "Token is invalid or expired" })
  //     } catch (error: any) {
  //       reject(error.response.data)
  //     }
  //   })
  // }

  return { axios: axiosInstance };
};

export default useAxios;
