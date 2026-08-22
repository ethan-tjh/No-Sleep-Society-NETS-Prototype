import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Navbar from './components/Navbar';
import Home from "./screens/Home.js";
import Travel from "./screens/Travel.js";
import TripCircle from "./screens/TripCircle.js";
import Rewards from "./screens/Rewards.js";

const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBar={(props) => <Navbar {...props} />}
                screenOptions={{headerShown: false}}
            >
                <Tab.Screen name="Home" component={Home} />
                {/*<Tab.Screen name="Travel" component={Travel} />*/}
                {/*<Tab.Screen name="TripCircle" component={TripCircle} />*/}
                <Tab.Screen name="Pay" />
                <Tab.Screen name="Scan" />
                <Tab.Screen name="Rewards" component={Rewards} />
                <Tab.Screen name="Profile" />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
export default Navigation;