import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors, fonts, fontSizes, spacing} from '../styles/theme';
import {CheckCircle2} from 'lucide-react-native';

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

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={{padding: spacing.md, paddingTop: spacing.xl}}>
                <View style={{alignItems: 'center', marginBottom: spacing.lg}}>
                    <CheckCircle2 size={48} color={colors.primary}/>
                    <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.header, marginTop: spacing.sm}}>
                        Payment successful
                    </Text>
                    <Text style={{fontFamily: fonts.medium, fontSize: fontSizes.body, color: colors.inactive, marginTop: spacing.xs}}>
                        ${payment?.amount?.toFixed(2)} — {payment?.merchantName}
                    </Text>
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
                            <Text style={{fontFamily: fonts.regular, fontSize: fontSizes.small, color: colors.inactive, marginTop: spacing.xs}}>
                                {loop.justCompleted
                                    ? `Reward unlocked: ${loop.reward}`
                                    : `${remaining} more NETS payment${remaining === 1 ? '' : 's'} to unlock your reward`}
                            </Text>
                        </View>
                    );
                })}

                {loopResults.length === 0 && (
                    <Text style={{fontFamily: fonts.regular, fontSize: fontSizes.small, color: colors.inactive, marginBottom: spacing.md}}>
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