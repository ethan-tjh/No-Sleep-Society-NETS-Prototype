// Pet level thresholds — total qualifying transactions across ALL merchants,
// separate from individual loop progress (which is per-merchant / per-network).
// This is what makes the pet grow regardless of which loop a payment fed.

export const petLevelThresholds = [
    {level: 1, minTransactions: 0},
    {level: 2, minTransactions: 2},
    {level: 3, minTransactions: 4},
    {level: 4, minTransactions: 7},
    {level: 5, minTransactions: 10},
];