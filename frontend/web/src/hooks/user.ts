import { UserContext } from "@/store/user/UserContext";
import React from "react";

export const useUser = () => React.useContext(UserContext);