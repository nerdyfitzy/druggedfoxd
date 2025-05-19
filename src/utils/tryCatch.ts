type Result<T, E = Error> = [T, null] | [null, E]

export async function tryCatch<T, E = Error>(
    promise: Promise<T>,
): Promise<Result<T, E>> {
    try {
        const data = await promise;
        return [data, null] as const;
    } catch (error) {
        return [null, error as E] as const;
    }
}
