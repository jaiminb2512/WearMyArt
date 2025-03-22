import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./Theme/theme";
import { CssBaseline, Box } from "@mui/material";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
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
import Orders from "./Pages/Orders";
import Cart from "./Pages/Cart";
import { toggleSmScreen } from "./Redux/OpenCloseSlice";
import OrderDetails from "./Pages/OrderDetails";
import ApiURLS from "./Data/ApiURLS";
import { useApiMutation } from "./utils/apiRequest";
import { login } from "./Redux/UserSlice";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const autoLoginMutation = useApiMutation(
    ApiURLS.AutoLogin.url,
    ApiURLS.AutoLogin.method
  );

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const autoLogin = async () => {
      const userData = await autoLoginMutation.mutateAsync({});

      dispatch(login(userData.user));
    };

    if (!user) {
      autoLogin();
    }
  }, []);

  const showSidebar = location.pathname.includes("/dashboard");

  const [hideText, setHideText] = useState(false);
  let sidebarWidth = showSidebar ? (hideText ? 60 : 240) : 0;

  const { SmScreen } = useSelector((state) => state.OpenClose);

  const ScreenWidth = window.screen.width;

  useEffect(() => {
    if (user?.isAdmin) {
      dispatch(toggleSmScreen(true));
    } else {
      dispatch(toggleSmScreen(false));
    }
  }, []);

  useEffect(() => {
    if (ScreenWidth < 635) {
      dispatch(toggleSmScreen(true));
    } else {
      dispatch(toggleSmScreen(false));
    }
  }, [ScreenWidth]);

  console.log(SmScreen);

  sidebarWidth = SmScreen ? 0 : sidebarWidth;

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
          }}
          className={`mt-15 ${
            sidebarWidth === 60
              ? "ml-[60px]"
              : sidebarWidth === 240
              ? "ml-[240px]"
              : "ml-0"
          }`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/forgot-password" element={<Auth />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/dashboard/order-details" element={<OrderDetails />} />
            <Route path="/customize-product" element={<CustomizeProduct />} />
            <Route path="/dashboard/Profile" element={<Profile />} />
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route path="/dashboard/cart" element={<Cart />} />
            <Route path="/dashboard/all-products" element={<AllProducts />} />
            <Route path="/dashboard/all-orders" element={<AllOrders />} />
            <Route path="/dashboard/all-users" element={<AllUsers />} />
            <Route path="*" element={<Errorpage />} />
          </Routes>
          {/* <Footer /> */}
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
