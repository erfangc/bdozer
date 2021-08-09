import {StockAnalysis2, StockAnalysisProjection} from "../../../client";
import {tvps} from "./tvps";

/**
 * Utility function to find the share price at the final year given a StockAnalysis
 */
export function upside(stockAnalysis: StockAnalysis2): number {
    const {
        derivedStockAnalytics: {currentPrice},
    } = stockAnalysis;
    const finalPrice = tvps(stockAnalysis);
    return finalPrice / currentPrice - 1;
}


export function upsideP(stockAnalysis: StockAnalysisProjection): number {
    const {
        currentPrice,
        finalPrice,
    } = stockAnalysis;
    return finalPrice / currentPrice - 1;
}

