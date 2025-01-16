import { authHost, host, PromiseResult } from "./common";
import { UserProfile } from "@/public/user";
import { AuthTokens } from "@/public/auth";

export const signIn = async (
    name: string,
    password: string
): PromiseResult<AuthTokens, string> => {
    try {
        const response = await host.post("/auth/login", {
            name: name,
            password: password,
        });

        const data = response.data;

        return {
            ok: true,
            payload: {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
            },
        };
    } catch (error: any) {
        return {
            ok: false,
            error: error.response.data.message,
        };
    }
};

export const signUp = async (
    name: string,
    password: string
): PromiseResult<AuthTokens, string> => {
    try {
        const response = await host.post("/auth/register", {
            name: name,
            password: password,
        });

        const data = response.data;

        return {
            ok: true,
            payload: {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
            },
        };
    } catch (error: any) {
        return {
            ok: false,
            error: error.reponse.data.message,
        };
    }
};

export const logout = async (): Promise<void> => {
    const response = await authHost.post("/user-actions/logout").catch(() => {
        console.error("logout failed");
    });

    console.log(response);

    await window.userAPI.clearTokens();
    localStorage.removeItem("access_token");
};

export const getUserInfo = async (): PromiseResult<UserProfile, string> => {
    try {
        const response = await authHost.get("/user-actions/get-user-info");
        const data = response.data;

        return {
            ok: true,
            payload: {
                id: 1, // TODO: remove this
                name: data.name,
                accessLevel: data.access,
                banInfo: {
                    reason: data.banReason,
                    expiresAt: data.banTime,
                },
            },
        };
    } catch (error: any) {
        return {
            ok: false,
            error: error.response.data.message,
        };
    }
};
