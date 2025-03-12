import React, { useState, useMemo } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./Theme/theme";
import { CssBaseline, Box } from "@mui/material";

import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import UserAvatar from "./Components/UserAvtar";
import ToastNotification from "./Components/ToastNotification";

import Home from "./Pages/Home";
import Products from "./Pages/Products";
import CustomizeProduct from "./Pages/CustomizeProduct";
import Product from "./Pages/Product";
import Profile from "./Pages/Profile";
import AllProducts from "./Pages/AllProducts";
import Errorpage from "./Pages/Errorpage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AllOrders from "./Pages/AllOrders";
import AllUsers from "./Pages/AllUsers";
import Auth from "./Pages/Auth";
import ProductForm from "./Components/Product/ProductForm";
import Orders from "./Pages/Orders";
import Cart from "./Pages/Cart";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const showSidebar = location.pathname.includes("/dashboard");

  const [hideText, setHideText] = useState(false);
  const sidebarWidth = showSidebar ? (hideText ? 60 : 240) : 0;

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        {showSidebar && (
          <Sidebar hideText={hideText} setHideText={setHideText} />
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            transition: "margin 0.3s ease",
            marginLeft: `${sidebarWidth}px`,
          }}
          className="mt-15"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/customize-product" element={<CustomizeProduct />} />
            <Route path="/dashboard/Profile" element={<Profile />} />
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route path="/dashboard/cart" element={<Cart />} />
            <Route path="/dashboard/all-products" element={<AllProducts />} />
            <Route path="/dashboard/all-orders" element={<AllOrders />} />
            <Route path="/dashboard/all-users" element={<AllUsers />} />
            <Route path="*" element={<Errorpage />} />
          </Routes>
        </Box>
      </Box>
      <ToastNotification />
      <UserAvatar />
    </>
  );
};

function App() {
  const mode = useSelector((state) => state.theme.mode);

  // Use predefined themes from Theme/theme.js
  const theme = useMemo(
    () => (mode === "dark" ? darkTheme : lightTheme),
    [mode]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppLayout />
          <ReactQueryDevtools />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
