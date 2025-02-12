import { ApiRoutes } from "@/config/api.config";
import { UserService } from "@/services/base/userService";
import { commonApiErrorResult, success, Result } from "@/services/utils/result";

type LogoutResult = Result<void, string>;

export class LogoutService extends UserService {
    override async execute(): Promise<LogoutResult> {
        try {
            await this.authApi.post(ApiRoutes.UserActions.LOGOUT);
            this.user.unauthorize();
            await window.userAPI.clearTokens();
            return success();
        } catch (error: any) {
            return commonApiErrorResult(error);
        }
    }
}