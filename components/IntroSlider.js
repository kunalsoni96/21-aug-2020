/*This is an example of React Native App Intro Slider */
import React from 'react';
//import react in project
import { StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';
//import all the required component
import AppIntroSlider from 'react-native-app-intro-slider';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Register from './Register';
import { Button } from 'native-base';


export default class IntroSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showRealApp: false,
            //To show the main page of the app
            olduser:""
        };
    }

    async componentDidMount(){
        const olduser = await AsyncStorage.getItem('olduser');
        this.setState({
            olduser: olduser
        })
    }



    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="arrow-forward"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{ backgroundColor: 'transparent' }}
                />
            </View>
        );
    };
    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="verified-user"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{ backgroundColor: 'transparent' }}
                />
            </View>
        );
    };
    _onDone = () => {
        this.setState({ showRealApp: true });
    };
    _onSkip = () => {
        this.setState({ showRealApp: true });
    };
    _renderItem = ({ item }) => {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: item.backgroundColor,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingBottom: 100
                }}>
                <Text style={styles.title}>{item.title}</Text>
                <Image style={styles.image} source={item.image} />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    };
    render() {
        if(this.state.olduser==='olduser'){
            return(
            <View>{this.props.navigation.navigate('Register')}</View>
            )
        }
        else{
        if (this.state.showRealApp) {
            //Real Application
            return(
                <View>{this.props.navigation.navigate('Register')}</View>
            )
        } else {
            //Intro slides
            return (
                <AppIntroSlider
                    data={slides}
                    renderItem={this._renderItem}
                    onDone={this._onDone}
                    showSkipButton={true}
                    onSkip={this._onSkip}
                    renderDoneButton={this._renderDoneButton}
                    renderNextButton={this._renderNextButton}
                      
                />
            );
        }
    }
}
}
const styles = StyleSheet.create({
    image: {
        width: "100%",
        marginTop:50,
        height:"50%"
        
    },
    text: {
        fontSize: 18,
        color: '#03076E',
        textAlign: 'center',
        paddingVertical: 30,
        
    },
    title: {
        fontSize: 32,
        color: '#03076E',
        textAlign: 'center',
        marginBottom: 16,
        marginTop:80,
        fontWeight: "bold"
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: '#03076E',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const slides = [
    {
        key: 's1',
        text: 'Register and get started',
        color: 'blue',
        title: 'Register',
        image: require('.././assets/images/Splash-Screen_1.png'),
        backgroundColor: 'white',
    },
    {
        key: 's2',
        color:'blue',
        title: 'Create',
        text: 'Create your card',
        image: require('.././assets/images/Splash-Screen_2.png'),
        backgroundColor: 'white',
    },
    {
        key: 's3',
        title: 'Share',
        text: 'Share you card with Business Client',
        color: 'blue',
        image: require('.././assets/images/Splash-Screen_3.png'),
        backgroundColor: 'white',
    },

];