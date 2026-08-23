import React from 'react';
import {ScrollView} from 'react-native';
import {colors} from '../styles/theme';

import HomeHeader from '../components/home/HomeHeader';
import BudgetCard from '../components/home/BudgetCard';
import StatsRow from '../components/home/StatsRow';
import CategoryList from '../components/home/CategoryList';
import SavingsGoal from '../components/home/SavingsGoal';
import ReminderBanner from '../components/home/ReminderBanner';

const Home = ({navigation}) => {
    return (
        <ScrollView style={{flex: 1, backgroundColor: colors.background}}>
            <HomeHeader name="Alex" />
            <BudgetCard remaining={780.5} total={1500} period="Monthly" />
            <StatsRow todaySpending={23.6} yesterdayDiff={8.4} daysLeft={15} dailyBudget={52} />
            <CategoryList />
            <SavingsGoal title="Japan Trip 2025" saved={1950} target={3000} deadline="31 Dec 2025" />
            <ReminderBanner message="You've spent 80% of your Food & Drinks budget this month." />
        </ScrollView>
    );
};
export default Home;