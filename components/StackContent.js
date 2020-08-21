import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyAccount from './MyAccount'
const Stack = createDrawerNavigator();
export default class StackContent extends React.Component{
    render(){
        return(
            <Stack.Navigator>
                <Stack.Screen name="MyAccount" component={MyAccount} />

                <Stack.Screen name="" component={MyAccount} />
            </Stack.Navigator>
            )
    }
}