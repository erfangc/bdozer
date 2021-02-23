/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface Address
 */
export interface Address {
    /**
     * 
     * @type {number}
     * @memberof Address
     */
    sheet?: number;
    /**
     * 
     * @type {number}
     * @memberof Address
     */
    row?: number;
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    column?: string;
}
/**
 * 
 * @export
 * @interface Cell
 */
export interface Cell {
    /**
     * 
     * @type {number}
     * @memberof Cell
     */
    period?: number;
    /**
     * 
     * @type {string}
     * @memberof Cell
     */
    name?: string;
    /**
     * 
     * @type {Item}
     * @memberof Cell
     */
    item?: Item;
    /**
     * 
     * @type {number}
     * @memberof Cell
     */
    value?: number;
    /**
     * 
     * @type {string}
     * @memberof Cell
     */
    formula?: string;
    /**
     * 
     * @type {Address}
     * @memberof Cell
     */
    address?: Address;
    /**
     * 
     * @type {Array<string>}
     * @memberof Cell
     */
    dependentCellNames?: Array<string>;
}
/**
 * 
 * @export
 * @interface FixedCost
 */
export interface FixedCost {
    /**
     * 
     * @type {number}
     * @memberof FixedCost
     */
    cost?: number;
}
/**
 * 
 * @export
 * @interface Item
 */
export interface Item {
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    description?: string;
    /**
     * 
     * @type {number}
     * @memberof Item
     */
    historicalValue?: number;
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    expression?: string;
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    segment?: string;
    /**
     * 
     * @type {string}
     * @memberof Item
     */
    type?: ItemTypeEnum;
    /**
     * 
     * @type {SubscriptionRevenue}
     * @memberof Item
     */
    subscriptionRevenue?: SubscriptionRevenue;
    /**
     * 
     * @type {PercentOfTotalAsset}
     * @memberof Item
     */
    percentOfTotalAsset?: PercentOfTotalAsset;
    /**
     * 
     * @type {PercentOfRevenue}
     * @memberof Item
     */
    percentOfRevenue?: PercentOfRevenue;
    /**
     * 
     * @type {FixedCost}
     * @memberof Item
     */
    fixedCost?: FixedCost;
}

/**
    * @export
    * @enum {string}
    */
export enum ItemTypeEnum {
    SubscriptionRevenue = 'SubscriptionRevenue',
    Custom = 'Custom',
    PercentOfRevenue = 'PercentOfRevenue',
    PercentOfTotalAsset = 'PercentOfTotalAsset',
    FixedCost = 'FixedCost'
}

/**
 * 
 * @export
 * @interface Model
 */
export interface Model {
    /**
     * 
     * @type {Array<Item>}
     * @memberof Model
     */
    incomeStatementItems?: Array<Item>;
    /**
     * 
     * @type {Array<Item>}
     * @memberof Model
     */
    balanceSheetItems?: Array<Item>;
    /**
     * 
     * @type {Array<Item>}
     * @memberof Model
     */
    otherItems?: Array<Item>;
    /**
     * 
     * @type {number}
     * @memberof Model
     */
    currentPrice?: number;
    /**
     * 
     * @type {number}
     * @memberof Model
     */
    beta?: number;
    /**
     * 
     * @type {number}
     * @memberof Model
     */
    sharesOutstanding?: number;
    /**
     * 
     * @type {number}
     * @memberof Model
     */
    dilutedSharesOutstanding?: number;
    /**
     * 
     * @type {number}
     * @memberof Model
     */
    corporateTaxRate?: number;
    /**
     * 
     * @type {number}
     * @memberof Model
     */
    costOfDebt?: number;
    /**
     * 
     * @type {number}
     * @memberof Model
     */
    riskFreeRate?: number;
    /**
     * 
     * @type {number}
     * @memberof Model
     */
    equityRiskPremium?: number;
    /**
     * 
     * @type {number}
     * @memberof Model
     */
    terminalFcfMultiple?: number;
    /**
     * 
     * @type {number}
     * @memberof Model
     */
    terminalFcfGrowthRate?: number;
    /**
     * 
     * @type {number}
     * @memberof Model
     */
    periods?: number;
}
/**
 * 
 * @export
 * @interface ModelEvaluationOutput
 */
