import React from 'react';
import { Image, View, FlatList, ScrollView, AsyncStorage, TouchableOpacity, Dimensions, ImageBackground, StyleSheet, TextInput, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Appbar } from 'react-native-paper';
import { Input, Item, Label } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import GetLocation from 'react-native-get-location';
import {AuthContext} from './AuthContext.js';
import {RandomContext} from './../App.js'

const Email = (props) => {
    const [WhatsappNumber, SetWhatsappNumber] = React.useState();
    const [OptionalMobileNumber, setOptionalMobileNumber] = React.useState("");
    const [WebsiteURL, setWebsiteURL] = React.useState("");
    const [Email, setEmail] = React.useState("");
    const [flashmessage, setflashmessage] = React.useState(false);
    const [invalid, setInvalid] = React.useState("");
    const [loader, setLoader] = React.useState(false);
    const [Mobile, setMobile] = React.useState('');

    
    const mobiles = async () => {
        const mobile = await AsyncStorage.getItem('mobile');
        setMobile(mobile)
    }

    const {reflact} = React.useContext(AuthContext)
    const updatepersonaldetails = () =>{
        setLoader(true)

        fetch('https://ipmsmpcs.com/popcard/api/UpdatePersonalDetails', {
            method: "POST",
            body: JSON.stringify({
                WhatsappNumber: WhatsappNumber,
                Email:Email,
                OptionalMobileNumber: OptionalMobileNumber,
                WebsiteURL: WebsiteURL,
                Mobile: Mobile
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        .then((res)=>{
            setflashmessage(true)
            setLoader(false)
            reflact();
        })
    }

    // closeFlashMessage() {
    //     this.setState({
    //         flashmessage: false
    //     })
    // }

   const fetch_contact = async() => {
       setLoader(true)
       const mobiless = await AsyncStorage.getItem('mobile');
        fetch('https://ipmsmpcs.com/popcard/api/FetchPersonalDetails', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                Mobile: mobiless
            })
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                SetWhatsappNumber(res.data.WhatsappNumber)
                setEmail(res.data.Email)
                setOptionalMobileNumber(res.data.OptionalMobileNumber)
                setWebsiteURL(res.data.WebsiteURL)
                setLoader(false)

            })

            .catch((error) => {
                console.log(error)
            })
    }

React.useEffect(()=> {
        mobiles();
    fetch_contact();
    },[])

const Use = React.useContext(RandomContext)
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                <Spinner
                    visible={loader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                {flashmessage === true ?
                    <Card style={{ backgroundColor: "#00AD3F", padding: 20, position: "absolute", top: 50, width: "100%" }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}> Successfully! Social Link Updated</Text>
                    </Card>
                    : null}
                <Appbar style={styles.appbar}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-left" size={25} color='black' style={{ marginLeft: '3%' }} />
                    </TouchableOpacity>
                    <Text style={styles.header}>Contact Setting</Text>
                </Appbar>

                <View style={{ flex: 1, backgroundColor: "white", marginTop: 50, paddingHorizontal: 20 }}>
                    <Card style={{ paddingVertical: 50, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 20, marginBottom:20, alignSelf: "center", fontWeight: "bold" }}>Update Personal Details</Text>
                        <Item>
                            <Icon name="whatsapp" style={{ fontSize: 22 }} />
                            <Input keyboardType={"numeric"} value={WhatsappNumber} placeholder="Whatsapp Number" onChangeText={(WhatsappNumber) => SetWhatsappNumber(WhatsappNumber)} />
                        </Item>
                        <Item>
                            <Icon name="envelope" style={{ fontSize: 22 }} />
                            <Input value={Email} placeholder="Email Address" onChangeText={Email => setEmail(Email)} />
                        </Item>
                        <Item>
                            <Icon name="phone" style={{ fontSize: 22 }} />
                            <Input keyboardType={"numeric"} placeholder="Optional Mobile Number" value={OptionalMobileNumber} onChangeText={(OptionalMobileNumber) => setOptionalMobileNumber(OptionalMobileNumber)} />
                        </Item>

                        <Item>
                            <Icon name="globe" style={{ fontSize: 22 }} />
                            <Input value={WebsiteURL} placeholder="Website URL" onChangeText={WebsiteURL => setWebsiteURL(WebsiteURL)} />
                        </Item>
                      


                        <View style={{ marginTop: 20 }}>
                            {Email.length > 8 ?
                                <TouchableOpacity style={{ ...styles.submitButton }} onPress={()=>updatepersonaldetails()}>
                                    <Text style={{ color: "white", fontWeight: "bold" }}>Update Now</Text>
                                </TouchableOpacity>
                                : <View style={styles.submitButton2} disabled><Text style={{ color: "gray", fontWeight: "bold" }}>Update Now</Text></View>}
                        </View>
                    </Card>
                </View>
            </View>
        );
    }


const styles = StyleSheet.create({
    appbar: {
        backgroundColor: "white"
    },
    header: {
        fontWeight: "bold",
        fontSize: 16
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
});

export default Email;