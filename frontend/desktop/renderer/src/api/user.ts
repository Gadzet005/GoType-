import { host, PromiseResult } from "./common";
import { AuthInfo } from "@/public/user";

export const signIn = async (
    email: string,
    password: string
): PromiseResult<AuthInfo, string> => {
    try {
        // const response = await host.post("/login/", {
        //     email: email,
        //     password: password,
        // });

        return {
            ok: true,
            payload: {
                accessToken: "sfsdf",
                refreshToken: "sfsdf",
            },
        };
    } catch (error: any) {
        return {
            ok: false,
            error: "Неизвестная ошибка.",
        };
    }
};

export const signUp = async (
    email: string,
    name: string,
    password: string
): PromiseResult<AuthInfo, string> => {
    try {
        // const response = await host.post("/register/", {
        //     email: email,
        //     name: name,
        //     password: password,
        // });

        return {
            ok: true,
            payload: {
                accessToken: "sfsdf",
                refreshToken: "sfsdf",
            },
        };
    } catch (error: any) {
        return {
            ok: false,
            error: "Неизвестная ошибка.",
        };
    }
};
