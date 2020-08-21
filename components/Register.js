import React from 'react';
import { View, AsyncStorage, Dimensions, TouchableOpacity, Text, TextInput, Image, StyleSheet } from 'react-native';
import {Input, Button, Label} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

const mobileheight = Dimensions.get('window').height;


export default class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Mobile:"",
            spinner:false
        }           
        this.submithandle = this.submithandle.bind(this)
    }

    componentDidMount() {
            this.setState({
                spinner: false,
            });
    }

    submithandle(e){   
        e.preventDefault();
            this.setState({
                spinner: true,
            });
        
        fetch('https://ipmsmpcs.com/popcard/api/Register',{
            method:"POST",
            body: JSON.stringify({
                Mobile: this.state.Mobile,
                exists:""
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                spinner: false,
            });
            if(res.Status==='success'){
                AsyncStorage.setItem('mobile',res.Mobile)
                AsyncStorage.setItem('olduser', 'olduser')
                this.props.navigation.navigate('OTP')
                console.log('succe');
            }
            else{
            this.setState({
                exists:"Mobile Number Already Exists!"
            })       
            }
        })
            
        .catch(error => {
            console.log(error);
        });
    }
  



    render() {
        return (
            <View style={styles.wrapper}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <Image style={styles.Image} source={require('./../assets/images/start.png')} />
            <View style={{width:"100%"}}>                
                    <Text style={{ marginBottom: 10 }}>Enter Your Mobile Number</Text>
                    <TextInput keyboardType={'numeric'} placeholderTextColor="#080572" placeholder="98XXXXXXXX" value={this.state.Mobile} onChangeText={(Mobile) => this.setState({ Mobile })} style={styles.input} />
                    <Text style={{ color: "red", fontWeight: "bold", marginLeft: 5 }}>{this.state.exists}</Text>
            </View>
                <View style={{ width: "100%" }}>
                    {this.state.Mobile.length === 10 ?
                        <Button style={styles.submitButton} onPress={this.submithandle}><Text style={{ color: "white", fontWeight: "bold" }}>Register & Next</Text></Button>
                        : <View style={styles.submitButton2} disabled><Text style={{ color: "gray", fontWeight: "bold" }}>Register & Next</Text></View>  }
                    
                </View>
                <View style={{ marginBottom: 25, marginTop: 3, flexDirection:"row" }}>
                <Text>already registered?</Text><TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}><Text style={{color:"#080572"}}> Login Here</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Image:{
        width:"100%",
         height:170,
         marginTop:"20%",
         marginBottom:"10%"
    }, 


    wrapper:{
        alignItems:"center",
        paddingHorizontal:30,
        backgroundColor:"white",
        flex:1,
        
    },

    input:{
        marginBottom:2,
        height:50,
        fontWeight:"bold",
        borderWidth:1,
        borderColor:"#080572",
        paddingLeft:10,
        width:"100%",
        borderRadius:10,
        backgroundColor:"white",
    },

    submitButton:{
        width:"100%",
        textAlignVertical:"center",
        justifyContent:"center",
        borderRadius:10,
        height:50,
        backgroundColor:"#080572",
        
    },

    submitButton2: {
        width: "100%",
        textAlignVertical: "center",
        alignItems:"center",
        justifyContent: "center",
        borderRadius: 10,
        height: 50,
        backgroundColor: "#F2F2F2",
    }
});

