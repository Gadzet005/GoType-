import { UserContext } from "@/public/user/UserContext";
import React from "react";

export const useUser = () => React.useContext(UserContext);
