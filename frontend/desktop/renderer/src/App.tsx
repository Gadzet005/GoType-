import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "@/public/theme/appTheme";
import { UserProvider } from "./public/user/UserProvider";
import { AppNavigation } from "./components/navigation/AppNavigation";
import { routes } from "./navigation/routes";

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
