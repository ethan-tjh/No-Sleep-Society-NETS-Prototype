import React, {useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors, fonts, fontSizes, spacing} from '../styles/theme';
import {Flame} from 'lucide-react-native';
import {useWallet} from '../context/WalletContext';
import PetVisual from '../components/PetVisual';
import PetGrowthStrip from '../components/PetGrowthStrip';
import {useNavigation} from '@react-navigation/native';

const Dots = ({current, target}) => (
    <View style={{flexDirection: 'row', marginTop: spacing.xs}}>
        {Array.from({length: target}).map((_, i) => {
            const filled = i < current;
            return (
                <View
                    key={i}
                    style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: filled ? colors.primary : colors.inactive,
                        backgroundColor: filled ? colors.primary : 'transparent',
                        marginRight: spacing.xs,
                    }}
                />
            );
        })}
    </View>
);

const Rewards = () => {
    const {loopDefinitions, loopProgress, petName, petSpecies, petLevelInfo, streak, qualifyingCount, transactions} = useWallet();
    const navigation = useNavigation();

    useEffect(() => {
        if (!petName) {
            navigation.navigate('PetSetup');
        }
    }, [petName, navigation]);

    if (!petName) {
        return <ScreenWrapper />;
    }

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={{padding: spacing.md, paddingTop: spacing.lg}}>
                <View style={{alignItems: 'center', marginBottom: spacing.md}}>
                    <PetVisual species={petSpecies} level={petLevelInfo.level} size={200}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm}}>
                        <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.header}}>
                            {petName ? `${petName} is Level ${petLevelInfo.level}` : `Level ${petLevelInfo.level}`}
                        </Text>
                        <View style={{marginLeft: spacing.sm}}>
                            <PetGrowthStrip currentLevel={petLevelInfo.level} compact/>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: colors.border,
                        padding: spacing.md,
                        marginTop: spacing.md,
                        alignSelf: 'stretch',
                    }}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.body}}>
                                {qualifyingCount}
                            </Text>
                            <Text style={{
                                fontFamily: fonts.regular,
                                fontSize: fontSizes.small,
                                color: colors.inactive,
                                marginTop: spacing.xs,
                            }}>
                                Transactions
                            </Text>
                        </View>
                        <View style={{width: 1, backgroundColor: colors.border}}/>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.body}}>
                                ${transactions.filter((t) => t.status === 'success').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                            </Text>
                            <Text style={{
                                fontFamily: fonts.regular,
                                fontSize: fontSizes.small,
                                color: colors.inactive,
                                marginTop: spacing.xs,
                            }}>
                                Total Spent
                            </Text>
                        </View>
                        <View style={{width: 1, backgroundColor: colors.border}}/>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Flame size={14} color={colors.primary}/>
                                <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.body, marginLeft: 4}}>
                                    {streak}
                                </Text>
                            </View>
                            <Text style={{
                                fontFamily: fonts.regular,
                                fontSize: fontSizes.small,
                                color: colors.inactive,
                                marginTop: spacing.xs,
                            }}>
                                Week Streak
                            </Text>
                        </View>
                    </View>
                </View>

                <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.header, marginBottom: spacing.md}}>
                    Discover & Earn
                </Text>

                {loopDefinitions.map((loop) => {
                    const progress = loopProgress[loop.id] || {current: 0, completed: false};
                    return (
                        <View
                            key={loop.id}
                            style={{
                                borderWidth: 1,
                                borderColor: progress.completed ? colors.primary : colors.border,
                                borderRadius: 12,
                                padding: spacing.md,
                                marginBottom: spacing.sm,
                            }}
                        >
                            <Text style={{fontFamily: fonts.medium, fontSize: fontSizes.small, color: colors.inactive}}>
                                {loop.type === 'network' ? 'Network loop' : 'Merchant loop'}
                            </Text>
                            <Text style={{fontFamily: fonts.semibold, fontSize: fontSizes.body, marginTop: 2}}>
                                {loop.name}
                            </Text>
                            <Dots current={progress.current} target={loop.target}/>
                            <Text style={{
                                fontFamily: fonts.regular,
                                fontSize: fontSizes.small,
                                color: colors.inactive,
                                marginTop: spacing.xs,
                            }}>
                                {progress.completed ? `Unlocked: ${loop.reward}` : `Reward: ${loop.reward}`}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </ScreenWrapper>
    );
};
export default Rewards;