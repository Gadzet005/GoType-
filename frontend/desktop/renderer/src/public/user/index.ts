import { makeObservable, computed, observable, action } from "mobx";

export interface UserProfile {
    id: number;
    name: string;
    accessLevel: number;
    banInfo: {
        reason: string;
        expiresAt: number;
    };
}

export class User {
    profile?: UserProfile;

    constructor() {
        makeObservable(this, {
            profile: observable,
            isAuth: computed,
            authorize: action,
            unauthorize: action,
        });
    }

    authorize(profile: UserProfile) {
        this.profile = profile;
    }

    unauthorize() {
        this.profile = undefined;
    }

    get isAuth() {
        return this.profile !== undefined;
    }

    get isBanned() {
        if (!this.profile) {
            return false;
        }
        return this.profile.banInfo.expiresAt > Date.now();
    }
}
