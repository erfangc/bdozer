import {
  EdgarExplorerControllerApi,
  FilingEntityManagerControllerApi,
  MxParserControllerApi,
  NarrativeBuilderControllerApi,
  StockAnalyzerFactoryControllerApi,
} from "./client";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { serverErrorStore } from "./ServerErrorStore";
import { v4 as uuid } from 'uuid'

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "http://localhost:8080";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(null, (error) => {
  const apiError = {
    id: uuid(),
    ...error?.response?.data
  };
  serverErrorStore.addError(apiError);
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

export function useMxParser() {
  const axiosInstance = useAxios();
  return new MxParserControllerApi(null, basePath, axiosInstance);
}

export function useStockAnalyzerFactory() {
  const axiosInstance = useAxios();
  return new StockAnalyzerFactoryControllerApi(null, basePath, axiosInstance);
}

export function useEdgarExplorer() {
  const axiosInstance = useAxios();
  return new EdgarExplorerControllerApi(null, basePath, axiosInstance)
}

export function useFilingEntityManager() {
  const axiosInstance = useAxios();
  return new FilingEntityManagerControllerApi(null, basePath, axiosInstance)
}

export function useNarrativeBuilder() {
  const axiosInstance = useAxios();
  return new NarrativeBuilderControllerApi(null, basePath, axiosInstance)
}
