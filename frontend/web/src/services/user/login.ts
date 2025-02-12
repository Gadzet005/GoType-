import { ApiRoutes } from "@/config/api.config";
import { UserService } from "@/services/base/userService";
import { commonApiErrorResult, success, Result } from "@/services/utils/result";
import { loadUserProfileService } from "./loadUserProfile";

interface SignInServiceArgs {
    name: string;
    password: string;
}

export type SignInServiceResult = Result<void, string>;

export class SignInService extends UserService {
    override async execute(
        args: SignInServiceArgs
    ): Promise<SignInServiceResult> {
        try {
            const response = await this.api.post(ApiRoutes.Auth.SIGN_IN, {
                name: args.name,
                password: args.password,
            });

            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            this.user.setTokens({ accessToken, refreshToken });
            await window.userAPI.storeTokens(accessToken, refreshToken);

            const loadProfileService = new loadUserProfileService(this.user);
            const result = await loadProfileService.execute();
            if (!result.ok) {
                return result as SignInServiceResult;
            }

            return success();
        } catch (error: any) {
            return commonApiErrorResult(error);
        }
    }
}