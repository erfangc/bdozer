import {
    CommentsControllerApi,
    EdgarExplorerControllerApi,
    FactAutoFillerControllerApi,
    FactBaseUnsecuredControllerApi,
    FilingEntityManagerControllerApi,
    FilingEntityManagerUnsecuredControllerApi, IssuesControllerApi,
    MarketingControllerApi, ModelBuilderFactoryControllerApi,
    MxParserControllerApi, OrphanedItemsFinderControllerApi,
    PublishedStockAnalysisControllerApi, RevenueModelerControllerApi,
    StockAnalysisControllerApi,
    TagControllerApi, ZacksEstimatesControllerApi,
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
    const {getIdTokenClaims} = useAuth0();

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

export function useMarketing() {
    const axiosInstance = useAxios();
    return new MarketingControllerApi(null, basePath, axiosInstance);
}

export function useFactAutoFiller() {
    const axiosInstance = useAxios();
    return new FactAutoFillerControllerApi(null, basePath, axiosInstance)
}

export function useFactBaseUnsecured() {
    const axiosInstance = useAxios();
    return new FactBaseUnsecuredControllerApi(null, basePath, axiosInstance);
}

export function useMxParser() {
    const axiosInstance = useAxios();
    return new MxParserControllerApi(null, basePath, axiosInstance);
}

export function useRevenueModeler() {
    const axiosInstance = useAxios()
    return new RevenueModelerControllerApi(null, basePath, axiosInstance)
}

export function usePublishedStockAnalysis() {
    const axiosInstance = useAxios();
    return new PublishedStockAnalysisControllerApi(null, basePath, axiosInstance);
}

export function useIssues() {
    const axiosInstance = useAxios();
    return new IssuesControllerApi(null, basePath, axiosInstance);
}

export function useModelBuilderFactory() {
    const axiosInstance = useAxios();
    return new ModelBuilderFactoryControllerApi(null, basePath, axiosInstance)
}

export function useStockAnalysis() {
    const axiosInstance = useAxios();
    return new StockAnalysisControllerApi(null, basePath, axiosInstance);
}

export function useOrphanedItemsFinder() {
    const axiosInstance = useAxios();
    return new OrphanedItemsFinderControllerApi(null, basePath, axiosInstance);
}

export function useEdgarExplorer() {
    const axiosInstance = useAxios();
    return new EdgarExplorerControllerApi(null, basePath, axiosInstance)
}

export function useFilingEntityManager() {
    const axiosInstance = useAxios();
    return new FilingEntityManagerControllerApi(null, basePath, axiosInstance)
}

export function useFilingEntityManagerUnsecured() {
    const axiosInstance = useAxios();
    return new FilingEntityManagerUnsecuredControllerApi(null, basePath, axiosInstance)
}

export function useComments() {
    const axiosInstance = useAxios();
    return new CommentsControllerApi(null, basePath, axiosInstance)
}

export function useTags() {
    const axiosInstance = useAxios()
    return new TagControllerApi(null, basePath, axiosInstance)
}

export function useZacksEstimates() {
    const axiosInstance = useAxios()
    return new ZacksEstimatesControllerApi(null, basePath, axiosInstance)
}