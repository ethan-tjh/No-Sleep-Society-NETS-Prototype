import React from 'react';
import {View, Text} from 'react-native';
import {TrendingUp, TrendingDown, Minus, Calendar} from 'lucide-react-native';
import {fonts, fontSizes, spacing} from '../../styles/theme';

export default function StatsRow({todaySpending, yesterdayDiff, daysLeft, dailyBudget}) {
    // yesterdayDiff is signed: positive = spending more than yesterday,
    // negative = less, zero = the same.
    const direction = yesterdayDiff > 0 ? 'up' : yesterdayDiff < 0 ? 'down' : 'flat';
    const diffMeta = {
        up: {Icon: TrendingUp, color: '#E25555', arrow: '↑'},
        down: {Icon: TrendingDown, color: '#22A559', arrow: '↓'},
        flat: {Icon: Minus, color: '#666', arrow: '→'},
    }[direction];

    return (
        <View style={{flexDirection: 'row', gap: spacing.sm, marginHorizontal: spacing.md}}>
            <View style={{flex: 1, backgroundColor: '#F5F5FF', borderRadius: 16, padding: spacing.md}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: fontSizes.small, fontFamily: fonts.medium}}>Today's Spending</Text>
                    <diffMeta.Icon size={16} color={diffMeta.color}/>
                </View>
                <Text style={{fontFamily: fonts.bold, fontSize: 20, color: '#3B82F6', marginTop: spacing.xs}}>
                    S${todaySpending.toFixed(2)}
                </Text>
                <Text style={{fontSize: fontSizes.small, color: diffMeta.color, marginTop: 2}}>
                    vs yesterday {diffMeta.arrow} S${Math.abs(yesterdayDiff).toFixed(2)}
                </Text>
            </View>
            <View style={{flex: 1, backgroundColor: '#F5F5FF', borderRadius: 16, padding: spacing.md}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: fontSizes.small, fontFamily: fonts.medium}}>Days Left in Month</Text>
                    <Calendar size={16} color="#6C63FF"/>
                </View>
                <Text style={{fontFamily: fonts.bold, fontSize: 20, color: '#6C63FF', marginTop: spacing.xs}}>
                    {daysLeft}
                </Text>
                <Text style={{fontSize: fontSizes.small, color: '#666', marginTop: 2}}>
                    Daily Budget: S${dailyBudget}
                </Text>
            </View>
        </View>
    );
}