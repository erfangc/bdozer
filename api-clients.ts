import { ModelBuilderControllerApi, ModelsControllerApi } from "./client";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;
export const modelBuilderApi = new ModelBuilderControllerApi(null, basePath);
export const modelsApi = new ModelsControllerApi(null, basePath);
