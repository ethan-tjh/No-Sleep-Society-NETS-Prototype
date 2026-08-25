// loopEngine.js — pure domain logic for NETS Loop.
// No React, no storage, no network calls. Takes a payment + loop definitions
// + current progress, returns updated progress + a summary of what happened.
// This is the seam where a real NETS QR / Cardholder API payload would plug
// in later — as long as it's mapped to the payment shape below, nothing
// here needs to change.
//
// Expected payment shape:
// {
//   paymentId: string,
//   merchantId: string,
//   merchantName: string,
//   merchantType: string,
//   amount: number,
//   rail: 'nets_qr' | 'cardholder',
//   timestamp: string (ISO),
//   status: 'success' | 'failed',
// }

function createEmptyProgress(loop) {
    return loop.type === 'network'
        ? {visitedTypes: [], current: 0, completed: false}
        : {current: 0, completed: false};
}

function paymentQualifies(payment, loop) {
    if (payment.status !== 'success') return false;
    if (loop.minSpend && payment.amount < loop.minSpend) return false;
    if (loop.type === 'merchant') return payment.merchantId === loop.merchantId;
    if (loop.type === 'network') return loop.merchantTypes.includes(payment.merchantType);
    return false;
}

function advanceProgress(entry, loop, payment) {
    if (loop.type === 'merchant') {
        const current = Math.min(entry.current + 1, loop.target);
        return {...entry, current, completed: current >= loop.target};
    }
    if (loop.type === 'network') {
        const visitedTypes = entry.visitedTypes.includes(payment.merchantType)
            ? entry.visitedTypes
            : [...entry.visitedTypes, payment.merchantType];
        const current = visitedTypes.length;
        return {...entry, visitedTypes, current, completed: current >= loop.target};
    }
    return entry;
}

/**
 * Evaluate a payment against every loop definition.
 * Returns the updated progress map plus a results array describing
 * only the loops this payment actually contributed to — this is what
 * the receipt screen renders.
 */
export function evaluatePayment(payment, loopDefinitions, currentProgress) {
    const nextProgress = {...currentProgress};
    const results = [];

    loopDefinitions.forEach((loop) => {
        if (!paymentQualifies(payment, loop)) return;

        const entry = nextProgress[loop.id] || createEmptyProgress(loop);
        const wasCompleted = entry.completed;
        const updatedEntry = advanceProgress(entry, loop, payment);
        nextProgress[loop.id] = updatedEntry;

        results.push({
            loopId: loop.id,
            name: loop.name,
            type: loop.type,
            reward: loop.reward,
            current: updatedEntry.current,
            target: loop.target,
            completed: updatedEntry.completed,
            justCompleted: updatedEntry.completed && !wasCompleted,
        });
    });

    return {loopProgress: nextProgress, results};
}