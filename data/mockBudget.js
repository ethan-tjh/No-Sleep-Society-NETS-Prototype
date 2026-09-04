import {currentUserToken} from './mockUser';

export const monthlyBudget = 1500;

// Seed "historical" spending so Home's budget stats aren't zero on first load.
// These are for DISPLAY ONLY — they never pass through recordPayment(), so
// they do NOT count toward NETS Loop progress or pet growth. Only live
// payments made through Pay/Scan during the demo advance those.
// Timestamps are relative to app load time, not hardcoded dates, so this
// stays realistic no matter what day the demo actually runs on.
export function buildSeedSpending() {
    const now = new Date();
    const daysAgo = (n, hour = 12) => {
        const d = new Date(now);
        d.setDate(d.getDate() - n);
        d.setHours(hour, 0, 0, 0);
        return d.toISOString();
    };

    return [
        {paymentId: 'seed_001', userToken: currentUserToken, merchantId: 'seed_hawker', merchantName: 'Ah Seng Hawker Stall', merchantType: 'food', amount: 6.50, rail: 'nets_qr', timestamp: daysAgo(1, 12), status: 'success'},
        {paymentId: 'seed_002', userToken: currentUserToken, merchantId: 'seed_bubbletea', merchantName: 'Bubble Tea Corner', merchantType: 'food', amount: 5.90, rail: 'nets_qr', timestamp: daysAgo(1, 18), status: 'success'},
        {paymentId: 'seed_003', userToken: currentUserToken, merchantId: 'seed_grab', merchantName: 'Grab Rides', merchantType: 'transport', amount: 18.50, rail: 'cardholder', timestamp: daysAgo(4), status: 'success'},
        {paymentId: 'seed_004', userToken: currentUserToken, merchantId: 'seed_ntuc', merchantName: 'NTUC FairPrice', merchantType: 'groceries', amount: 62.30, rail: 'nets_qr', timestamp: daysAgo(7), status: 'success'},
        {paymentId: 'seed_005', userToken: currentUserToken, merchantId: 'seed_netflix', merchantName: 'Netflix', merchantType: 'subscription', amount: 17.98, rail: 'cardholder', timestamp: daysAgo(9), status: 'success'},
        {paymentId: 'seed_006', userToken: currentUserToken, merchantId: 'seed_convenience', merchantName: 'Campus Convenience Store', merchantType: 'groceries', amount: 34.20, rail: 'nets_qr', timestamp: daysAgo(12), status: 'success'},
        {paymentId: 'seed_007', userToken: currentUserToken, merchantId: 'seed_zara', merchantName: 'Zara', merchantType: 'fashion', amount: 145.00, rail: 'cardholder', timestamp: daysAgo(18), status: 'success'},
        {paymentId: 'seed_008', userToken: currentUserToken, merchantId: 'seed_ntuc', merchantName: 'NTUC FairPrice', merchantType: 'groceries', amount: 88.40, rail: 'nets_qr', timestamp: daysAgo(23), status: 'success'},
        {paymentId: 'seed_009', userToken: currentUserToken, merchantId: 'seed_grab', merchantName: 'Grab Rides', merchantType: 'transport', amount: 19.30, rail: 'cardholder', timestamp: daysAgo(27), status: 'success'},
    ];
}