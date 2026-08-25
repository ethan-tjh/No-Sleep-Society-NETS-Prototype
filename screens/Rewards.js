import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors, fonts, fontSizes, spacing} from '../styles/theme';
import {useWallet} from '../context/WalletContext';

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
    const {loopDefinitions, loopProgress} = useWallet();

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={{padding: spacing.md, paddingTop: spacing.lg}}>
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