import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const MonthlySalesAreaChart = ({ monthlyData }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return "₹" + (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return "₹" + (num / 1000).toFixed(1) + "K";
    }
    return "₹" + num.toLocaleString("en-IN");
  };

  const formatOrderCount = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };

  const chartOptions = {
    chart: {
      type: "area",
      height: 450,
      toolbar: {
        show: false,
      },
      background: "#fff",
      fontFamily: "inherit",
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#1B3D1F", "#66BB6A"],
    title: {
      text: "Monthly Sales Overview",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    grid: {
      borderColor: "#e7e7e7",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: 4,
      colors: undefined,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      categories: monthlyData.map((item) => item.monthYear),
      labels: {
        style: {
          fontSize: "12px",
        },
        hideOverlappingLabels: true,
        rotate: windowWidth < 768 ? -45 : 0,
      },
    },
    yaxis: [
      {
        title: {
          text: "Revenue",
        },
        show: windowWidth >= 768,
        labels: {
          show: windowWidth >= 425,
          style: { fontSize: windowWidth < 768 ? "0px" : "12px" },
          formatter: (value) => formatNumber(value),
        },
      },
      {
        opposite: true,
        title: {
          text: "Orders",
        },
        show: windowWidth >= 768,
        labels: {
          style: {
            fontSize: windowWidth < 768 ? "10px" : "12px",
          },
          formatter: (value) => formatOrderCount(value),
        },
      },
    ],
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value, { seriesIndex }) => {
          if (seriesIndex === 0) {
            return `₹${value.toLocaleString("en-IN")}`;
          }
          return `${value.toLocaleString("en-IN")} orders`;
        },
      },
    },
  };

  const chartSeries = [
    {
      name: "Revenue",
      type: "area",
      data: monthlyData.map((item) => item.revenue),
    },
    {
      name: "Orders",
      type: "area",
      data: monthlyData.map((item) => item.orderCount),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={450}
      />
    </div>
  );
};

export default MonthlySalesAreaChart;
