import { ModelBuilderControllerApi, ModelsControllerApi } from "./client";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { serverErrorStore } from "./ServerErrorStore";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const axiosInstance = axios.create();

function useAxios() {
  const { getIdTokenClaims } = useAuth0();

  useEffect(() => {
    axiosInstance.interceptors.request.use(async (cfg) => {
      const { __raw } = await getIdTokenClaims();
      return {
        ...cfg,
        headers: {
          ...cfg.headers,
          Authorization: `Bearer ${__raw}`,
        },
      };
    });
    axiosInstance.interceptors.response.use(null, (error) => {
      console.log("... error here ...");

      serverErrorStore.addError(error?.response?.data);
      return Promise.reject(error);
    });
  }, []);

  return axiosInstance;
}

export function useModelsApi() {
  const axiosInstance = useAxios();
  return new ModelsControllerApi(null, basePath, axiosInstance);
}

export function useModelBuilderApi() {
  const axiosInstance = useAxios();
  return new ModelBuilderControllerApi(null, basePath, axiosInstance);
}
