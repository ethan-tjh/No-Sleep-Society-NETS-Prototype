import React, {useState, useEffect} from 'react';
import {StatusBar, Text, View, Image, ScrollView} from 'react-native';
import homeStyle from '../styles/HomeStyle';
const Home = ({navigation}) => {
    return (
        <ScrollView>
            <View>
                <Text style={homeStyle.header}>Smart Wallet</Text>
            </View>
            <View>

            </View>
        </ScrollView>
    );
};
export default Home;