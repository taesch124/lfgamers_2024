export type DatabaseResponse<T> = {
    error?: boolean;
    data?: T;
    errorMessage?: string;
}