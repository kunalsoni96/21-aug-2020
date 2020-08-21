import React, { Component } from 'react';
import {
    Platform, StyleSheet, View, Text,
    Image, TouchableOpacity, Alert
} from 'react-native';
export default class Splash extends Component
{
    constructor() {
        super();
        this.state = {
            isVisible: true,
        }
    }
    Hide_Splash_Screen = () => {
        this.setState({
            isVisible: false
        });
    }

    componentDidMount() {
        var that = this;
        setTimeout(function () {
            that.Hide_Splash_Screen();
        }, 5000);
    }

    render() {
        if (this.state.isVisible === true){
        return (
            <View style={styles.MainContainer}>
                <View style={styles.SplashScreen_RootView}>
                    <View style={styles.SplashScreen_ChildView}>
                        <Image source={require('./../assets/images/Splash_1.png')} />
                    </View>
                </View>
            </View>
        );
    }
        else {
            return(
                <Text style={{ textAlign: 'center' }}> {this.props.navigation.navigate('IntroSlider')}</Text>
            );
        }
}
    
}
const styles = StyleSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: (Platform.OS === 'ios') ? 20 : 0
        },

        SplashScreen_RootView:
        {
            justifyContent: 'center',
            flex: 1,
            margin: 10,
            position: 'absolute',
            
            
        },

        SplashScreen_ChildView:
        {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00BCD4',
            flex: 1,
        },
    });  