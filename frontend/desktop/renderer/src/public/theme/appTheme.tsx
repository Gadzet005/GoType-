import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        draggable: false,
      },
    },
    MuiLink: {
      defaultProps: {
        draggable: false,
      },
    },
  },
});
