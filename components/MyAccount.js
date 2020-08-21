import React, { Component } from "react";
import { Image, View, ScrollView, AsyncStorage, TouchableOpacity, ImageBackground, StyleSheet, TextInput, Text } from "react-native";
import { Appbar, Card } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RandomContext} from './../App.js'
const MyAccount = (props) => {
    const [Email, setEmail] = React.useState('');
    const [Mobile, setMobile] = React.useState('');
    const [ImgName, setImgName] = React.useState('');
    const [spinner, setSpinner] = React.useState(false);
    const [Name, setName] = React.useState(false);
 
    const [CompanyName, setCompanyName] = React.useState('');
    const [Designation, setDesignation] = React.useState('');
    const [BackgroundImage, setBackgroundImage] = React.useState('');

    const randomcode = React.useContext(RandomContext)
    React.useEffect(()=>{
        profile();
    },[randomcode])

    const profile = async() =>{
        const mobile = await AsyncStorage.getItem('mobile');
        setMobile(mobile)
        fetch('https://ipmsmpcs.com/popcard/api/Profile', {
            method: "POST",
            body: JSON.stringify({
                Mobile: mobile,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setEmail(res.data.Email)
                setCompanyName(res.data.Company)
                setName(res.data.Name)
                setImgName(res.data.Image)
                
                setSpinner(false)
                setBackgroundImage(res.data.TemplateId)

                console.log(res)

            })
    }

        return (
            <View>
                <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <View>
                    <Appbar style={styles.appbar}>
                        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                            <Icon name="menu" size={30} color='black' style={{ marginLeft: '3%' }} />
                        </TouchableOpacity>
                        <Text style={styles.header}>My Account</Text>
                    </Appbar>
                    <ImageBackground style={{ width: "100%", height: 170 }} source={{uri:'https://ipmsmpcs.com/popcard/public/assets/uploads/'+BackgroundImage}}>
                        <Card style={{width:"70%", alignSelf:"center", marginTop:80}}>
                        <View style={styles.profile_background2}>
                            <View style={{...styles.profile_background, flexDirection:"row"}}>
                                <Image source={{uri:'https://ipmsmpcs.com/popcard/public/assets/uploads/'+ImgName}} style={{ width: 80, height: 80, borderRadius: 80 }} />
                                    
                            </View>
                                <TouchableOpacity onPress={() => props.navigation.navigate('UpdateProfile')} style={{ marginTop: -80, marginLeft: 200 }}>
                                    <Text><Icon name="edit" style={{ fontSize: 30, color: "#080572" }} /></Text>
                                </TouchableOpacity>
                        </View>

                            <View style={{ alignItems: "center", marginTop: 40, marginBottom:20 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}>{Name}</Text>
                                <Text style={{ marginTop: 2 }}>{CompanyName}</Text>
                            </View>
                        </Card>
                    </ImageBackground>
                   
                    <View style={{ paddingHorizontal: 10, marginTop: 110 }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('ChangePassword')}>
                        <Card style={{ padding: 15, marginTop: 3 }} >
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ width: "15%" }}>
                                    <Icon name="lock" style={{fontSize:25}} />
                                </View>
                                <View style={{ width: "85%" }}>
                                    <Text style={{ fontWeight: "bold", marginTop: 5 }}>Change Password</Text>
                                </View>
                            </View>
                        </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate('Location')}>
                            <Card style={{ padding: 15, marginTop: 3 }} >
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: "15%" }}>
                                        <Icon name="my-location" style={{ fontSize: 25 }} />
                                    </View>
                                    <View style={{ width: "85%" }}>
                                        <Text style={{ fontWeight: "bold", marginTop: 5 }}>Location & Address</Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate('SocialLinks')}>
                            <Card style={{ padding: 15, marginTop: 3 }} >
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: "15%" }}>
                                        <Icon name="phonelink-setup" style={{ fontSize: 25 }} />
                                    </View>
                                    <View style={{ width: "85%" }}>
                                        <Text style={{ fontWeight: "bold", marginTop: 5 }}>Social Links</Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate('BusinessTemplate')}>
                            <Card style={{ padding: 15, marginTop: 3 }} >
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: "15%" }}>
                                        <Icon name="card-membership" style={{ fontSize: 25 }} />
                                    </View>
                                    <View style={{ width: "85%" }}>
                                        <Text style={{ fontWeight: "bold", marginTop: 5 }}>Business Template</Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate('Email')}>
                            <Card style={{ padding: 15, marginTop: 3 }} >
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: "15%" }}>
                                        <Icon name="phone" style={{ fontSize: 25 }} />
                                    </View>
                                    <View style={{ width: "85%" }}>
                                        <Text style={{ fontWeight: "bold", marginTop: 5 }}>Contacts Setting</Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }


const styles = StyleSheet.create({
    appbar: {
        backgroundColor: "white",
    },

    profile_background: {
        width: 85,
        height: 85,
        borderColor: "white",
        marginTop:10,
        borderWidth: 3,
        borderRadius: 80,
        alignItems:"center",
        alignSelf:"center",
    },


    appbar: {
        backgroundColor: "white"
    },

    header: {
        fontWeight: "bold",
        fontSize: 16
    }
    });

export default MyAccount;