import { Box } from "@mui/material";
import Register from "./Register.js";

function App() {
  return (
    <Box sx={ContainerSxProps}>
      <Register />
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
