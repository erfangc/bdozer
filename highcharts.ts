import Highcharts from "highcharts";
import HC_more from 'highcharts/highcharts-more';
import HighchartsSankey from 'highcharts/modules/sankey';
import {readableNumber} from "./number-formatters";

export const theme = require('./tailwind.config').theme;
const {colors, fontFamily} = theme;

export const numericTooltip: Highcharts.TooltipOptions = {
    useHTML: true,
    formatter: function () {
        const y = this.y;
        return `
      <div class="p-1 flex space-x-2 text-blueGray-50">
        <b class="font-semibold">${this.series.name}:</b>
        <span>${isNaN(y) ? y.toLocaleString() : readableNumber(y)}</span>
      </div>`;
    },
    borderWidth: 0,
    backgroundColor: colors.gray["2"],
    borderRadius: 8,
}
// @ts-ignore
Highcharts.theme = {
    colors: [colors.gray["2"]],
    credits: {
        enabled: false,
    },
    tooltip: numericTooltip,
    chart: {
        style: {
            fontFamily: fontFamily.mono.join(', '),
            color: colors.gray["2"],
        },
        backgroundColor: colors.deepNavy["100"],
    },
    title: {
        align: "left",
        margin: 32,
        style: {
            color: colors.gray["2"],
        },
        text: null,
    },
    legend: {
        itemStyle: {
            color: colors.gray["2"],
        },
        align: "left",
    },
    xAxis: {
        labels: {
            style: {
                color: colors.gray["2"],
            },
        },
        title: {
            style: {
                color: colors.gray["2"],
            },
        },
    },
    yAxis: {
        gridLineWidth: 0,
        labels: {
            style: {
                color: colors.gray["2"],
            },
        },
    },
    plotOptions: {
        column: {
            borderWidth: 0,
            dataLabels: {
                useHTML: true,
            },
        },
        bar: {
            borderWidth: 0,
            dataLabels: {
                useHTML: true,
            },
        },
    },
};

if (typeof Highcharts === 'object') {
    // @ts-ignore
    Highcharts.setOptions(Highcharts.theme);
    HC_more(Highcharts);
    HighchartsSankey(Highcharts)
}

export const highcharts = Highcharts;