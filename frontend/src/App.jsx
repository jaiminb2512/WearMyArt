import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ToastNotification from "./Components/ToastNotification.jsx";
import Register from "./Pages/Register.jsx";
import Home from "./Pages/Home.jsx";
import AddProductForm from "./Components/AddProductForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<AddProductForm />} />
      </Routes>
      <ToastNotification />
    </BrowserRouter>
  );
}

export default App;
