import {StyleSheet} from 'react-native';

const NavbarStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        color: '000000E2',
    },
    labelFocused: {
        color: '#000',
        fontWeight: '600',
    }
});
export default NavbarStyle;