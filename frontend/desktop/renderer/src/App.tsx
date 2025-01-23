import { Box, ThemeProvider } from "@mui/material";
import { appTheme } from "@/public/theme/appTheme";
import { UserProvider } from "./public/user/UserProvider";
import { AppNavigation } from "./public/navigation/AppNavigation";

export const App = () => {
  return (
    <UserProvider>
      <ThemeProvider theme={appTheme}>
        <Box sx={{ height: "100%", p: 2 }}>
          <AppNavigation />
        </Box>
      </ThemeProvider>
    </UserProvider>
  );
};
