import React from 'react';
import {View, Text} from 'react-native';
import {Wallet, Info} from 'lucide-react-native';
import {fonts, fontSizes, spacing} from "../../styles/theme";

export default function BudgetCard({remaining, total, period}) {
    const percent = Math.round((remaining / total) * 100);

    return (
        <View style={{margin: spacing.md, padding: spacing.md, borderRadius: 16, backgroundColor: '#EAF7EF'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                    <Text style={{fontFamily: fonts.medium, fontSize: fontSizes.small}}>Remaining Budget</Text>
                    <Info size={14} color="#888" />
                </View>
                <View style={{backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: spacing.sm, paddingVertical: 4}}>
                    <Text style={{fontSize: fontSizes.small}}>{period} ▾</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: spacing.sm}}>
                <View>
                    <Text style={{fontFamily: fonts.bold, fontSize: 28}}>S${remaining.toFixed(2)}</Text>
                    <Text style={{fontSize: fontSizes.small, color: '#666'}}>of S${total.toLocaleString()}</Text>
                </View>
                <Wallet size={36} color="#4CAF6D" />
            </View>

            <View style={{height: 8, backgroundColor: '#d5efdd', borderRadius: 4, marginTop: spacing.sm, overflow: 'hidden'}}>
                <View style={{width: `${percent}%`, height: '100%', backgroundColor: '#4CAF6D', borderRadius: 4}} />
            </View>
            <Text style={{alignSelf: 'flex-end', fontSize: fontSizes.small, color: '#4CAF6D', marginTop: 4}}>{percent}%</Text>
        </View>
    );
}