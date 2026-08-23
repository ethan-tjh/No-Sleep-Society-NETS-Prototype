import {StyleSheet} from 'react-native';
import {colors, fontSizes, spacing, fonts} from './theme';

const NavbarStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: fontSizes.small,
        color: colors.text,
    },
    labelFocused: {
        color: '#000',
        fontWeight: '600',
    }
});
export default NavbarStyle;