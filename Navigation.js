import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Navbar from './components/Navbar';
import Home from "./screens/Home.js";
import Pay from "./screens/Pay.js";
import Scan from "./screens/Scan.js";
import Rewards from "./screens/Rewards.js";
import Profile from "./screens/Profile.js";
import Receipt from "./screens/Receipt.js";
import PetSetup from "./screens/PetSetup.js";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <Navbar {...props} />}
            screenOptions={{headerShown: false}}
        >
            <Tab.Screen name="Home" component={Home} />
            {/*<Tab.Screen name="Travel" component={Travel} />*/}
            {/*<Tab.Screen name="TripCircle" component={TripCircle} />*/}
            <Tab.Screen name="Pay" component={Pay}/>
            <Tab.Screen name="Scan" component={Scan}/>
            <Tab.Screen name="Rewards" component={Rewards} />
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    );
};

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{headerShown: false}}
                initialRouteName="MainTabs"
            >
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="PetSetup" component={PetSetup} />
                <Stack.Screen
                    name="Receipt"
                    component={Receipt}
                    options={{presentation: 'modal'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation;