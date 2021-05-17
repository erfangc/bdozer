import {Item, KPI} from "../../client";

export interface KPIContext {
    kpis: KPI[]
    // Each item is an KPI
    items: Item[]
}
