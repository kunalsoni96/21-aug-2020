import React, { useState, useEffect } from "react";
import { Image, Text,  View, Picker, Dimensions, AsyncStorage, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Card } from 'react-native-paper';
import { PricingCard } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import Spinner from 'react-native-loading-spinner-overlay';
import Login from "../Login";
import RazorpayCheckout from 'react-native-razorpay';
import { AuthContext } from '.././AuthContext'

const { width, height } = Dimensions.get('window');
const StepSix = () => {
    const { SignIn } = React.useContext(AuthContext);  
    const [Mobile, SetMobile] = useState('');

    useEffect(()=>{
        mobile();
    })

    const mobile = async() =>{
        mobil = await AsyncStorage.getItem('mobile');
        SetMobile(mobil)
    }


   
        return (
            <View style={styles.wrapper}>
                
                <ScrollView horizontal={true} style={styles.steps} showsHorizontalScrollIndicator={false}>
                    <View style={styles.step}>
                        <Text style={styles.steptext}>1</Text>
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
                    <View style={{ ...styles.step, backgroundColor: "#080572", marginLeft: 0 }}>
                        <Text style={{ ...styles.steptext, color: "white" }}>6</Text>
                    </View>
                </ScrollView>
                {/* <TouchableOpacity onPress={this.login}><Text>hello</Text></TouchableOpacity> */}
                <View style={{alignItems:"center"}}>
                    <Text style={styles.header}>Please Select Your Plan</Text>
                    
                </View>
                
                <ScrollView showsVerticalScrollIndicator={false}> 
                
                    <Card style={{ width: "90%", alignSelf: "center", marginTop: 20, paddingBottom: 20 }}>
                        <View style={{ borderColor: "#e6e6e6", borderBottomWidth: 1 }}>
                            <Text style={{ fontWeight: "bold", alignSelf: "center", paddingTop: 10, fontSize: 30, paddingBottom: 5 }}>Starter Plan</Text>
                        </View>
                        <View style={{ paddingTop: 20 }}>
                            <Text style={{ alignSelf: "center", fontSize: 16, marginBottom: 15, color: "gray" }}>Free Template </Text>
                            <Text style={{ alignSelf: "center", fontSize: 16, marginBottom: 15, color: "gray" }}>Unlimitted Sharing On Social Media </Text>

                            <Text style={{ alignSelf: "center", fontSize: 16, marginBottom: 15, color: "gray" }}>Location & Address Features </Text>
                            <Text style={{ alignSelf: "center", fontSize: 16, marginBottom: 15, color: "gray" }}>Other Releated Features </Text>
                            <TouchableOpacity onPress={() => {
                                var options = {
                                    description: 'Credits towards consultation',
                                    image: 'https://i.imgur.com/3g7nmJC.png',
                                    currency: 'INR',
                                    key: 'rzp_test_wHJx64AAevdTiq', // Your api key
                                    amount: '10000',
                                    name: 'POPCARD',
                                    prefill: {
                                        email: 'void@razorpay.com',
                                        contact: '9191919191',
                                        name: 'Razorpay Software'
                                    },
                                    theme: { color: '#F37254' }
                                }
                                RazorpayCheckout.open(options).then((data) => {
                                    // handle success
                                    alert(`Success: ${data.razorpay_payment_id}`);

                                    fetch('https://ipmsmpcs.com/popcard/api/StarterPlan', {
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        method: "POST",
                                        body: JSON.stringify({
                                            PaymentId: data.razorpay_payment_id,
                                            Mobile: Mobile
                                        })
                                    })
                                        .then((res) => res.json())
                                        .then((res) => {
                                            AsyncStorage.setItem('login', 'verified');
                                            SignIn();
                                        })
                                    
                                }).catch((error) => {
                                    // handle failure
                                    alert(`Error: ${error.code} | ${error.description}`);
                                });
                            }} style={{ backgroundColor: "#080572", alignSelf: "center", width: 200, height: 50, borderRadius: 10, }}>
                                <Text style={{ color: "white", fontWeight: "bold", marginTop: 13, alignSelf: "center" }}>Purchase Now</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>

                    <Card style={{ width: "90%", alignSelf: "center", marginTop: 20, paddingBottom: 20 }}>
                        <View style={{ borderColor: "#e6e6e6", borderBottomWidth: 1 }}>
                            <Text style={{ fontWeight: "bold", alignSelf: "center", paddingTop: 10, fontSize: 30, paddingBottom: 5 }}>Pro Plan</Text>
                        </View>
                        <View style={{ paddingTop: 20 }}>
                            <Text style={{ alignSelf: "center", fontSize: 16, marginBottom: 15, color: "gray" }}>Free Template </Text>
                            <Text style={{ alignSelf: "center", fontSize: 16, marginBottom: 15, color: "gray" }}>Unlimitted Sharing On Social Media </Text>

                            <Text style={{ alignSelf: "center", fontSize: 16, marginBottom: 15, color: "gray" }}>Location & Address Features </Text>
                            <Text style={{ alignSelf: "center", fontSize: 16, marginBottom: 15, color: "gray" }}>Other Releated Features </Text>
                            <TouchableOpacity onPress={() => {
                                var options = {
                                    description: 'Credits towards consultation',
                                    image: 'https://i.imgur.com/3g7nmJC.png',
                                    currency: 'INR',
                                    key: 'rzp_test_wHJx64AAevdTiq', // Your api key
                                    amount: '30000',
                                    name: 'POPCARD',
                                    prefill: {
                                        email: 'void@razorpay.com',
                                        contact: '9191919191',
                                        name: 'Razorpay Software'
                                    },
                                    theme: { color: '#F37254' }
                                }
                                RazorpayCheckout.open(options).then((data) => {
                                    // handle success
                                    alert(`Success: ${data.razorpay_payment_id}`);

                                    fetch('https://ipmsmpcs.com/popcard/api/ProPlan', {
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        method: "POST",
                                        body: JSON.stringify({
                                            PaymentId: data.razorpay_payment_id,
                                            Mobile: Mobile
                                        })
                                    })
                                        .then((res) => res.json())
                                        .then((res) => {
                                            AsyncStorage.setItem('login', 'verified');
                                            SignIn();
                                        })

                                }).catch((error) => {
                                    // handle failure
                                    alert(`Error: ${error.code} | ${error.description}`);
                                });
                            }} style={{ backgroundColor: "#080572", alignSelf: "center", width: 200, height: 50, borderRadius: 10, }}>
                                <Text style={{ color: "white", fontWeight: "bold", marginTop: 13, alignSelf: "center" }}>Purchase Now</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                    
                    <TouchableOpacity style={{ ...styles.submitButton, backgroundColor: "#F1F7FA" }} onPress={() => props.navigation.navigate('Profile')}>
                        <Text style={{ color: "#080572", fontWeight: "bold" }}>Demo Profile</Text>
                    </TouchableOpacity>
                </ScrollView>           
            </View>

        );
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

    header: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#080572",
        marginBottom: 5,
        marginTop: 10,
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
        marginTop:10,
        minWidth: "100%",
        alignItems: "center",
        paddingTop: 15,
        height: 50,
        borderRadius: 10
    },

    steps: {
        maxHeight: 50,
        marginTop: 20,
        height: 100,
        alignSelf: "center"
    },

    step: {
        borderWidth: 3,
        borderColor: "#080572",
        borderRadius: 50,
        height: 30,
        width: 30,
        alignItems: "center",
        paddingTop: 4,
    },

    steptext: {
        fontWeight: "bold",
        color: "#080572",
        fontSize: 12,

    },

    border: {
        width: 30,
        height: 2,
        backgroundColor: "#080572",
        marginTop: 15,
    },

})

export default StepSix