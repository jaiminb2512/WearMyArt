import React, { useEffect, useState } from "react";
import { useApiMutation } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import PieChartComponent from "../Components/DashboardComponents/PieChartComponent";
import DataTable from "../Components/DashboardComponents/DataTable";
import dayjs from "dayjs";
import MTooltipButton from "../Components/MTooltipButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MonthlySalesAreaChart from "../Components/DashboardComponents/MonthlySalesAreaChart";

export const DataBox = ({ title, value }) => {
  return (
    <div className="bg-gradient-to-l from-[#C5F1E1] to-white p-4 rounded-lg shadow">
      <h2 className="text-gray-500 font-medium mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  const [startDate, setStartDate] = useState(dayjs(`${currentYear}-01-01`));
  const [endDate, setEndDate] = useState(dayjs(`${currentYear}-12-31`));

  const formatApiDate = (date) => date.format("YYYY-MM-DD");

  const getApiUrl = () => {
    if (!startDate || !endDate) return ApiURLS.orderData.url;
    const start = formatApiDate(startDate);
    const end = formatApiDate(endDate);
    return `${ApiURLS.orderData.url}?startDate=${start}&endDate=${end}`;
  };

  const { mutateAsync } = useApiMutation(getApiUrl(), ApiURLS.orderData.method);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await mutateAsync();
      setDashboardData(response);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleApplyFilter = (e) => {
    e.preventDefault();
    fetchDashboardData();
  };

  const formatNumber = (num) => num.toLocaleString("en-US");

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>No dashboard data available.</p>
      </div>
    );
  }

  const productColumns = [
    { header: "Image", key: "productImgURL" },
    { header: "Revenue", key: "totalRevenue" },
    { header: "Quantity Sold", key: "totalQuantity" },
    { header: "Stock", key: "productStock", detailBtn: "425px" },
    { header: "Orders", key: "orderCount", detailBtn: "472px" },
  ];

  const customerColumns = [
    { header: "Customer", key: "customerName" },
    { header: "Total Spent", key: "totalSpent" },
    { header: "Orders", key: "orderCount", detailBtn: "425px" },
    { header: "Email", key: "customerEmail", detailBtn: "658px" },
  ];

  return (
    <div className="w-full max-w-full py-6 px-4 md:px-6 xl:px-8 overflow-x-hidden">
      <div className="flex flex-col md:flex-row justify-start md:justify-between md:items-center mb-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex flex-col md:flex-row gap-3 mt-3 md:mt-0">
            <div className="flex gap-3 flex-wrap">
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: { size: "small" },
                }}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{
                  textField: { size: "small" },
                }}
              />
              <MTooltipButton
                title="Apply Filter"
                color="success"
                className="px-4 py-2"
                onClick={handleApplyFilter}
              >
                Apply
              </MTooltipButton>
            </div>
          </div>
        </LocalizationProvider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DataBox
          title={"Total Revenue"}
          value={`₹ ${formatNumber(dashboardData.revenue)}`}
        />
        <DataBox
          title={"Average Order Value"}
          value={`₹ ${formatNumber(dashboardData.averageOrderValue)}`}
        />
        <DataBox
          title={"Total Orders"}
          value={formatNumber(dashboardData.totalOrders)}
        />
        <DataBox title={"Active Users"} value={dashboardData.activeUsers} />
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <MonthlySalesAreaChart monthlyData={dashboardData.monthWiseSales} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <PieChartComponent
          data={dashboardData.statusDistribution.map((item) => item.count)}
          labels={dashboardData.statusDistribution.map((item) => item._id)}
          title="Order Status Distribution"
        />
        <PieChartComponent
          data={dashboardData.customizationDistribution.map(
            (item) => item.count
          )}
          labels={dashboardData.customizationDistribution.map(
            (item) => item._id
          )}
          title="Customization Type Distribution"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <DataTable
          data={dashboardData.topProducts}
          columns={productColumns}
          title="Top Products"
          type="product"
        />
        <DataTable
          data={dashboardData.topCustomers}
          columns={customerColumns}
          title="Top Customers"
          type="customer"
        />
      </div>
    </div>
  );
};

export default Dashboard;
