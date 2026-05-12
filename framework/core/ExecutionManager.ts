export class ExecutionManager {

    static async runWithTimeout<T>(
        promise: Promise<T>,
        timeoutMs: number
    ): Promise<T> {

        const timeout = new Promise<never>((_, reject) => {

            setTimeout(() => {
                reject(
                    new Error(
                        `Execution timeout after ${timeoutMs}ms`
                    )
                );
            }, timeoutMs);

        });

        return Promise.race([
            promise,
            timeout
        ]);
    }
}