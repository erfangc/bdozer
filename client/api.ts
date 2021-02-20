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
     * @type {Driver}
     * @memberof Cell
     */
    driver?: Driver;
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
    expression?: string;
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
 * @interface CustomDriver
 */
export interface CustomDriver {
    /**
     * 
     * @type {string}
     * @memberof CustomDriver
     */
    formula?: string;
}
/**
 * 
 * @export
 * @interface Driver
 */
export interface Driver {
    /**
     * 
     * @type {string}
     * @memberof Driver
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof Driver
     */
    type?: DriverTypeEnum;
    /**
     * 
     * @type {SaaSRevenue}
     * @memberof Driver
     */
    saaSRevenue?: SaaSRevenue;
    /**
     * 
     * @type {VariableCost}
     * @memberof Driver
     */
    variableCost?: VariableCost;
    /**
     * 
     * @type {FixedCost}
     * @memberof Driver
     */
    fixedCost?: FixedCost;
    /**
     * 
     * @type {CustomDriver}
     * @memberof Driver
     */
    customDriver?: CustomDriver;
}

/**
    * @export
    * @enum {string}
    */
export enum DriverTypeEnum {
    SaaSRevenue = 'SaaSRevenue',
    Custom = 'Custom',
    VariableCost = 'VariableCost',
    FixedCost = 'FixedCost'
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
     * @type {Array<Driver>}
     * @memberof Item
     */
    drivers?: Array<Driver>;
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
    items?: Array<Item>;
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
 * @interface SaaSRevenue
 */
export interface SaaSRevenue {
    /**
     * 
     * @type {number}
     * @memberof SaaSRevenue
     */
    totalSubscriptionAtTerminalYear?: number;
    /**
     * 
     * @type {number}
     * @memberof SaaSRevenue
     */
    initialSubscriptions?: number;
    /**
     * 
     * @type {number}
     * @memberof SaaSRevenue
     */
    averageRevenuePerSubscription?: number;
}
/**
 * 
 * @export
 * @interface VariableCost
 */
export interface VariableCost {
    /**
     * 
     * @type {number}
     * @memberof VariableCost
     */
    percentOfRevenue?: number;
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
        async evaluateModel(model: Model, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Cell>>> {
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
        evaluateModel(model: Model, options?: any): AxiosPromise<Array<Cell>> {
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


