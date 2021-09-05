import {Model} from "./client";

export function year(model: Model, period: number | string) {
    let date: Date
    if (model.mostRecentReportDate) {
        date = new Date(model.mostRecentReportDate);
    } else {
        date = new Date();
    }
    const now = date.getFullYear();
    if (typeof period === 'string') {
        return now + parseInt(period)
    } else {
        return now + period
    }
}