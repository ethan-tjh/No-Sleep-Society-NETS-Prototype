import React from 'react';
import {View, Text} from 'react-native';
import {Utensils, Bus, ShoppingBag, Film, MoreHorizontal} from 'lucide-react-native';
import {fonts, fontSizes, spacing} from '../../styles/theme';

const categories = [
    {name: 'Food & Drinks', icon: Utensils, amount: 320.4, percent: 32, color: '#FF7A45', bg: '#FFE8DD'},
    {name: 'Transport', icon: Bus, amount: 150.2, percent: 18, color: '#3B82F6', bg: '#DCEBFF'},
    {name: 'Shopping', icon: ShoppingBag, amount: 150.3, percent: 15, color: '#EC4899', bg: '#FCE1EE'},
    {name: 'Entertainment', icon: Film, amount: 98.7, percent: 10, color: '#8B5CF6', bg: '#EAE1FF'},
    {name: 'Others', icon: MoreHorizontal, amount: 110.4, percent: 11, color: '#6B7280', bg: '#E5E7EB'},
];

export default function CategoryList() {
    return (
        <View style={{margin: spacing.md, padding: spacing.md, borderRadius: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#F0F0F0'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm}}>
                <Text style={{fontFamily: fonts.semibold, fontSize: fontSizes.body}}>Spending by Category</Text>
                <Text style={{fontSize: fontSizes.small, color: '#3B82F6'}}>This Month</Text>
            </View>

            {categories.map((cat) => {
                const CatIcon = cat.icon;
                return (
                    <View key={cat.name} style={{flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm}}>
                        <View style={{width: 32, height: 32, borderRadius: 8, backgroundColor: cat.bg, justifyContent: 'center', alignItems: 'center'}}>
                            <CatIcon size={16} color={cat.color}/>
                        </View>
                        <View style={{flex: 1, marginLeft: spacing.sm}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: fontSizes.small, fontFamily: fonts.medium}}>{cat.name}</Text>
                                <Text style={{fontSize: fontSizes.small, fontFamily: fonts.medium}}>S${cat.amount.toFixed(2)}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                                <View style={{flex: 1, height: 6, backgroundColor: '#F0F0F0', borderRadius: 3, overflow: 'hidden', marginRight: spacing.sm}}>
                                    <View style={{width: `${cat.percent}%`, height: '100%', backgroundColor: cat.color}}/>
                                </View>
                                <Text style={{fontSize: fontSizes.small, color: '#999'}}>{cat.percent}%</Text>
                            </View>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}