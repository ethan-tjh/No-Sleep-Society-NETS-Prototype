import React, {useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors, fonts, fontSizes, spacing} from '../styles/theme';
import {User, CreditCard, Bell, Shield, CircleHelp, LogOut, ChevronRight, Pencil, Dog, Cat, PawPrint} from 'lucide-react-native';
import {useWallet} from '../context/WalletContext';
import PetVisual from '../components/PetVisual';
import {petSpecies} from '../data/mockPets';

const speciesIcons = {otter: PawPrint, dog: Dog, cat: Cat};
const speciesColors = {otter: '#D0342C', dog: '#2e7d32', cat: '#1565c0'};
const speciesBgColors = {otter: '#fdeeee', dog: '#d5efdd', cat: '#e3f2fd'};

const ProfileMenuItem = ({icon: Icon, label, onPress}) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        }}
    >
        <View style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: '#f5f5f5',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
        }}>
            <Icon size={18} color={colors.text}/>
        </View>
        <Text style={{flex: 1, fontFamily: fonts.medium, fontSize: fontSizes.body}}>
            {label}
        </Text>
        <ChevronRight size={18} color={colors.inactive}/>
    </TouchableOpacity>
);

const Profile = ({navigation}) => {
    const {petName, petSpecies: currentSpecies, petLevelInfo, setPet} = useWallet();
    const [isEditingPet, setIsEditingPet] = useState(false);
    const [editName, setEditName] = useState(petName || '');
    const [editSpecies, setEditSpecies] = useState(currentSpecies || petSpecies[0].id);

    const handleEditPet = () => {
        setEditName(petName || '');
        setEditSpecies(currentSpecies || petSpecies[0].id);
        setIsEditingPet(true);
    };

    const handleSavePet = () => {
        const trimmed = editName.trim();
        if (!trimmed) return;
        setPet({name: trimmed, species: editSpecies});
        setIsEditingPet(false);
    };

    const handleCancelEdit = () => {
        setIsEditingPet(false);
    };

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={{padding: spacing.md, paddingTop: spacing.lg}}>
                {/* Header */}
                <Text style={{
                    fontFamily: fonts.bold,
                    fontSize: fontSizes.header,
                    textAlign: 'center',
                    marginBottom: spacing.lg,
                }}>
                    Profile: Alex
                </Text>

                {/* Avatar */}
                <View style={{alignItems: 'center', marginBottom: spacing.lg}}>
                    <View style={{
                        width: 160,
                        height: 160,
                        borderRadius: 99,
                        backgroundColor: '#f5f5f5',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}>
                        {currentSpecies ? (
                            <PetVisual species={currentSpecies} level={petLevelInfo.level} size={120}/>
                        ) : (
                            <User size={36} color={colors.inactive}/>
                        )}
                    </View>
                </View>

                {/* Pet companion card */}
                {petName && !isEditingPet && (
                    <View style={{
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        backgroundColor: '#fdeeee',
                        padding: spacing.md,
                        marginBottom: spacing.lg,
                    }}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{fontFamily: fonts.semibold, fontSize: fontSizes.body}}>
                                My Companion
                            </Text>
                            <TouchableOpacity onPress={handleEditPet}>
                                <Pencil size={16} color={colors.primary}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={{
                            fontFamily: fonts.regular,
                            fontSize: fontSizes.small,
                            color: colors.inactive,
                            marginTop: spacing.xs,
                        }}>
                            {petName} the {currentSpecies} — Level {petLevelInfo.level}
                        </Text>
                    </View>
                )}

                {/* Pet edit card */}
                {isEditingPet && (
                    <View style={{
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        padding: spacing.md,
                        marginBottom: spacing.lg,
                    }}>
                        <Text style={{fontFamily: fonts.semibold, fontSize: fontSizes.body, marginBottom: spacing.sm}}>
                            Edit Companion
                        </Text>

                        {/* Species selector */}
                        <Text style={{
                            fontFamily: fonts.medium,
                            fontSize: fontSizes.small,
                            color: colors.inactive,
                            marginBottom: spacing.xs,
                        }}>
                            Species
                        </Text>
                        <View style={{flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md}}>
                            {petSpecies.map((species) => {
                                const isSelected = species.id === editSpecies;
                                const SpeciesIcon = speciesIcons[species.id];
                                const selectedColor = speciesColors[species.id];
                                const selectedBg = speciesBgColors[species.id];
                                return (
                                    <TouchableOpacity
                                        key={species.id}
                                        onPress={() => setEditSpecies(species.id)}
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            paddingVertical: spacing.sm,
                                            borderRadius: 12,
                                            borderWidth: isSelected ? 2 : 1,
                                            borderColor: isSelected ? selectedColor : colors.border,
                                            backgroundColor: isSelected ? selectedBg : colors.background,
                                        }}
                                    >
                                        <SpeciesIcon size={20} color={isSelected ? selectedColor : colors.inactive}/>
                                        <Text style={{
                                            fontFamily: fonts.medium,
                                            fontSize: fontSizes.small,
                                            color: isSelected ? selectedColor : colors.inactive,
                                            marginTop: spacing.xs,
                                        }}>
                                            {species.label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Name input */}
                        <Text style={{
                            fontFamily: fonts.medium,
                            fontSize: fontSizes.small,
                            color: colors.inactive,
                            marginBottom: spacing.xs,
                        }}>
                            Name
                        </Text>
                        <TextInput
                            value={editName}
                            onChangeText={setEditName}
                            maxLength={20}
                            placeholder="Pet name"
                            placeholderTextColor={colors.inactive}
                            style={{
                                borderWidth: 1,
                                borderColor: colors.border,
                                borderRadius: 12,
                                paddingVertical: spacing.sm,
                                paddingHorizontal: spacing.md,
                                fontFamily: fonts.regular,
                                fontSize: fontSizes.body,
                                marginBottom: spacing.md,
                            }}
                        />

                        {/* Save / Cancel buttons */}
                        <View style={{flexDirection: 'row', gap: spacing.sm}}>
                            <TouchableOpacity
                                onPress={handleCancelEdit}
                                style={{
                                    flex: 1,
                                    paddingVertical: spacing.sm,
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: colors.border,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{fontFamily: fonts.medium, fontSize: fontSizes.body, color: colors.inactive}}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSavePet}
                                style={{
                                    flex: 1,
                                    paddingVertical: spacing.sm,
                                    borderRadius: 12,
                                    backgroundColor: colors.primary,
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.body, color: '#fff'}}>
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Menu items */}
                <View style={{marginBottom: spacing.lg}}>
                    <ProfileMenuItem icon={User} label="Personal Details"/>
                    <ProfileMenuItem icon={CreditCard} label="Linked Accounts"/>
                    <ProfileMenuItem icon={Bell} label="Notifications"/>
                    <ProfileMenuItem icon={Shield} label="Security & Privacy"/>
                    <ProfileMenuItem icon={CircleHelp} label="Help & Support"/>
                </View>

                {/* Logout */}
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: spacing.md,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        marginBottom: spacing.xl,
                    }}
                >
                    <LogOut size={18} color={colors.primary}/>
                    <Text style={{
                        fontFamily: fonts.semibold,
                        fontSize: fontSizes.body,
                        color: colors.primary,
                        marginLeft: spacing.sm,
                    }}>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </ScreenWrapper>
    );
};

export default Profile;
