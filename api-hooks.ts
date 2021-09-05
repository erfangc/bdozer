import {
    PublishedStockAnalysisControllerApi,
    StockAnalysisRequestControllerApi,
    WatchListsControllerApi,
} from "./client";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {useEffect} from "react";
import {serverErrorStore} from "./components/ServerErrors/ServerErrorStore";
import {v4 as uuid} from 'uuid'

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
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

    const {getAccessTokenSilently} = useAuth0();

    useEffect(() => {

        axiosInstance
            .interceptors
            .request
            .use(async (cfg) => {
                let accessToken = null;
                try {
                    accessToken = await getAccessTokenSilently();
                } catch (e) {
                    // failed to get access token
                }
                return {
                    ...cfg,
                    headers: {
                        ...cfg.headers,
                        Authorization: `Bearer ${accessToken ?? "-"}`,
                    },
                };
            });

    }, []);

    return axiosInstance;
}

export function useWatchLists() {
    const axiosInstance = useAxios();
    return new WatchListsControllerApi(null, basePath, axiosInstance);
}

export function useStockAnalysisRequest() {
    return new StockAnalysisRequestControllerApi(null, basePath);
}

export function usePublishedStockAnalysis() {
    return new PublishedStockAnalysisControllerApi(null, basePath);
}
