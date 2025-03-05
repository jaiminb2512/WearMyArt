import React, { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ToastNotification from "./Components/ToastNotification.jsx";
import Register from "./Pages/Register.jsx";
import Home from "./Pages/Home.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar.jsx";
import Products from "./Pages/Products.jsx";
import OrderForm from "./Pages/OrderForm.jsx";
import Product from "./Pages/Product.jsx";
import Errorpage from "./Pages/Errorpage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  const mode = useSelector((state) => state.theme.mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <div className="mt-25">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/orderform" element={<OrderForm />} />
              <Route path="*" element={<Errorpage />} />
            </Routes>
          </div>
          <ToastNotification />
          <ReactQueryDevtools />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
