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
        {Array.from({length: target}).map((_, i) => (
            <Text
                key={i}
                style={{
                    fontSize: fontSizes.body,
                    color: i < current ? colors.primary : colors.border,
                    marginRight: spacing.xs,
                }}
            >
                ●
            </Text>
        ))}
    </View>
);

const Rewards = () => {
    const {loopDefinitions, loopProgress, petName, petSpecies, petLevelInfo, streak} = useWallet();
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
                    <PetVisual species={petSpecies} level={petLevelInfo.level}/>
                    <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.header, marginTop: spacing.sm}}>
                        {petName ? `${petName} is level ${petLevelInfo.level}` : `Level ${petLevelInfo.level}`}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs}}>
                        <Flame size={14} color={colors.inactive}/>
                        <Text style={{
                            fontFamily: fonts.regular,
                            fontSize: fontSizes.small,
                            color: colors.inactive,
                            marginLeft: 4,
                        }}>
                            {streak}-week streak
                        </Text>
                    </View>
                </View>

                <View style={{
                    paddingVertical: spacing.md,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: colors.border,
                    marginBottom: spacing.lg,
                }}>
                    <PetGrowthStrip currentLevel={petLevelInfo.level}/>
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