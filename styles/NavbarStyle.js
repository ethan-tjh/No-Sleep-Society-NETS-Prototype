import {StyleSheet} from 'react-native';
import {colors, fontSizes, spacing, fonts} from './theme';

const NavbarStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: spacing.md,
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.xs,
    },
    iconWrapper: {
        padding: spacing.sm,
        borderRadius: 999,
    },
    iconWrapperActive: {
      backgroundColor: colors.primary,
    },
    label: {
        fontSize: fontSizes.small,
        color: colors.text,
    },
    labelFocused: {
        color: '#fff',
        fontWeight: '600',
    },
});
export default NavbarStyle;