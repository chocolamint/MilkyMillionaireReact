
export interface CancellationTokenSource {
    cancel(): void;
}
export interface CancellationToken {
    isCancellationRequested(): boolean;
    register(action: () => void): void;
}

export function cancellation(onCancel?: () => void): [CancellationTokenSource, CancellationToken] {
    let canceled = false;
    let cancel = onCancel || (() => { });
    return [{
        cancel() {
            canceled = true;
            cancel();
        }
    }, {
        isCancellationRequested() {
            return canceled;
        },
        register(action: () => void) {
            cancel = combine(cancel, action);
        }
    }];

    function combine(action1: () => void, action2: () => void) {
        return () => { action1(); action2(); };
    }
}

export function sleep(delay: number, cancellationToken?: CancellationToken) {
    return new Promise(resolve => {
        const timer = setTimeout(resolve, delay);
        if (cancellationToken) {
            cancellationToken.register(() => clearTimeout(timer));
        }
    });
}