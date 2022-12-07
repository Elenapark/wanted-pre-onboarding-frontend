import { Box } from "@mui/material";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import TodoList from "../pages/TodoList";

const errorSxProps = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
};

const routes = [
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
      {
        path: "/todo",
        element: <TodoList />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: "/wanted-pre-onboarding-frontend",
});

export default router;
