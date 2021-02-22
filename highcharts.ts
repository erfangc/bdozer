import Highcharts from "highcharts";

const blueGray = "#F8FAFC";

Highcharts.theme = {
  colors: ["#2563EB", "#16A34A", "#FACC15", "#EF4444", "#4F46E5", "#06B6D4"],
  credits: {
    enabled: false,
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
