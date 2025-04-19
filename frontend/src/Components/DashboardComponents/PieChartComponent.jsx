import React from "react";
import Chart from "react-apexcharts";

const PieChartComponent = ({ data, labels, title, height = 300 }) => {
  const greenColors = [
    "#1B3D1F",
    "#1E4620",
    "#245829",
    "#2D6A33",
    "#38803D",
    "#439448",
    "#4FA953",
    "#5DBD61",
    "#6ECE70",
    "#8CDE8F",
  ];

  const options = {
    chart: {
      type: "pie",
      height: height,
    },
    labels: labels,
    colors: greenColors.slice(
      0,
      labels.length > greenColors.length ? greenColors.length : labels.length
    ),
    legend: {
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col justify-center items-center">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <Chart options={options} series={data} type="pie" height={height} />
    </div>
  );
};

export default PieChartComponent;
