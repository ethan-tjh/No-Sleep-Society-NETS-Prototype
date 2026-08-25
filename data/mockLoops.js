// Loop definitions for the NETS Loop demo.
// type: 'merchant' — repeat purchases at ONE merchant
// type: 'network'  — purchases across DIFFERENT participating merchant types

export const loopDefinitions = [
    {
        id: 'lunch_regular',
        type: 'merchant',
        name: 'Lunch Regular Loop',
        merchantId: 'merchant_hawker_01',
        minSpend: 0,
        target: 4,
        windowDays: 30,
        reward: 'Free drink-size upgrade',
    },
    {
        id: 'campus_discovery',
        type: 'network',
        name: 'Campus Discovery Loop',
        merchantTypes: ['hawker', 'convenience', 'bubble_tea'],
        minSpend: 0,
        target: 3,
        windowDays: 30,
        reward: 'Surprise campus voucher',
    },
];