import { UserContext } from "@/core/store/user/UserContext";
import React from "react";

export const useUser = () => React.useContext(UserContext);
