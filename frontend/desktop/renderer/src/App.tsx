import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routing/AppRouter";
import { User, UserContext } from "./public/user";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "@/public/style/appTheme";
import { auth } from "./public/auth/utils";
import { getAuthTokens } from "./public/auth";

export const App = () => {
  const [user] = React.useState(new User());

  React.useEffect(() => {
    getAuthTokens().then((tokens) => {
      if (tokens) {
        auth(user, tokens);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider theme={appTheme}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default App;
