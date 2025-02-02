import React from "react";
import { User } from "./index";
import { getAuthTokens } from "../auth";
import { auth } from "../auth/utils";
import { observer } from "mobx-react";
import { UserContext } from "./UserContext";

export const UserProvider = observer(
  ({ children }: { children: React.ReactNode }) => {
    const [user] = React.useState(new User());

    React.useEffect(() => {
      getAuthTokens().then((tokens) => {
        if (tokens) {
          auth(user, tokens, false);
        }
      });
    }, [user]);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
);
