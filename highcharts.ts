import Highcharts from "highcharts";

export const blueGray = "#F8FAFC";
export const blueGray600 = "#475569";
export const blueGray700 = "#334155";
export const blue = "#2563EB";

Highcharts.theme = {
  colors: ["#2563EB", "#16A34A", "#FACC15", "#EF4444", "#4F46E5", "#06B6D4"],
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
      color: blueGray,
    },
    backgroundColor: "transparent",
  },
  title: {
    align: "left",
    margin: 32,
    style: {
      color: blueGray,
    },
  },
  legend: {
    itemStyle: {
      color: blueGray,
    },
    align: "left",
  },
  xAxis: {
    labels: {
      style: {
        color: blueGray,
      },
    },
    title: {
      style: {
        color: blueGray,
      },
    },
  },
  yAxis: {
    gridLineWidth: 0,
    labels: {
      style: {
        color: blueGray,
      },
    },
  },
  plotOptions: {
    column: {
      borderWidth: 0,
    },
  },
};

if (Highcharts.setOptions) {
  Highcharts.setOptions(Highcharts.theme);
}

export const highcharts = Highcharts;
