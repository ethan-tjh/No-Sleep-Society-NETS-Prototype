import React, {useState} from 'react';
import {Text, ScrollView, View, TouchableOpacity} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors, fonts, fontSizes, spacing} from '../styles/theme';
import {Bell} from 'lucide-react-native';
import {merchants} from '../data/mockMerchants';
import {useWallet} from '../context/WalletContext';

const Pay = ({navigation}) => {
    const {recordPayment} = useWallet();
    const [selectedMerchantId, setSelectedMerchantId] = useState(merchants[0].id);

    const handlePay = () => {
        const merchant = merchants.find((m) => m.id === selectedMerchantId);
        const payment = {
            paymentId: `txn_${Date.now()}`,
            merchantId: merchant.id,
            merchantName: merchant.name,
            merchantType: merchant.type,
            amount: 6.5,
            rail: 'nets_qr',
            timestamp: new Date().toISOString(),
            status: 'success',
        };
        const loopResults = recordPayment(payment);
        navigation.navigate('Receipt', {payment, loopResults});
    };

    return (
        <ScreenWrapper>
            <ScrollView>
                <View style={{paddingHorizontal: spacing.md, paddingTop: spacing.lg}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: 22}}/>
                        <Text style={{
                            flex: 1,
                            textAlign: 'center',
                            fontFamily: fonts.bold,
                            fontSize: fontSizes.header
                        }}>
                            Payment Page
                        </Text>
                        <TouchableOpacity>
                            <Bell size={22} color={colors.text}/>
                        </TouchableOpacity>
                    </View>

                    <Text style={{
                        fontFamily: fonts.semibold,
                        fontSize: fontSizes.body,
                        marginTop: spacing.lg,
                        marginBottom: spacing.sm,
                    }}>
                        Pay at
                    </Text>

                    {merchants.map((merchant) => {
                        const isSelected = merchant.id === selectedMerchantId;
                        return (
                            <TouchableOpacity
                                key={merchant.id}
                                onPress={() => setSelectedMerchantId(merchant.id)}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingVertical: spacing.md,
                                    paddingHorizontal: spacing.md,
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: isSelected ? colors.primary : colors.border,
                                    backgroundColor: isSelected ? '#fdeeee' : colors.background,
                                    marginBottom: spacing.sm,
                                }}
                            >
                                <Text style={{fontFamily: fonts.medium, fontSize: fontSizes.body}}>
                                    {merchant.name}
                                </Text>
                                <Text style={{fontFamily: fonts.regular, fontSize: fontSizes.small, color: colors.inactive}}>
                                    {merchant.type}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}

                    <TouchableOpacity
                        onPress={handlePay}
                        style={{
                            marginTop: spacing.lg,
                            backgroundColor: colors.primary,
                            paddingVertical: spacing.md,
                            borderRadius: 12,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{fontFamily: fonts.bold, fontSize: fontSizes.body, color: '#fff'}}>
                            Pay $6.50 with NETS QR
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};
export default Pay;