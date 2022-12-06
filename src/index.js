import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Reset } from "styled-reset";
import App from "./App";
import { theme } from "./styles/MUITheme";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Register from "./Register.js";
import SignIn from "./SignIn.js";
import { Box } from "@mui/material";

const errorSxProps = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Box sx={errorSxProps}>Sorry, An Error Has Occurred.😅</Box>,
    children: [
      {
        path: "/",
        element: <Register />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Reset />
    <RouterProvider router={router} />
  </ThemeProvider>
);
