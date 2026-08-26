import React from 'react';
import {Image, View} from 'react-native';

const circleSizes = {1: 72, 2: 92, 3: 112, 4: 132, 5: 152};

// Every require() must be a static, literal path — a React Native bundler
// constraint, not a style choice. Add a line here if a new species is added.
const petImages = {
    otter: {
        1: require('../assets/pets/otter/otter_level_1.png'),
        2: require('../assets/pets/otter/otter_level_2.png'),
        3: require('../assets/pets/otter/otter_level_3.png'),
        4: require('../assets/pets/otter/otter_level_4.png'),
        5: require('../assets/pets/otter/otter_level_5.png'),
    },
    dog: {
        1: require('../assets/pets/dog/dog_level_1.png'),
        2: require('../assets/pets/dog/dog_level_2.png'),
        3: require('../assets/pets/dog/dog_level_3.png'),
        4: require('../assets/pets/dog/dog_level_4.png'),
        5: require('../assets/pets/dog/dog_level_5.png'),
    },
    cat: {
        1: require('../assets/pets/cat/cat_level_1.png'),
        2: require('../assets/pets/cat/cat_level_2.png'),
        3: require('../assets/pets/cat/cat_level_3.png'),
        4: require('../assets/pets/cat/cat_level_4.png'),
        5: require('../assets/pets/cat/cat_level_5.png'),
    },
};

export default function PetVisual({species, level, style, size}) {
    const circleSize = size || circleSizes[level] || circleSizes[1];
    const source = petImages[species]?.[level] || petImages.otter[1];

    return (
        <View
            style={[
                {
                    width: circleSize,
                    height: circleSize,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                style,
            ]}
        >
            <Image
                source={source}
                style={{width: circleSize, height: circleSize}}
                resizeMode="contain"
            />
        </View>
    );
}