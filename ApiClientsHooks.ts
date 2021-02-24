import { ModelBuilderControllerApi, ModelsControllerApi } from "./client";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

export function useModelsApi() {
  const axiosInstance = useAxios();
  return new ModelsControllerApi(null, basePath, axiosInstance);
}

export function useModelBuilderApi() {
  const axiosInstance = useAxios();
  return new ModelBuilderControllerApi(null, basePath, axiosInstance);
}

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
  }, []);

  return axiosInstance;
}
