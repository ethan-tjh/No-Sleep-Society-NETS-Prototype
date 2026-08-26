import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors, fonts, fontSizes, spacing} from '../styles/theme';
import {CheckCircle2, Flame} from 'lucide-react-native';
import {useWallet} from '../context/WalletContext';
import PetVisual from '../components/PetVisual';
import PetGrowthStrip from '../components/PetGrowthStrip';

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

const Receipt = ({route, navigation}) => {
    const {payment, loopResults = []} = route.params || {};
    const {petName, petSpecies, petLevelInfo, streak} = useWallet();

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={{padding: spacing.md, paddingTop: spacing.lg}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg, backgroundColor: '#d5efdd', padding: spacing.md, borderRadius: 12}}>
                    <CheckCircle2 size={20} color="#2e7d32"/>
                    <View style={{marginLeft: spacing.sm}}>
                        <Text style={{fontFamily: fonts.medium, fontSize: fontSizes.body}}>
                            Payment Successful
                        </Text>
                        <Text style={{fontFamily: fonts.regular, fontSize: fontSizes.small, color: colors.inactive}}>
                            ${payment?.amount?.toFixed(2)} — {payment?.merchantName}
                        </Text>
                    </View>
                </View>

                <View style={{alignItems: 'center', marginBottom: spacing.lg}}>
                    <PetVisual species={petSpecies} level={petLevelInfo.level} size={140}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm}}>
                        <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.header}}>
                            {petName ? `${petName} is Level ${petLevelInfo.level}` : `Level ${petLevelInfo.level}`}
                        </Text>
                        <View style={{marginLeft: spacing.sm}}>
                            <PetGrowthStrip currentLevel={petLevelInfo.level} compact/>
                        </View>
                    </View>
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

                {loopResults.map((loop) => {
                    const remaining = loop.target - loop.current;
                    return (
                        <View
                            key={loop.loopId}
                            style={{
                                borderWidth: 1,
                                borderColor: loop.justCompleted ? colors.primary : colors.border,
                                borderRadius: 12,
                                padding: spacing.md,
                                marginBottom: spacing.sm,
                                backgroundColor: loop.justCompleted ? '#fdeeee' : colors.background,
                            }}
                        >
                            <Text style={{fontFamily: fonts.semibold, fontSize: fontSizes.body}}>
                                {loop.name}
                            </Text>
                            <Dots current={loop.current} target={loop.target}/>
                            <Text style={{
                                fontFamily: fonts.regular,
                                fontSize: fontSizes.small,
                                color: colors.inactive,
                                marginTop: spacing.xs,
                            }}>
                                {loop.justCompleted
                                    ? `Reward unlocked: ${loop.reward}`
                                    : `${remaining} more NETS payment${remaining === 1 ? '' : 's'} to unlock your reward`}
                            </Text>
                        </View>
                    );
                })}

                {loopResults.length === 0 && (
                    <Text style={{
                        fontFamily: fonts.regular,
                        fontSize: fontSizes.small,
                        color: colors.inactive,
                        marginBottom: spacing.md,
                    }}>
                        This merchant isn't part of a loop yet.
                    </Text>
                )}

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        marginTop: spacing.lg,
                        paddingVertical: spacing.md,
                        borderRadius: 12,
                        alignItems: 'center',
                        backgroundColor: colors.primary,
                    }}
                >
                    <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.body, color: '#fff'}}>
                        Done
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </ScreenWrapper>
    );
};
export default Receipt;