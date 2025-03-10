import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1f2937", // Gray 800
      light: "#374151", // Gray 700
      dark: "#111827", // Gray 900
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f97316", // Orange 500
      light: "#fb923c", // Orange 400
      dark: "#ea580c", // Orange 600
      contrastText: "#ffffff",
    },
    error: {
      main: "#dc2626", // Red 600
      light: "#ef4444", // Red 500
      dark: "#b91c1c", // Red 700
    },
    warning: {
      main: "#d97706", // Amber 600
      light: "#f59e0b", // Amber 500
      dark: "#b45309", // Amber 700
    },
    info: {
      main: "#0284c7", // Sky 600
      light: "#0ea5e9", // Sky 500
      dark: "#0369a1", // Sky 700
    },
    success: {
      main: "#16a34a", // Green 600
      light: "#22c55e", // Green 500
      dark: "#15803d", // Green 700
    },
    background: {
      default: "#f9fafb", // Changed from lime green to Gray 50
      paper: "#ffffff", // Changed from dark slate to white
      subtle: "#f3f4f6", // Gray 100 for subtle contrasts
    },
    text: {
      primary: "#1f2937", // Gray 800
      secondary: "#4b5563", // Gray 600
      disabled: "#9ca3af", // Gray 400
    },
    divider: "#e5e7eb", // Gray 200
    action: {
      active: "#6b7280", // Gray 500
      hover: "rgba(0, 0, 0, 0.04)",
      selected: "rgba(0, 0, 0, 0.08)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6", // Bright blue
      light: "#60a5fa", // Lighter blue
      dark: "#2563eb", // Darker blue
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ec4899", // Pink
      light: "#f472b6", // Lighter pink
      dark: "#db2777", // Darker pink
      contrastText: "#ffffff",
    },
    error: {
      main: "#ef4444", // Red
      light: "#f87171", // Lighter red
      dark: "#dc2626", // Darker red
    },
    warning: {
      main: "#f59e0b", // Amber
      light: "#fbbf24", // Lighter amber
      dark: "#d97706", // Darker amber
    },
    info: {
      main: "#06b6d4", // Cyan
      light: "#22d3ee", // Lighter cyan
      dark: "#0891b2", // Darker cyan
    },
    success: {
      main: "#10b981", // Emerald
      light: "#34d399", // Lighter emerald
      dark: "#059669", // Darker emerald
    },
    background: {
      default: "#1e293b", // Slate 800
      paper: "#111827", // Gray 900
      darker: "#0f172a", // Slate 900 for nested elements
    },
    text: {
      primary: "#ffffff", // White
      secondary: "#d1d5db", // Gray 300
      disabled: "#6b7280", // Gray 500
    },
    divider: "#374151", // Gray 700
    action: {
      active: "#d1d5db", // Gray 300
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.16)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
    },
  },
});
