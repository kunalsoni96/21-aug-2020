import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Galery from './Galery'
import About from './About'
import Profile from './Profile'
import ProductList from './ProductList';

import Icon from 'react-native-vector-icons/MaterialIcons'
import Payment from './Payment'
import { color } from 'react-native-reanimated';
const Tab = createBottomTabNavigator();
export default class MainTab extends React.Component {
    render(){
    return(
        <Tab.Navigator initialRouteName="Home" tabBarOptions={{
            inactiveBackgroundColor: 'white', activeBackgroundColor: "white"
        }}>
            <Tab.Screen name="Home" component={Profile} options={{
                tabBarLabel: 'Home',
                
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home" size={size} />
                ),
            }}  />
            <Tab.Screen name="About" component={About} options={{tabBarIcon:({color,size}) =>(
                <Icon name="info-outline" size={size} />
            )}}  />
            <Tab.Screen name="Products" component={ProductList} options={{tabBarIcon:({color,size})=>(
                <Icon name="shopping-cart" size={size} />
            )}} />
            <Tab.Screen name="Payment" options={{tabBarIcon:({color,size})=>(
                <Icon name="payment" size={size} />
            )}} component={Payment} />
            <Tab.Screen name="Gallery" component={Galery} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="photo-library" size={size} />
                )
            }} />
        </Tab.Navigator>
    );
}

}