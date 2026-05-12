export class AgentGuard {
    private retryCount = 0;
    private readonly maxRetries = 3;

    canRetry(): boolean {
        return this.retryCount < this.maxRetries;
    }

    incrementRetry(): void {
        this.retryCount++;
    }

    reset(): void {
        this.retryCount = 0;
    }

    getRetries(): number {
        return this.retryCount;
    }
}