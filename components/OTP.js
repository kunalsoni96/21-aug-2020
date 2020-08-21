import React from 'react';
import { View, AsyncStorage, Text, TextInput, Image, StyleSheet } from 'react-native';
import { Input, Button, Label } from 'native-base';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';

export default class OTP extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Mobile:'',
            OTP:'',
            invalid:"",
            spinner: false,
        }
        this.VerifyHandle = this.VerifyHandle.bind(this);
    }

    async componentDidMount(){
        const mobile = await AsyncStorage.getItem('mobile');
        this.setState({
            Mobile:mobile,
            spinner: false,
        })
    }

    VerifyHandle(){
        this.setState({
            spinner: true,
        });
        fetch('https://ipmsmpcs.com/popcard/api/Verify',{
            method:"POST",
            body:JSON.stringify({
                OTP:this.state.OTP,
                Mobile: this.state.Mobile
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
                spinner: false,
            });
            console.log(res)
            if(res.Status==='success'){
                this.props.navigation.navigate('Verify')
            }
            else{
                this.setState({
                    invalid:"Invalid OTP"
                })
            }
        })
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <Text style={{ marginBottom: 5, color:"#080572", marginTop:"20%" }}>OTP is sent to following no +91{this.state.Mobile}</Text>
                <Text style={{color:"#080572", fontWeight:"bold", fontSize:18,}}>Waiting for the OTP</Text>
                <TextInput keyboardType={'numeric'} placeholderTextColor="#080572" placeholder="Please Enter Your OTP" style={styles.input} value={this.state.OTP} onChangeText={(OTP)=>this.setState({OTP})} />
                <Text style={{ color: "red", textAlign:"left", fontWeight: "bold", marginLeft: 5, marginTop:2, marginBottom:30 }}>{this.state.invalid}</Text>
                <Ionicons name="av-timer" style={{fontSize:100, color:"#01267e", marginBottom:50}}/>
                <View style={styles.OTPwrapper}>
                <View style={{width:"60%", marginTop:2}}>
                <Text>Didn't recieve OTP?</Text>
                </View>
                    <View style={{ width: "40%" }}>
                    <Button style={styles.resend}><Text >Resend</Text></Button>
                </View>
                </View>
                {this.state.OTP.length === 6 || this.state.OTP.length === 5 || this.state.OTP.length === 4 ?
                    <Button style={styles.submitButton} onPress={this.VerifyHandle}><Text style={{ color: "white", fontWeight: "bold" }}>Verify</Text></Button>
                    : <View style={styles.submitButton2} disabled><Text style={{ color: "gray", fontWeight: "bold", alignSelf:"center" }}>Verify</Text></View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Image: {
        width: 50,
        height: 50,
        marginTop: "10%",
        marginBottom: "10%"
    },

    OTPwrapper:{
        flexDirection:"row",
        borderTopWidth:1,
        borderBottomWidth:1,
        flex:1,
        borderBottomColor:"#e6e6e6",
        borderTopColor: "#e6e6e6",
        paddingVertical:10
    },

    

    wrapper: {
        alignItems: "center",
        paddingHorizontal: 30,
        backgroundColor: "white",
        flex: 1,

    },

    input: {
        height: 50,
        marginTop:50,
        borderWidth: 1,
        borderColor: "#080572",
        paddingLeft: 10,
        width: "100%",
        borderRadius: 10,
        backgroundColor: "white",
    },

    resend:{
        backgroundColor:"white",
        borderWidth:1,
        height:30,
        borderColor:"#e6e6e6",
        justifyContent:"center",
        width:100
    },

    submitButton: {
        width: "100%",
        textAlignVertical: "center",
        justifyContent: "center",
        height: 50,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: "#080572",
   
    },

    submitButton2: {
        width: "100%",
        textAlignVertical: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 10,
        backgroundColor: "#F2F2F2",
        marginBottom:20,
        
    }
});