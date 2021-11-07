import { createTheme } from "@material-ui/core";

var primary = "#363636";
var secondary = "#2d949c";

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  typography: {
    fontFamily: ["Rubik", "sans-serif"],
    fontSize: 16,
  },
});

export default theme;