export interface ModelEvaluationOutput {
    /**
     * 
     * @type {Array<Cell>}
     * @memberof ModelEvaluationOutput
     */
    cells?: Array<Cell>;
    /**
     * 
     * @type {number}
     * @memberof ModelEvaluationOutput
     */
    pvOfFcf?: number;
    /**
     * 
     * @type {number}
     * @memberof ModelEvaluationOutput
     */
    targetPriceUnderExitMultipleMethod?: number;
    /**
     * 
     * @type {number}
     * @memberof ModelEvaluationOutput
     */
    targetPriceUnderPerpetuityMethod?: number;
    /**
     * 
     * @type {number}
     * @memberof ModelEvaluationOutput
     */
    pvOfTerminalValueUnderPerpetuityMethod?: number;
    /**
     * 
     * @type {number}
     * @memberof ModelEvaluationOutput
     */
    pvOfTerminalValueUnderExitMultipleMethod?: number;
}
/**
 * 
 * @export
 * @interface PercentOfRevenue
 */
export interface PercentOfRevenue {
    /**
     * 
     * @type {number}
     * @memberof PercentOfRevenue
     */
    percentOfRevenue?: number;
}
/**
 * 
 * @export
 * @interface PercentOfTotalAsset
 */
export interface PercentOfTotalAsset {
    /**
     * 
     * @type {number}
     * @memberof PercentOfTotalAsset
     */
    percentOfTotalAsset?: number;
}
/**
 * 
 * @export
 * @interface SubscriptionRevenue
 */
export interface SubscriptionRevenue {
    /**
     * 
     * @type {number}
     * @memberof SubscriptionRevenue
     */
    totalSubscriptionAtTerminalYear?: number;
    /**
     * 
     * @type {number}
     * @memberof SubscriptionRevenue
     */
    initialSubscriptions?: number;
    /**
     * 
     * @type {number}
     * @memberof SubscriptionRevenue
     */
    averageRevenuePerSubscription?: number;
}

/**
 * ModelBuilderControllerApi - axios parameter creator
 * @export
 */
export const ModelBuilderControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createModel: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/createModel`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {Model} model 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        evaluateModel: async (model: Model, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'model' is not null or undefined
            assertParamExists('evaluateModel', 'model', model)
            const localVarPath = `/evaluateModel`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(model, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {Model} model 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        reformulateModel: async (model: Model, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'model' is not null or undefined
            assertParamExists('reformulateModel', 'model', model)
            const localVarPath = `/reformulateModel`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(model, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ModelBuilderControllerApi - functional programming interface
 * @export
 */
export const ModelBuilderControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ModelBuilderControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createModel(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Model>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createModel(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {Model} model 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async evaluateModel(model: Model, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ModelEvaluationOutput>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.evaluateModel(model, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {Model} model 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async reformulateModel(model: Model, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Model>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.reformulateModel(model, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ModelBuilderControllerApi - factory interface
 * @export
 */
export const ModelBuilderControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ModelBuilderControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createModel(options?: any): AxiosPromise<Model> {
            return localVarFp.createModel(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {Model} model 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        evaluateModel(model: Model, options?: any): AxiosPromise<ModelEvaluationOutput> {
            return localVarFp.evaluateModel(model, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {Model} model 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        reformulateModel(model: Model, options?: any): AxiosPromise<Model> {
            return localVarFp.reformulateModel(model, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ModelBuilderControllerApi - object-oriented interface
 * @export
 * @class ModelBuilderControllerApi
 * @extends {BaseAPI}
 */
export class ModelBuilderControllerApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ModelBuilderControllerApi
     */
    public createModel(options?: any) {
        return ModelBuilderControllerApiFp(this.configuration).createModel(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {Model} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ModelBuilderControllerApi
     */
    public evaluateModel(model: Model, options?: any) {
        return ModelBuilderControllerApiFp(this.configuration).evaluateModel(model, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {Model} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ModelBuilderControllerApi
     */
    public reformulateModel(model: Model, options?: any) {
        return ModelBuilderControllerApiFp(this.configuration).reformulateModel(model, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * ModelsControllerApi - axios parameter creator
 * @export
 */
export const ModelsControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        _default: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/models/default`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ModelsControllerApi - functional programming interface
 * @export
 */
export const ModelsControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ModelsControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async _default(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Model>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator._default(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ModelsControllerApi - factory interface
 * @export
 */
export const ModelsControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ModelsControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        _default(options?: any): AxiosPromise<Model> {
            return localVarFp._default(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ModelsControllerApi - object-oriented interface
 * @export
 * @class ModelsControllerApi
 * @extends {BaseAPI}
 */
export class ModelsControllerApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ModelsControllerApi
     */
    public _default(options?: any) {
        return ModelsControllerApiFp(this.configuration)._default(options).then((request) => request(this.axios, this.basePath));
    }
}


