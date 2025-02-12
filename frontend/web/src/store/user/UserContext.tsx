import React from "react";
import { User } from "./index";

export const UserContext = React.createContext<User>(new User());