export interface Result<T, E> {
    ok: boolean;
    payload?: T;
    error?: E;
}

export type PromiseResult<T, E> = Promise<Result<T, E>>;
