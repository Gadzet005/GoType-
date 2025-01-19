import React from "react";
import { NavigationContext } from "./AppNavigation";

export const useNavigate = () => {
    return React.useContext(NavigationContext).navigate;
};
