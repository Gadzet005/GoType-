import { createContext, useContext } from "react";
import { makeObservable, computed, observable, action } from "mobx";

export interface UserProfile {
    id: number;
    name: string;
    email: string;
}

export interface AuthInfo {
    accessToken: string;
    refreshToken: string;
}

export class User {
    authInfo?: AuthInfo;
    profile?: UserProfile;

    constructor() {
        makeObservable(this, {
            profile: observable,
            authInfo: observable,
            isAuth: computed,
            login: action,
            logout: action,
        });

        this.loadData();
    }

    login(authInfo: AuthInfo) {
        window.storeAPI.storeTokens(
            authInfo.accessToken,
            authInfo.refreshToken
        );
        this.authInfo = authInfo;
        this.profile = {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
        };
    }

    logout() {
        this.profile = undefined;
        this.authInfo = undefined;
        window.storeAPI.clearTokens();
    }

    // Load data (profile and auth info) from storage.
    loadData() {
        window.storeAPI.getTokens().then((tokens) => {
            if (tokens) {
                this.login(tokens);
            }
        });
    }

    get isAuth() {
        return this.authInfo !== undefined;
    }
}

export const UserContext = createContext<User>(new User());
export const useUser = () => useContext(UserContext);
