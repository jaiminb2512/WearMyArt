import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1f2937",
    },
    secondary: {
      main: "#f97316",
    },
    background: {
      default: "#84cc16",
      paper: "#0f172a",
    },
    text: {
      primary: "#1f2937",
      secondary: "#4b5563",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",
    },
    secondary: {
      main: "#ec4899",
    },
    background: {
      default: "#1e293b",
      paper: "#111827",
    },
    text: {
      primary: "#ffffff",
      secondary: "#d1d5db",
    },
  },
});

// themes: [
//       {
//         Night: {
//           primary: "#1f2937",
//           secondary: "#f97316",
//           accent: "#84cc16",
//           neutral: "#0f172a",
//           "base-100": "#1e3a8a",
//           "glow": "#3b82f6",
//         },
//         BlackHole: {
//           primary: "#2d2d2d",
//           secondary: "#ff5722",
//           accent: "#4caf50",
//           neutral: "#ff4081",
//           "base-100": "#121212",
//           "glow": "#ff4081",
//         },
//         Sunset: {
//           primary: "#c62828",
//           secondary: "#ff7043",
//           accent: "#ffb300",
//           neutral: "#424242",
//           "base-100": "#210002",
//           "glow": "#fbc02d",
//         },
//         Sunshine: {
//           primary: "#00BCD4",
//           secondary: "#FFC107",
//           accent: "#FF5722",
//           neutral: "#424242",
//           "base-100": "#173F5F",
//           "glow": "#fdd835",
//         },
//         Jungle: {
//           primary: "#2E8B57",
//           secondary: "#003b00",
//           accent: "#6B8E23",
//           neutral: "#A9A9A9",
//           "base-100": "#07382f",
//           "glow": "#4caf50",
//         },
//       },
//     ],
