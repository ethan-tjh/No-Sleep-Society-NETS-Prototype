import React from 'react';
import {View} from 'react-native';
import {Dog, Cat, PawPrint} from 'lucide-react-native';
import {colors} from '../styles/theme';

// SWAP POINT: once the team's real illustrations (5 sizes x species) exist,
// replace the placeholder icon below with:
//   <Image source={petImages[species][level]} style={{width: circleSize, height: circleSize}} resizeMode="contain" />
// Nothing calling <PetVisual /> needs to change.

const speciesIcons = {otter: PawPrint, dog: Dog, cat: Cat};
const circleSizes = {1: 72, 2: 92, 3: 112, 4: 132, 5: 152};
const ICON_RATIO = 0.5;

export default function PetVisual({species, level, style}) {
    const SpeciesIcon = speciesIcons[species] || PawPrint;
    const circleSize = circleSizes[level] || circleSizes[1];
    const iconSize = Math.round(circleSize * ICON_RATIO);

    return (
        <View
            style={[
                {
                    width: circleSize,
                    height: circleSize,
                    borderRadius: circleSize / 2,
                    backgroundColor: '#fdeeee',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                style,
            ]}
        >
            <SpeciesIcon size={iconSize} color={colors.primary}/>
        </View>
    );
}