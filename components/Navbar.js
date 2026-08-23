import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import NavbarStyle from "../styles/NavbarStyle";
import Icon from "../components/Icons";

export default function Navbar({state, descriptors, navigation}) {
    return (
        <View style={NavbarStyle.container}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label = options.tabBarLabel ?? options.title ?? route.name;
                const isFocused = state.index === index;

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

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={NavbarStyle.tabItem}
                        activeOpacity={0.7}
                    >
                        {/*<Icon name={} />*/}
                        <Text style={[NavbarStyle.label, isFocused && NavbarStyle.labelFocused]}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}