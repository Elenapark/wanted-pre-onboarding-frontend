import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Reset } from "styled-reset";
import App from "./App";

const theme = createTheme({
  palette: {
    primary: {
      main: "#387ed9",
    },
    background: {
      default: "#f4f4f4",
    },
  },
  typography: {
    fontFamily: ['"Lato"', "sans-serif"].join(","),
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Reset />
    <App />
  </ThemeProvider>
);
