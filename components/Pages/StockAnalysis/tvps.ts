import {StockAnalysis2} from "../../../client";

/**
 * Utility function to find the share price at the final year given a StockAnalysis
 */
export function tvps({model: {periods}, cells}: StockAnalysis2): number {
    return cells
        .find(cell => cell.item?.name === "TerminalValuePerShare" && cell.period == periods)
        ?.value
}

/**
 * Utility function to find the share price at the final year given a StockAnalysis
 */
export function estimatedPrice(stockAnalysis: StockAnalysis2): number {
    return tvps(stockAnalysis);
}