import React, {useState, useEffect} from 'react';
import {StatusBar, Text, ScrollView, Image, View, TouchableOpacity} from 'react-native';
import ScreenWrapper from  '../components/screenWrapper';
import {colors, fonts, fontSizes, spacing} from "../styles/theme";
import {Bell} from "lucide-react-native";

const Pay = ({navigation}) => {
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
                            <Bell size={22} color={colors.text} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};
export default Pay;