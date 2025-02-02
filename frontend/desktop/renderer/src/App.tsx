import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "@/core/theme/appTheme";
import { UserProvider } from "./core/store/user/UserProvider";
import { AppNavigation } from "./core/navigation/AppNavigation";
import { routes } from "./core/config/routes";

export const App = () => {
  return (
    <UserProvider>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Box sx={{ height: "100%" }}>
          <AppNavigation routes={routes} />
        </Box>
      </ThemeProvider>
    </UserProvider>
  );
};
