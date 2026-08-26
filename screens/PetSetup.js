import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors, fonts, fontSizes, spacing} from '../styles/theme';
import {Dog, Cat, PawPrint} from 'lucide-react-native';
import {petSpecies, presetPetNames} from '../data/mockPets';
import {useWallet} from '../context/WalletContext';

const speciesIcons = {otter: PawPrint, dog: Dog, cat: Cat};

const PetSetup = ({navigation}) => {
    const {setPet} = useWallet();
    const [selectedSpecies, setSelectedSpecies] = useState(petSpecies[0].id);
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleNameChange = (text) => {
        setName(text);
        if (error) setError('');
    };

    const handleStart = () => {
        const trimmed = name.trim();
        if (!trimmed) {
            setError('Give your pet a name first');
            return;
        }
        setPet({name: trimmed, species: selectedSpecies});
        navigation.reset({index: 0, routes: [{name: 'MainTabs'}]});
    };

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={{padding: spacing.md, paddingTop: spacing.xl}}>
                <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.header, marginBottom: spacing.lg}}>
                    Choose your pet
                </Text>

                <View style={{flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg}}>
                    {petSpecies.map((species) => {
                        const isSelected = species.id === selectedSpecies;
                        const SpeciesIcon = speciesIcons[species.id];
                        return (
                            <TouchableOpacity
                                key={species.id}
                                onPress={() => setSelectedSpecies(species.id)}
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    paddingVertical: spacing.md,
                                    borderRadius: 12,
                                    borderWidth: isSelected ? 2 : 1,
                                    borderColor: isSelected ? colors.primary : colors.border,
                                    backgroundColor: isSelected ? '#fdeeee' : colors.background,
                                }}
                            >
                                <SpeciesIcon size={26} color={isSelected ? colors.primary : colors.inactive}/>
                                <Text style={{
                                    fontFamily: fonts.medium,
                                    fontSize: fontSizes.small,
                                    color: isSelected ? colors.primary : colors.inactive,
                                    marginTop: spacing.xs,
                                }}>
                                    {species.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <Text style={{fontFamily: fonts.semibold, fontSize: fontSizes.body, marginBottom: spacing.sm}}>
                    Name your pet
                </Text>
                <View style={{position: 'relative', marginBottom: spacing.xs}}>
                    <TextInput
                        value={name}
                        onChangeText={handleNameChange}
                        maxLength={20}
                        placeholder="e.g. Milo"
                        placeholderTextColor={colors.inactive}
                        style={{
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: 12,
                            paddingVertical: spacing.sm,
                            paddingHorizontal: spacing.md,
                            paddingRight: 50,
                            fontFamily: fonts.regular,
                            fontSize: fontSizes.body,
                        }}
                    />
                    <Text style={{
                        position: 'absolute',
                        right: spacing.md,
                        top: '50%',
                        marginTop: -8,
                        fontFamily: fonts.regular,
                        fontSize: fontSizes.small,
                        color: colors.inactive,
                    }}>
                        {name.length}/20
                    </Text>
                </View>

                {!!error && (
                    <Text style={{
                        fontFamily: fonts.regular,
                        fontSize: fontSizes.small,
                        color: '#D0342C',
                        marginBottom: spacing.sm,
                    }}>
                        {error}
                    </Text>
                )}

                <Text style={{
                    fontFamily: fonts.regular,
                    fontSize: fontSizes.small,
                    color: colors.inactive,
                    marginTop: spacing.sm,
                    marginBottom: spacing.sm,
                }}>
                    Or pick a name
                </Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.lg}}>
                    {presetPetNames.map((preset) => (
                        <TouchableOpacity
                            key={preset}
                            onPress={() => handleNameChange(preset)}
                            style={{
                                paddingVertical: spacing.xs,
                                paddingHorizontal: spacing.sm,
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: colors.border,
                            }}
                        >
                            <Text style={{fontFamily: fonts.regular, fontSize: fontSizes.small}}>
                                {preset}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    onPress={handleStart}
                    style={{
                        backgroundColor: colors.primary,
                        paddingVertical: spacing.md,
                        borderRadius: 12,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.body, color: '#fff'}}>
                        Start streak
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </ScreenWrapper>
    );
};
export default PetSetup;