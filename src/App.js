import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Box sx={ContainerSxProps}>
      <Outlet />
    </Box>
  );
}

export default App;

const ContainerSxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  height: "100vh",
  backgroundColor: "background.default",
};
