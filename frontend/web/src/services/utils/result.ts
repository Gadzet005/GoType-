import { ApiError } from "@/config/api.config";
import { AxiosError } from "axios";

export interface Result<T, E> {
    ok: boolean;
    payload?: T;
    error?: E;
}

export type PromiseResult<T, E> = Promise<Result<T, E>>;

export function success<T>(): Result<T, any> {
    return { ok: true };
}

export function failure<T, E>(error: E): Result<T, E> {
    return { ok: false, error };
}

export function commonApiErrorResult(error: any): Result<any, string> {
    if (error instanceof AxiosError && error.response?.data.message) {
        return {
            ok: false,
            error: error.response?.data.message,
        };
    } else {
        return {
            ok: false,
            error: ApiError.unexpected,
        };
    }
}