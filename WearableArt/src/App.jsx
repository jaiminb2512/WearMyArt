import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import YourComponent from "./Components/YourComponent";
import ToastNotification from "./Components/ToastNotification.jsx";
import Register from "./Pages/Register.jsx";
import Home from "./Pages/Home.jsx";
import Navbar from "./Components/Navbar.jsx";
import DashboardLayoutBranding from "./Components/DashboardLayoutBranding.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<DashboardLayoutBranding />} />
      </Routes>
      <ToastNotification />
    </BrowserRouter>
  );
}

export default App;
