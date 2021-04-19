import {Item, Waterfall} from "../../../client";
import {blueGray900, lime700, rose500} from "../../../highcharts";
import {simpleNumber} from "../../../simple-number";

export const baseOptions: Highcharts.Options = {
    chart: { type: 'waterfall', },
    tooltip: {
        enabled: true,
        useHTML: true,
        formatter: function () {
            const item = (this.point.options as any).item as Item
            const commentary = item?.commentaries?.commentary
            return commentary
                ?
                `
                <div class="px-2 text-blueGray-50 z-10">
                    <span>${commentary}</span>
                </div>
                `
                :
                `<div class="px-2  text-blueGray-50 z-10">No commentary</div>`;
        },
    },
    xAxis: { type: 'category', lineWidth: 0, },
    title: { text: null },
    yAxis: {
        title: { text: null },
        labels: { enabled: false }
    },
    legend: { enabled: false },

}

export function waterfallSeries(waterfall: Waterfall) {
    const revenue = {
        name: waterfall.revenue.item?.description ?? waterfall.revenue.item?.name,
        y: waterfall.revenue.value,
        color: lime700,
        item: waterfall.revenue.item,
    };
    const topExpenses = waterfall.expenses.map(({ item, value }) => {
        return {
            name: item.description ?? item.name,
            y: value,
            color: value > 0 ? lime700 : rose500,
            item: item,
        };
    });
    const profit = {
        name: waterfall.profit.item?.description ?? waterfall.profit.item?.name,
        y: waterfall.profit.value,
        color: blueGray900,
        borderColor: waterfall.profit.value > 0 ? lime700 : rose500,
        borderWidth: 1,
        isSum: true,
    };
    return [{
        data: [revenue, ...topExpenses, profit,],
        pointPadding: 0,
        dataLabels: {
            enabled: true,
            useHTML: false,
            formatter: function () {
                return `<div class="z-0">${simpleNumber(this.y.toFixed(0), true)}</div>`;
            },
        },
    }];
}
