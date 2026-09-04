import React from 'react';
import {ScrollView} from 'react-native';
import {colors} from '../styles/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import {useWallet} from '../context/WalletContext';

import HomeHeader from '../components/home/HomeHeader';
import BudgetCard from '../components/home/BudgetCard';
import StatsRow from '../components/home/StatsRow';
import CategoryList from '../components/home/CategoryList';
import SavingsGoal from '../components/home/SavingsGoal';
import ReminderBanner from '../components/home/ReminderBanner';

const Home = ({navigation}) => {
    const {budgetSummary} = useWallet();

    return (
        <ScreenWrapper>
            <ScrollView style={{flex: 1, backgroundColor: colors.background}}>
                <HomeHeader name="Alex" />
                <BudgetCard remaining={budgetSummary.remaining} total={budgetSummary.total} period="Monthly" />
                <StatsRow
                    todaySpending={budgetSummary.todaySpending}
                    yesterdayDiff={budgetSummary.yesterdayDiff}
                    daysLeft={budgetSummary.daysLeft}
                    dailyBudget={Math.round(budgetSummary.dailyBudget)}
                />
                <CategoryList />
                <SavingsGoal title="Japan Trip 2025" saved={1950} target={3000} deadline="31 Dec 2025" />
                <ReminderBanner message="You've spent 80% of your Food & Drinks budget this month." />
            </ScrollView>
        </ScreenWrapper>
    );
};
export default Home;