// import { getUserInfo, logout } from "@/api/user";
import { AuthTokens, clearAuthTokens, storeAuthTokens } from "@/public/auth";
import { User } from "@/public/user";

export async function auth(user: User, tokens: AuthTokens) {
    await storeAuthTokens(tokens);
    // const result = await getUserInfo();

    // TODO: remove this
    const result = {
        ok: true,
        payload: {
            id: 1,
            name: "John Doe",
            accessLevel: 1,
            banInfo: {
                reason: "",
                expiresAt: 123,
            },
        },
    };

    if (result.ok) {
        user.authorize(result.payload!);
    }
}

export async function unauth(user: User): Promise<void> {
    await clearAuthTokens();
    user.unauthorize();

    // await logout();
}
