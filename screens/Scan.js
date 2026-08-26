import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors, fonts, fontSizes, spacing} from '../styles/theme';
import {QrCode} from 'lucide-react-native';
import {merchants} from '../data/mockMerchants';
import {currentUserToken} from '../data/mockUser';
import {useWallet} from '../context/WalletContext';

const Scan = ({navigation}) => {
    const {recordPayment} = useWallet();

    const handleScan = (merchant) => {
        const payment = {
            paymentId: `txn_${Date.now()}`,
            userToken: currentUserToken,
            merchantId: merchant.id,
            merchantName: merchant.name,
            merchantType: merchant.type,
            amount: 5.5,
            rail: 'nets_qr',
            timestamp: new Date().toISOString(),
            status: 'success',
        };
        const loopResults = recordPayment(payment);
        navigation.navigate('Receipt', {payment, loopResults});
    };

    return (
        <ScreenWrapper>
            <View style={{padding: spacing.md, alignItems: 'center'}}>
                <QrCode size={64} color={colors.primary} style={{marginTop: spacing.xl, marginBottom: spacing.lg}}/>
                <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.header, marginBottom: spacing.sm}}>
                    Scan NETS QR
                </Text>
                <Text style={{
                    fontFamily: fonts.regular,
                    fontSize: fontSizes.body,
                    color: colors.inactive,
                    textAlign: 'center',
                    marginBottom: spacing.lg,
                }}>
                    Simulate scanning a participating merchant's QR code
                </Text>

                {merchants.map((merchant) => (
                    <TouchableOpacity
                        key={merchant.id}
                        onPress={() => handleScan(merchant)}
                        style={{
                            width: '100%',
                            paddingVertical: spacing.md,
                            paddingHorizontal: spacing.md,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: colors.border,
                            marginBottom: spacing.sm,
                        }}
                    >
                        <Text style={{fontFamily: fonts.medium, fontSize: fontSizes.body}}>
                            {merchant.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScreenWrapper>
    );
};
export default Scan;