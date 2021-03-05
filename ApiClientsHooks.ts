import {
  EdgarExplorerControllerApi,
  ModelBuilderControllerApi,
  ModelsControllerApi,
  MxParserControllerApi,
} from "./client";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { serverErrorStore } from "./ServerErrorStore";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(null, (error) => {
  serverErrorStore.addError(error?.response?.data);
  return Promise.reject(error);
});

function useAxios() {
  const { getIdTokenClaims } = useAuth0();

  useEffect(() => {
    axiosInstance.interceptors.request.use(async (cfg) => {
      // TODO are we accidentally attaching a gazillion of these?
      const idToken = await getIdTokenClaims();
      return {
        ...cfg,
        headers: {
          ...cfg.headers,
          Authorization: `Bearer ${idToken?.__raw ?? "-"}`,
        },
      };
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

export function useMxParserApi() {
  const axiosInstance = useAxios();
  return new MxParserControllerApi(null, basePath, axiosInstance);
}

export function useEdgarExplorerControllerApi() {
  const axiosInstance = useAxios();
  return new EdgarExplorerControllerApi(null, basePath, axiosInstance)
}