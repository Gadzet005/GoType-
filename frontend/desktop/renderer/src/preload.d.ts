declare global {
    interface Window {
        commonAPI: {
            quitApp: () => Promise<void>;
        };
        userAPI: {
            getTokens: () => Promise<
                | {
                      accessToken: string;
                      refreshToken: string;
                  }
                | undefined
            >;
            storeTokens: (
                accessToken: string,
                refreshToken: string
            ) => Promise<void>;
            clearTokens: () => Promise<void>;
        };
        levelAPI: {
            getLevels: () => Promise<Level[]>;
            getLevel: (levelId: number) => Promise<Level | null>;
            addLevel: (level: Level) => Promise<void>;
            removeLevel: (levelId: number) => Promise<void>;
        };
    }
}

export {};
