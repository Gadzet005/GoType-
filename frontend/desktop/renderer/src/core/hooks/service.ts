import React, { useCallback } from "react";
import { Service } from "@/core/services/base/service";
import { User } from "../store/user";
import { useUser } from "./user";

export const useService = function useService<S extends Service>(
    ServiceClass: new (user: User) => S,
    isPendingAfterMount = false,
    ignoreHTTPErrors = false
) {
    const user = useUser();
    const service = React.useMemo(() => {
        return new ServiceClass(user);
    }, [ServiceClass, user]);

    const [pending, setPending] = React.useState(isPendingAfterMount);

    React.useEffect(() => {
        setPending(isPendingAfterMount);
    }, [isPendingAfterMount]);

    const isPending = useCallback(() => {
        return pending;
    }, [pending]);

    const call = useCallback(
        async (args?: any) => {
            setPending(true);

            let result;
            try {
                result = await service.execute(args);
            } catch (err) {
                if (!ignoreHTTPErrors) {
                    console.error(err);
                } else {
                    throw err;
                }
            } finally {
                setPending(false);
            }
            return result;
        },
        [service, ignoreHTTPErrors]
    );

    return { call, isPending };
};
