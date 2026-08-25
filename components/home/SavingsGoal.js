import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {fonts, fontSizes, spacing} from '../../styles/theme';

export default function SavingsGoal({title, saved, target, deadline}) {
    const percent = Math.round((saved/target * 100));
    const size = 70;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (percent / 100) * circumference;

    return (
        <View style={{marginHorizontal: spacing.md, marginTop: spacing.md, padding: spacing.md, borderRadius: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#F0F0F0'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm}}>
                <Text style={{fontFamily: fonts.semibold, fontSize: fontSizes.body}}>Savings Goal</Text>
                <Text style={{fontSize: fontSizes.small, color: '#3B82F6'}}>Edit Goal</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: size, height: size, justifyContent: 'center', alignItems: 'center'}}>
                    <Svg width={size} height={size}>
                        <Circle cx={size/2} cy={size/2} r={radius} stroke="#E5F7EA" strokeWidth={strokeWidth} fill="none"/>
                        <Circle
                            cx={size/2}
                            cy={size/2}
                            r={radius}
                            stroke="#22A559"
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={progressOffset}
                            strokeLinecap="round"
                            transform={`rotate(-90 ${size/2} ${size/2})`}
                        />
                    </Svg>
                    <Text style={{position: 'absolute', fontFamily: fonts.bold, fontSize: fontSizes.small}}>{percent}%</Text>
                </View>

                <View style={{flex: 1, marginLeft: spacing.md}}>
                    <Text style={{fontFamily: fonts.medium, fontSize: fontSizes.small}}>{title}</Text>
                    <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.body, color: '#22A559', marginTop: 2}}>
                        S${saved.toLocaleString()}
                    </Text>
                    <Text style={{fontSize: fontSizes.small, color: '#888'}}>of S${target.toLocaleString()}</Text>
                    <Text style={{fontSize: fontSizes.small, color: '#888', marginTop: 2}}>Target: {deadline}</Text>
                </View>
            </View>
        </View>
    );
}