// petEngine.js — pure functions for pet level + streak.
// No React, no storage. Same seam as loopEngine.js: swap the data source later,
// logic doesn't change.
//
// Streak uses a rolling 7-day bucket rather than calendar weeks (Mon-Sun) —
// simpler to compute and good enough for a prototype demo. Revisit if the
// team wants streaks to align with calendar weeks specifically.

export function weekBucket(date) {
    return Math.floor(new Date(date).getTime() / (7 * 24 * 60 * 60 * 1000));
}

/**
 * Consecutive rolling-weeks (ending with the current week) that have at
 * least one successful payment.
 */
export function computeStreak(transactions, now = new Date()) {
    const weeksWithPayment = new Set(
        transactions
            .filter((t) => t.status === 'success')
            .map((t) => weekBucket(t.timestamp))
    );

    let streak = 0;
    let cursor = weekBucket(now);
    while (weeksWithPayment.has(cursor)) {
        streak += 1;
        cursor -= 1;
    }
    return streak;
}

/**
 * Given a total qualifying transaction count, returns the current pet level
 * plus how many more transactions are needed to reach the next one.
 */
export function getPetLevel(transactionCount, levelThresholds) {
    let current = levelThresholds[0];
    for (const entry of levelThresholds) {
        if (transactionCount >= entry.minTransactions) current = entry;
    }

    const currentIndex = levelThresholds.findIndex((l) => l.level === current.level);
    const next = levelThresholds[currentIndex + 1] || null;

    return {
        level: current.level,
        minTransactions: current.minTransactions,
        nextLevel: next ? next.level : null,
        nextThreshold: next ? next.minTransactions : null,
        transactionsToNextLevel: next ? Math.max(next.minTransactions - transactionCount, 0) : 0,
    };
}