import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "./Home.js";
import Travel from "./Travel.js";
import TripCircle from "./TripCircle.js";
import Rewards from "./Rewards.js";
const Stack = createNativeStackNavigator();
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Travel" component{Travel}/>
                <Stack.Screen name="TripCircle" component{TripCircle}/>
                <Stack.Screen name="Rewards" component={Rewards}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation;