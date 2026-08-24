import React from 'react';
import * as LucideIcons from "lucide-react-native";
import {colors} from '../styles/theme';

export default function Icon({name, size = 24, color = colors.inactive}) {
    const LucideIcon = LucideIcons[name];
    if (!LucideIcon) return null;

    return (
        <LucideIcon size={size} color={color} />
    );
}