import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Bell} from 'lucide-react-native';
import {colors, fonts, fontSizes, spacing} from '../../styles/theme';

export default function HomeHeader({name}) {
    return (
        <View style={{paddingHorizontal: spacing.md, paddingTop: spacing.lg}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.header}}>Smart Wallet</Text>
                <TouchableOpacity>
                    <Bell size={22} color={colors.text} />
                </TouchableOpacity>
            </View>
            <Text style={{fontFamily: fonts.semibold, fontSize: fontSizes.body, marginTop: spacing.sm}}>
                👋 Hi, {name}!
            </Text>
            <Text style={{fontFamily: fonts.regular, fontSize: fontSizes.small, color: colors.inactive, marginTop: 2}}>
                Here's your financial overview
            </Text>
        </View>
    );
}