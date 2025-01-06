declare global {
    interface Window {
        storeAPI: {
            getTokens: () => Promise<{
                accessToken: string;
                refreshToken: string;
            }>;
            storeTokens: (
                accessToken: string,
                refreshToken: string
            ) => Promise<void>;
            clearTokens: () => Promise<void>;
        };
    }
}

export {};
