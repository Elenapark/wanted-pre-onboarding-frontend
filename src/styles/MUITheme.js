import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#387ed9",
    },
    secondary: {
      main: orange[500],
    },
    background: {
      default: "#f4f4f4",
    },
  },
  typography: {
    fontFamily: ['"Lato"', "sans-serif"].join(","),
  },
});
