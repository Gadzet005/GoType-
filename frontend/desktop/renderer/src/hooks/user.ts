import { UserContext } from "@/public/user/UserProvider";
import React from "react";

export const useUser = () => React.useContext(UserContext);
