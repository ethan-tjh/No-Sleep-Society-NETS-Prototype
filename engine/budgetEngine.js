// budgetEngine.js — pure functions for Home page budget stats.
// No React, no storage. Takes a flat list of transactions (live + seeded)
// and a monthly budget figure, returns everything the Home screen needs.

function isSameCalendarDay(dateA, dateB) {
    const a = new Date(dateA);
    const b = new Date(dateB);
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export function computeTotalSpent(transactions) {
    return transactions
        .filter((t) => t.status === 'success')
        .reduce((sum, t) => sum + t.amount, 0);
}

export function computeSpendingOnDay(transactions, day) {
    return transactions
        .filter((t) => t.status === 'success' && isSameCalendarDay(t.timestamp, day))
        .reduce((sum, t) => sum + t.amount, 0);
}

export function computeDaysLeftInMonth(now = new Date()) {
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return Math.max(lastDayOfMonth - now.getDate(), 0);
}

/**
 * Everything Home.js needs, derived fresh from transactions each time —
 * same "derive, don't store" approach as petLevelInfo/streak in WalletContext.
 */
export function computeBudgetSummary(transactions, monthlyBudget, now = new Date()) {
    const totalSpent = computeTotalSpent(transactions);
    const remaining = Math.max(monthlyBudget - totalSpent, 0);

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const todaySpending = computeSpendingOnDay(transactions, now);
    const yesterdaySpending = computeSpendingOnDay(transactions, yesterday);
    const daysLeft = computeDaysLeftInMonth(now);

    return {
        total: monthlyBudget,
        totalSpent,
        remaining,
        todaySpending,
        yesterdaySpending,
        // Signed: positive = spending more than yesterday, negative = less.
        // StatsRow uses the sign to choose the arrow direction and color.
        yesterdayDiff: todaySpending - yesterdaySpending,
        daysLeft,
        dailyBudget: daysLeft > 0 ? remaining / daysLeft : 0,
    };
}