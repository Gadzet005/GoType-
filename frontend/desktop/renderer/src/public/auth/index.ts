export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export async function getAccessToken(): Promise<string | undefined> {
    let access_token = localStorage.getItem("access_token");
    if (!access_token) {
        const tokens = await window.userAPI.getTokens();
        access_token = tokens.accessToken;
        localStorage.setItem("access_token", tokens.accessToken);
    }
    return access_token;
}

export async function getAuthTokens(): Promise<AuthTokens | undefined> {
    return await window.userAPI.getTokens();
}

export async function storeAuthTokens(tokens: AuthTokens): Promise<void> {
    await window.userAPI.storeTokens(tokens.accessToken, tokens.refreshToken);
    localStorage.setItem("access_token", tokens.accessToken);
}

export async function clearAuthTokens(): Promise<void> {
    await window.userAPI.clearTokens();
    localStorage.removeItem("access_token");
}
