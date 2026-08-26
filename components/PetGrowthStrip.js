import React from 'react';
import {View} from 'react-native';
import {colors} from '../styles/theme';
import {petLevelThresholds} from '../data/mockPetLevels';

const dotSizes = {1: 18, 2: 24, 3: 32, 4: 40, 5: 48};
const compactDotSizes = {1: 8, 2: 10, 3: 12, 4: 14, 5: 16};

export default function PetGrowthStrip({currentLevel, compact = false}) {
    const sizes = compact ? compactDotSizes : dotSizes;
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: compact ? 4 : 10}}>
            {petLevelThresholds.map(({level}) => {
                const size = sizes[level];
                const isCurrent = level === currentLevel;
                const isReached = level <= currentLevel;
                return (
                    <View
                        key={level}
                        style={{
                            width: size,
                            height: size,
                            borderRadius: size / 2,
                            backgroundColor: isReached ? colors.primary : colors.background,
                            borderWidth: isCurrent ? 3 : 2,
                            borderColor: isReached ? colors.primary : colors.inactive,
                        }}
                    />
                );
            })}
        </View>
    );
}