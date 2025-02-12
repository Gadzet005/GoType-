import React from "react";
import { User } from "./index";
import { observer } from "mobx-react";
import { UserContext } from "./UserContext";
import { loadUserProfileService } from "@/services/user/loadUserProfile";

export const UserProvider = observer(
  ({ children }: { children: React.ReactNode }) => {
    const [user] = React.useState(new User());

    React.useEffect(() => {
      const loadUser = async () => {
        const tokens = await window.userAPI.getTokens();
        if (!tokens) {
          return;
        }

        user.setTokens(tokens);
        const service = new loadUserProfileService(user);
        const result = await service.execute();
        if (!result.ok) {
          user.unauthorize();
          await window.userAPI.clearTokens();
        }
      };

      loadUser();
    }, [user]);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
);