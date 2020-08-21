import React, { useEffect, useState } from 'react';
import { View, AsyncStorage, TouchableOpacity, Text, TextInput, Image, StyleSheet } from 'react-native';
import { Input, Button, Label } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from './AuthContext'


const Login = (props) => {
    const [Mobile, SetMobile] = useState('');
    const [Password, SetPassword] = useState('');
    const [ConfirmPassword, SetConfirmPassword] = useState('');

    const [invalid, Setinvalid] = useState();
    const [loader, Setloader] = useState(false);



    const { SignIn } = React.useContext(AuthContext);

    const submithandle = () => {
        Setloader(true);
        if(Password===ConfirmPassword){
        fetch('https://ipmsmpcs.com/popcard/api/ResetPassword', {
            method: "POST",
            body: JSON.stringify({
                Mobile: Mobile,
                Password: Password,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((response) => {
                Setloader(false)
                if (response.Status == 1) {
                    AsyncStorage.setItem('login', 'verified')
                    SignIn();
                }
                else {

                    Setinvalid('Mobile or Password is Incorrect!')
                }
            })

            .catch(error => {
                console.log(error);
            });
        }

        else{
            Setinvalid('Password Not Match!')
        }
    }



    return (
        <View style={styles.wrapper}>

            <Spinner
                visible={loader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <Image style={styles.Image} source={require('./../assets/images/start.png')} />
            <View style={{ width: "100%", flex: 1 }}>
                <Text style={{ marginBottom: 10 }}>Create New Password</Text>
                <TextInput placeholderTextColor="#080572" placeholder="*******" secureTextEntry={true} value={Password} onChangeText={(Password) => SetConfirmPassword({Password})} style={styles.input} />
                <Text style={{ marginBottom: 10 }}>Enter Your Password</Text>
                <TextInput placeholderTextColor="#080572" placeholder="*******" secureTextEntry={true} value={ConfirmPassword} onChangeText={(ConfirmPassword) => SetPassword(ConfirmPassword)} style={styles.input} />

                <View style={{ width: "100%", marginBottom: 20 }}>
                    <Text style={{ marginLeft: 5, marginBottom: 10, color: "red", fontWeight: "bold" }}>{invalid}</Text>
                    {Password !== '' && ConfirmPassword !== '' ?
                        <Button style={styles.submitButton} onPress={() => submithandle()}><Text style={{ color: "white", fontWeight: "bold" }}>Reset Password</Text></Button>
                        : <View style={styles.submitButton2} disabled><Text style={{ color: "gray", fontWeight: "bold" }}>Reset Password</Text></View>}

                </View>
                <View style={{ marginBottom: 25, marginTop: 3, flexDirection: "row", alignSelf: "center" }}>
                    <Text>Remember Password ?</Text><TouchableOpacity onPress={() => props.navigation.navigate('Login')}><Text style={{ color: "#080572" }}> Click Here</Text></TouchableOpacity>
                </View>
            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    Image: {
        width: "100%",
        height: 170,
        marginTop: "20%",
        marginBottom: "10%"
    },


    wrapper: {
        alignItems: "center",
        paddingHorizontal: 30,
        backgroundColor: "white",
        flex: 1,

    },

    input: {
        marginBottom: 2,
        height: 50,
        fontWeight: "bold",
        borderWidth: 1,
        borderColor: "#080572",
        paddingLeft: 10,
        width: "100%",
        borderRadius: 10,
        backgroundColor: "white",
    },

    submitButton: {
        width: "100%",
        textAlignVertical: "center",
        justifyContent: "center",
        borderRadius: 10,
        height: 50,
        backgroundColor: "#080572",

    },

    submitButton2: {
        width: "100%",
        textAlignVertical: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        height: 50,
        backgroundColor: "#F2F2F2",
    }
});

export default Login


