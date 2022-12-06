import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Reset } from "styled-reset";
import { theme } from "./styles/MUITheme";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Reset />
    <RouterProvider router={router} />
  </ThemeProvider>
);
