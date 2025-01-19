import { ThemeProvider } from "@mui/material";
import { appTheme } from "@/public/theme/appTheme";
import { UserProvider } from "./public/user/UserProvider";
import { AppNavigation } from "./public/navigation/AppNavigation";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const App = () => {
  return (
    <UserProvider>
      <ThemeProvider theme={appTheme}>
        <AppNavigation />
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
