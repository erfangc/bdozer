import Highcharts from "highcharts";
import HC_more from 'highcharts/highcharts-more';
import HighchartsSankey from 'highcharts/modules/sankey';

export const blueGray50 = "#F8FAFC"
export const blueGray100 = "#F1F5F9"
export const blueGray200 = "#E2E8F0"
export const blueGray300 = "#CBD5E1"
export const blueGray400 = "#94A3B8"
export const blueGray500 = "#64748B"
export const blueGray600 = "#475569"
export const blueGray700 = "#334155"
export const blueGray800 = "#1E293B"
export const blueGray900 = "#0F172A"

export const amber50 = "#FFFBEB"
export const amber100 = "#FEF3C7"
export const amber200 = "#FDE68A"
export const amber300 = "#FCD34D"
export const amber400 = "#FBBF24"
export const amber500 = "#F59E0B"
export const amber600 = "#D97706"
export const amber700 = "#B45309"
export const amber800 = "#92400E"
export const amber900 = "#78350F"

export const yellow50 = "#FEFCE8"
export const yellow100 = "#FEF9C3"
export const yellow200 = "#FEF08A"
export const yellow300 = "#FDE047"
export const yellow400 = "#FACC15"
export const yellow500 = "#EAB308"
export const yellow600 = "#CA8A04"
export const yellow700 = "#A16207"
export const yellow800 = "#854D0E"
export const yellow900 = "#713F12"


export const red50 = "#FEF2F2"
export const red100 = "#FEE2E2"
export const red200 = "#FECACA"
export const red300 = "#FCA5A5"
export const red400 = "#F87171"
export const red500 = "#EF4444"
export const red600 = "#DC2626"
export const red700 = "#B91C1C"
export const red800 = "#991B1B"
export const red900 = "#7F1D1D"

export const blue50 = "#EFF6FF"
export const blue100 = "#DBEAFE"
export const blue200 = "#BFDBFE"
export const blue300 = "#93C5FD"
export const blue400 = "#60A5FA"
export const blue500 = "#3B82F6"
export const blue600 = "#2563EB"
export const blue700 = "#1D4ED8"
export const blue800 = "#1E40AF"
export const blue900 = "#1E3A8A"

export const green50 = "#F0FDF4"
export const green100 = "#DCFCE7"
export const green200 = "#BBF7D0"
export const green300 = "#86EFAC"
export const green400 = "#4ADE80"
export const green500 = "#22C55E"
export const green600 = "#16A34A"
export const green700 = "#15803D"
export const green800 = "#166534"
export const green900 = "#14532D"

export const lime50 = "#F7FEE7"
export const lime100 = "#ECFCCB"
export const lime200 = "#D9F99D"
export const lime300 = "#BEF264"
export const lime400 = "#A3E635"
export const lime500 = "#84CC16"
export const lime600 = "#65A30D"
export const lime700 = "#4D7C0F"
export const lime800 = "#3F6212"
export const lime900 = "#365314"

export const indigo50 = "#EEF2FF"
export const indigo100 = "#E0E7FF"
export const indigo200 = "#C7D2FE"
export const indigo300 = "#A5B4FC"
export const indigo400 = "#818CF8"
export const indigo500 = "#6366F1"
export const indigo600 = "#4F46E5"
export const indigo700 = "#4338CA"
export const indigo800 = "#3730A3"
export const indigo900 = "#312E81"


export const orange50 = "#FFF7ED"
export const orange100 = "#FFEDD5"
export const orange200 = "#FED7AA"
export const orange300 = "#FDBA74"
export const orange400 = "#FB923C"
export const orange500 = "#F97316"
export const orange600 = "#EA580C"
export const orange700 = "#C2410C"
export const orange800 = "#9A3412"
export const orange900 = "#7C2D12"

export const rose50 = "#FFF1F2"
export const rose100 = "#FFE4E6"
export const rose200 = "#FECDD3"
export const rose300 = "#FDA4AF"
export const rose400 = "#FB7185"
export const rose500 = "#F43F5E"
export const rose600 = "#E11D48"
export const rose700 = "#BE123C"
export const rose800 = "#9F1239"
export const rose900 = "#881337"

export const cyan50 = "#ECFEFF"
export const cyan100 = "#CFFAFE"
export const cyan200 = "#A5F3FC"
export const cyan300 = "#67E8F9"
export const cyan400 = "#22D3EE"
export const cyan500 = "#06B6D4"
export const cyan600 = "#0891B2"
export const cyan700 = "#0E7490"
export const cyan800 = "#155E75"
export const cyan900 = "#164E63"


Highcharts.theme = {
  colors: [blue600, green600, yellow400, cyan500, indigo600, indigo900],
  credits: {
    enabled: false,
  },
  tooltip: {
    useHTML: true,
    formatter: function () {
      return `
      <div class="p-1 flex space-x-2 text-blueGray-50">
        <b class="font-semibold">${this.series.name}:</b>
        <span>${this.y.toLocaleString()}</span>
      </div>`;
    },
    borderWidth: 0,
    backgroundColor: blueGray700,
    borderRadius: 8,
  },
  chart: {
    style: {
      fontFamily: "Roboto, sans-serif",
      color: blueGray200,
    },
    backgroundColor: "transparent",
  },
  title: {
    align: "left",
    margin: 32,
    style: {
      color: blueGray200,
    },
  },
  legend: {
    itemStyle: {
      color: blueGray200,
    },
    align: "left",
  },
  xAxis: {
    labels: {
      style: {
        color: blueGray200,
      },
    },
    title: {
      style: {
        color: blueGray200,
      },
    },
  },
  yAxis: {
    gridLineWidth: 0,
    labels: {
      style: {
        color: blueGray200,
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
  },
};

if (typeof Highcharts === 'object') {
  Highcharts.setOptions(Highcharts.theme);
  HC_more(Highcharts);
  HighchartsSankey(Highcharts)
}

export const highcharts = Highcharts;
