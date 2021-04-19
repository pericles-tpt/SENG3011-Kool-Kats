import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

function PieChart({ data, graphTitle }) {
  console.log(data);
  const chartOptions = {
    chart: {
      type: "pie",
      options3d: {
        enabled: false,
        alpha: 45,
        beta: 0,
      },
    },
    title: {
      text: graphTitle,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        cursor: "pointer",
        depth: 20,
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    },
    colors: [
      "#996600",
      "#FFCC33",
      "#FFFFCC",
      "#009966",
      "#99CC33",
      "#FF6600",
      "#99CCFF",
      "#3366CC",
    ],
    credits: {
      enabled: false,
    },
    series: [
      {
        type: "pie",
        name: "percentage",
        data: data,
      },
    ],
  };
  return data.length > 0 ? (
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  ) : (
    <p>No graph availabile. Please change input filters.</p>
  );
}

export default PieChart;
