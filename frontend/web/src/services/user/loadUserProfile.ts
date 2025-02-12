import { ApiRoutes } from "@/config/api.config";
import { UserService } from "@/services/base/userService";
import { UserProfile } from "@/store/user";
import { Result, commonApiErrorResult, success } from "@/services/utils/result";

type LoadResult = Result<UserProfile, string>;
interface BackendReponse {
    id: number;
    username: string;
    access: number;
    ban_reason: string;
    ban_time: string;
}

export class loadUserProfileService extends UserService {
    override async execute(): Promise<LoadResult> {
        try {
            const response = await this.authApi.get(
                ApiRoutes.UserActions.GET_USER_INFO
            );
            const data: BackendReponse = response.data;

            this.user.setProfile({
                id: data.id,
                name: data.username,
                accessLevel: data.access,
                banInfo: {
                    reason: data.ban_reason,
                    expiresAt: Date.parse(data.ban_time),
                },
            });

            return success();
        } catch (error: any) {
            return commonApiErrorResult(error);
        }
    }
}