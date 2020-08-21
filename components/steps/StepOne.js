import React, { Component } from "react";
import { Image, View, AsyncStorage, ScrollView, TouchableOpacity, Dimensions, StyleSheet, TextInput, Text } from "react-native";
import {Appbar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get('window');

export default class StepOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password_error:"",
            Email:"",
            Password:"",
            ConfirmPassword:"",
            Mobile:"",
            Verify:"",
            loader:""
        };
    }

    async componentDidMount() {
        const mobile = await AsyncStorage.getItem('mobile');
        this.setState({
            Mobile: mobile,
            loader: false,
        })
    }


    nextStep = () => {
        this.setState({
            loader: true,
        });
        if(this.state.Password===this.state.ConfirmPassword){
        fetch('https://ipmsmpcs.com/popcard/api/CreatePassword',{
            method:"POST",
            body:JSON.stringify({
                Mobile:this.state.Mobile,
                Email: this.state.Email,
                Password: this.state.Password,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
                loader: false,
            });
            this.props.navigation.navigate('StepTwo');
        })
    }

    else{
        this.setState({
            loader:false,
            password_error:"Password Not Match."
        })
    }
    };


    render() {
        console.log('propscheck :', this.props)
        const { currentStep, totalSteps } = this.state;
        return (
            <View style={styles.wrapper}>   
                <Spinner
                    visible={this.state.loader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />             
                <ScrollView horizontal={true} style={styles.steps} showsHorizontalScrollIndicator={false}>
                    <View style={{...styles.step, backgroundColor:"#080572", marginLeft:0}}>
                    <Text style={{...styles.steptext, color:"white"}}>1</Text>
                    </View>
                    
                    <View style={styles.border}></View>
                    <View style={styles.step}>
                        <Text style={styles.steptext}>2</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={styles.step}>
                        <Text style={styles.steptext}>3</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={styles.step}>
                        <Text style={styles.steptext}>4</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={styles.step}>
                        <Text style={styles.steptext}>5</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={styles.step}>
                        <Text style={styles.steptext}>6</Text>
                    </View>
                </ScrollView>
                <View>
                    <Text style={styles.header}>Create  </Text>
                </View>
                <View style={{ flex: 1}}>
                    <View style={{alignItems: "center"}}>
                <TextInput
                    value={this.state.Email}
                    placeholder={"Email"}
                    placeholderTextColor="#080572"
                    style={styles.input} onChangeText={(Email)=>this.setState({Email})}/>
                
                <TextInput
                    value={this.state.Password}
                    placeholder={"Create Password"}
                    secureTextEntry={true}
                    placeholderTextColor="#080572"
                        style={styles.input} onChangeText={(Password) => this.setState({ Password })}/>

                <TextInput
                        value={this.state.ConfirmPassword}
                        placeholder={"Confirm Password"}
                        secureTextEntry={true}
                        placeholderTextColor="#080572"
                        style={styles.input} 
                        onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })}
                        />
                        </View>
        <Text style={{ color: "red", fontWeight: "bold" }}>{this.state.password_error}</Text>
                    <View >
                        {this.state.Email.length > 7 && this.state.Password.length > 3 && this.state.ConfirmPassword.length > 3 ?
                            <TouchableOpacity style={{ ...styles.submitButton }} onPress={this.nextStep}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Next</Text>
                            </TouchableOpacity>
                            : <View style={styles.submitButton2} disabled><Text style={{ color: "gray", fontWeight: "bold" }}>Next</Text></View>}
                    </View>  
    </View>
                
            
</View>
  
        );
    }
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        height: 50,
        borderWidth: 1,
        borderColor: "#080572",
        paddingLeft: 10,
        width: "100%",
        borderRadius: 10,
        backgroundColor: "white",
    },

    wrapper: {
        paddingHorizontal: 30,
        backgroundColor: "white",
        flex: 1,
    },

    header:{
        fontWeight:"bold",
        fontSize: 25,
        color:"#080572",
        marginBottom:5,
        marginTop:10,
    },

    

    steps:{
        maxHeight:50,
        marginTop:20,
        alignSelf:"center"
    },

    step:{
        borderWidth:3,
        borderColor:"#080572",
        borderRadius:50,
        height:30,
        width:30,
        alignItems:"center",
        paddingTop:4,
    },

    steptext:{
        fontWeight:"bold",
        color:"#080572",
        fontSize:12,

    },

    border:{
        width:30,
        height:2,
        backgroundColor:"#080572",
        marginTop:14,
    },

    submitButton2: {
        width: "100%",
        textAlignVertical: "center",
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        height: 50,
        backgroundColor: "#F2F2F2",
    },

    submitButton: {
        backgroundColor: "#080572",
        borderRadius: 5,
        marginBottom: 20,
        minWidth: "100%",
        alignItems: "center",
        paddingTop: 15,
        height: 50,
        borderRadius: 10
    },
  
})