import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routing/AppRouter";
import { User, UserContext } from "./public/user";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "@/public/style/appTheme";

export const App = () => {
  const [user] = React.useState(() => {
    const user = new User();
    return user;
  });

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <ThemeProvider theme={appTheme}>
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
