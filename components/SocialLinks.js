import React from 'react';
import { Image, View, FlatList, ScrollView, AsyncStorage, TouchableOpacity, Dimensions, ImageBackground, StyleSheet, TextInput, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Appbar } from 'react-native-paper';
import { Input, Item, Label } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

const SocialLinks = (props) => {
    const[Facebook, setFacebook] = React.useState("")
    const[Instagram, setInstagram] = React.useState("")
    const[LinkedIn, setLinkedIn] = React.useState("")
    const[YouTube, setYouTube] = React.useState("")
    const[Twitter, setTwitter] = React.useState("")
    const[invalid, setInvalid] = React.useState("")
    const[Mobile, setMobile] = React.useState("")
    const[loader, setLoader] = React.useState("")
    const[flashmessage, setFlashmessage] = React.useState("")

    React.useEffect(()=>{
        sociallinks();
    },[])


    const sociallinks = async() =>{
        const mobile = await AsyncStorage.getItem('mobile');
       setLoader(true)
       setMobile(mobile)
        fetch('https://ipmsmpcs.com/popcard/api/FetchLink',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:"POST",
            body:JSON.stringify({
                Mobile:mobile
            })
        })
        .then((res) => res.json())
         .then((res)=>{
             console.log(res)
        
        setFacebook(res.data.Facebook)
        setLinkedIn(res.data.LinkedIn)
        setInstagram(res.data.Instagram)
        setTwitter(res.data.Twitter)
        setYouTube(res.data.YouTube)
        setLoader(false)
    })

    .catch((error)=>{
        console.log(error)
    })
    }


    const updatelink = () => {
        setLoader(true)
        
        fetch('https://ipmsmpcs.com/popcard/api/UpdateLink', {
            method: "POST",
            body: JSON.stringify({
                Facebook: Facebook,
                Instagram: Instagram,
                Twitter: Twitter,
                YouTube: YouTube,
                LinkedIn: LinkedIn,
                Mobile: Mobile
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setLoader(false)
                setFlashmessage(true)
            })
        }

    const closeFlashMessage = () => {
        setFlashmessage(false)
    }
    
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                <Spinner
                    visible={loader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <Appbar style={styles.appbar}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-left" size={25} color='black' style={{ marginLeft: '3%' }} />
                    </TouchableOpacity>
                    <Text style={styles.header}>Social Links</Text>
                </Appbar>
                {flashmessage === true ?
                    <Card style={{ backgroundColor: "#00AD3F", padding: 20, position: "absolute", top: 50, width: "100%" }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}> Successfully! Social Link Updated</Text>
                    </Card>
                    : null}
                <View style={{ flex: 1, backgroundColor: "white", marginTop: 50, paddingHorizontal: 20 }}>
                    <Card style={{ paddingVertical: 50, paddingHorizontal: 10 }}>
                        <Text style={{fontSize:20, alignSelf:"center", fontWeight:"bold"}}>Social Links Update</Text>
                        <Item>
                            <Icon name="facebook" style={{fontSize:22}} />
                            <Input placeholder="https://facebook.com" value={Facebook} onChangeText={(Facebook) => setFacebook(Facebook)} />
                        </Item>
                        <Item>
                            <Icon name="instagram" style={{ fontSize: 22 }} />
                            <Input placeholder="https://instagram.com" value={Instagram} onChangeText={(Instagram) => setInstagram(Instagram)} />
                        </Item>
                        <Item>
                            <Icon name="linkedin" style={{ fontSize: 22 }} />
                            <Input placeholder="https://linkedin.com" value={LinkedIn} onChangeText={(LinkedIn) => setLinkedIn(LinkedIn)} />
                        </Item>

                        <Item>
                            <Icon name="twitter" style={{ fontSize: 22 }} />
                            <Input placeholder="https://twitter.com" value={Twitter} onChangeText={(Twitter) => setTwitter(Twitter)} />
                        </Item>
                        <Item>
                            <Icon name="youtube" style={{ fontSize: 22 }} />
                            <Input placeholder="https://youtube.com" value={YouTube} onChangeText={(YouTube) => setYouTube(YouTube)} />
                        </Item>

                       
                        <View style={{ marginTop: 20 }}>
                            
                                <TouchableOpacity style={{ ...styles.submitButton }} onPress={()=>updatelink()}>
                                    <Text style={{ color: "white", fontWeight: "bold" }}>Update Now</Text>
                                </TouchableOpacity>
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

export default SocialLinks