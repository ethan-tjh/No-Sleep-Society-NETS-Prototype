import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import NavbarStyle from "../styles/NavbarStyle";
import Icon from "../components/Icons";
import {colors} from "../styles/theme";

const icons = {
    Home: 'House',
    Pay: 'ScanLine',
    Scan: 'QrCode',
    Rewards: 'Gift',
    Profile: 'UserRound',
};

export default function Navbar({state, descriptors, navigation}) {
    return (
        <View style={NavbarStyle.container}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label = options.tabBarLabel ?? options.title ?? route.name;
                const isFocused = state.index === index;
                const isScanTab = route.name === 'Scan';

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const iconColor = isScanTab
                    ? '#fff'
                    : (isFocused ? colors.primary: colors.inactive);

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={NavbarStyle.tabItem}
                        activeOpacity={0.7}
                    >
                        <View style={[
                            NavbarStyle.iconWrapper,
                            isScanTab && NavbarStyle.iconWrapperActive,
                        ]}>
                            <Icon name={icons[route.name]} color={iconColor}/>
                            <Text style={[
                                NavbarStyle.label,
                                isScanTab ? {color: '#fff', fontWeight: '600'} : (isFocused && NavbarStyle.labelFocusedPlain),
                            ]}>
                                {label}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}