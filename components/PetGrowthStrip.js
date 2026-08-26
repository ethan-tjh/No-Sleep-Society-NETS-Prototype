import React from 'react';
import {View} from 'react-native';
import {colors} from '../styles/theme';
import {petLevelThresholds} from '../data/mockPetLevels';

const dotSizes = {1: 18, 2: 24, 3: 32, 4: 40, 5: 48};

export default function PetGrowthStrip({currentLevel}) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 10}}>
            {petLevelThresholds.map(({level}) => {
                const size = dotSizes[level];
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
                            borderWidth: isCurrent ? 2 : 1,
                            borderColor: isReached ? colors.primary : colors.border,
                        }}
                    />
                );
            })}
        </View>
    );
}