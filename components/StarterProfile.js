import React, { Component } from "react";
import { Image, View, ScrollView, Linking, AsyncStorage, TouchableOpacity, ImageBackground, StyleSheet, TextInput, Text } from "react-native";
import { Appbar, Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();


export default class StarterProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: "",
            Mobile: "",
            color:"#8536A3",
            CustomerMobile:"",
            ImgName: "",
            loaader: false,
            Address: "",
            WebsiteURL: "",
            Facebook: "",
            Instagram: "",
            LinkedIn: "",
            Twitter: "",
            YouTube: "",
            GooglePlus: "",
            CompanyName: "",
            Designation: "",
            Name: "",
            CompanyOrFreelancer: "",
            message: "Hi",
            message2: "nbdigitech.com"
        }
        this.Profile = this.Profile.bind(this)
    }

    openWhatsApp = () => {

        let url =
            "whatsapp://send?text=" +
            this.state.message +
            "&phone=91" +
            this.state.Mobile;
        Linking.openURL(url)
            .then(data => {
                console.log("WhatsApp Opened successfully " + data);
            })
            .catch(() => {
                alert("Make sure WhatsApp installed on your device");
            });
    };


    shareWhatsApp = () => {
        if(this.state.CustomerMobile.length<10){
            this.setState({
                color:"red"
            })
        }
        else{
            let url =
                "whatsapp://send?text=" +
                this.state.message2 +
                "&phone=91" +
                this.state.CustomerMobile;
            Linking.openURL(url)
                .then(data => {
                    console.log("WhatsApp Opened successfully " + data);
                })
                .catch(() => {
                    alert("Make sure WhatsApp installed on your device");
                });
        }
    };


    componentDidMount() {

        this.Profile();
    }

    async Profile() {
        const mobile = await AsyncStorage.getItem('mobile');

        this.setState({
            loaader: true
        })
        fetch('https://ipmsmpcs.com/popcard/api/Profile', {
            method: "POST",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Mobile: mobile,
            })

        })
            .then((res) => res.json())
            .then((res) => {
                console.log('sdsd' + res.data)
                this.setState({
                    Email: res.data.Email,
                    Mobile: res.data.Mobile,
                    WebsiteURL: res.data.WebsiteURL,
                    Address: res.data.Address,
                    Name: res.data.Name,
                    CompanyName: res.data.Company,
                    ImgName: res.data.Image,
                    Designation: res.data.Designation,
                    loaader: false
                })
                console.log('kkk' + res)
            })

            .catch((err) => {
                console.log('eee' + err)
            })
    }


    openlocation(){
        const label = "Mageneto Mall";
        const url = Platform.select({
            ios: "maps:" + latitude + "," + longitude + "?q=" + label,
            android: "geo:" + 22.0717 + "," + 82.1489 + "?q=" + label
        });
        Linking.openURL(url);
    }
    render() {
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                <Spinner
                    visible={this.state.loaader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <View>
                    <ImageBackground style={{ width: "100%", height: 160 }} source={require('./../assets/images/realestate.jpg')}>
                        <View style={styles.view}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>Views : 102</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ ...styles.profile_background2 }}>
                                <Image source={{ uri: 'https://ipmsmpcs.com/popcard/public/assets/uploads/' + this.state.ImgName }} style={{ width: 98, height: 100, marginTop: 0, marginLeft: 1, borderRadius: 80 }} />
                            </View>
                            <View style={{ width: "50%" }}>
                                <Text style={{ fontWeight: "bold", marginTop: 90, alignSelf: "center", fontSize: 20, color: "white" }}>{this.state.Name}</Text>
                                <Text style={{ marginTop: 20, alignSelf: "center", fontWeight: "bold" }}>{this.state.CompanyName}</Text>
                                <Text style={{ marginTop: 1, alignSelf: "center" }}>{this.state.Designation}</Text>
                            </View>

                        </View>
                    </ImageBackground>

                    <View style={{ marginTop: 80, paddingHorizontal: 30, flexDirection: "row" }}>
                        <TextInput placeholder="98********" value={this.state.CustomerMobile} onChangeText={(CustomerMobile)=>this.setState({CustomerMobile})} keyboardType={"numeric"} style={{ fontSize: 14, color: "#8335A4", borderWidth: 1, borderRadius: 20, paddingTop: 10, alignItems: "center", borderColor: this.state.color, width: 150, height: 40, paddingLeft: 10 }} />
                        <TouchableOpacity onPress={this.shareWhatsApp} style={{ flexDirection: "row", marginLeft: 5, alignSelf: "center", paddingLeft: 10, borderWidth: 1, borderRadius: 20, paddingTop: 0, alignItems: "center", borderColor: "#44D059", width: 150, height: 40, }}>
                            <Text style={{ marginRight: 10, marginLeft: 10, alignItems: "center" }}>
                                <Icon name="whatsapp" style={{ fontSize: 16, color: "#00AD3F" }} />
                            </Text>
                            <Text style={{ fontSize: 14, color: "#00AD3F" }}>
                                Share Now
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: "row", marginTop: 30, alignItems: "center" }}>

                    <Card style={{ width: "24%", alignItems: "center", marginLeft: "1%", height: 70 }}>
                        <TouchableOpacity onPress={this.openWhatsApp}>
                            <Text style={{ alignSelf: "center", marginBottom: 5, marginTop: 10 }}>
                                <Icon name="whatsapp" style={{ fontSize: 20 }} />
                            </Text>
                            <Text>
                                Whatsapp
                     </Text>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{ width: "24%", alignItems: "center", marginLeft: "1%", height: 70 }}>
                        <TouchableOpacity onPress={() => Linking.openURL('mailto:'+this.state.Email)}>
                        <Text style={{ alignSelf: "center", marginBottom: 5, marginTop: 10 }}>
                            <Icon name="envelope" style={{ fontSize: 20 }} />
                        </Text>
                        <Text>
                            Email
                        </Text>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{ width: "24%", alignItems: "center", marginLeft: "1%", height: 70 }}>
                        <TouchableOpacity onPress={this.openlocation}>
                        <Text style={{ alignSelf: "center", marginBottom: 5, marginTop: 10 }}>
                            <Icon name="location-arrow" style={{ fontSize: 20 }} />
                        </Text>
                        <Text>
                            Location
                        </Text>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{ width: "24%", alignItems: "center", marginLeft: "1%", height: 70 }}>
                        <TouchableOpacity onPress={()=>Linking.openURL(this.state.WebsiteURL)}>
                        <Text style={{ alignSelf: "center", marginBottom: 5, marginTop: 10 }}>
                            <Icon name="globe" style={{ fontSize: 20 }} />
                        </Text>
                        <Text>
                            Website
                        </Text>
                        </TouchableOpacity>
                    </Card>
                </View>

                <View style={{ paddingHorizontal: 30, marginTop: 40, flexDirection: "row" }}>
                    <View style={{ width: 22, height: 22, borderRadius: 25, borderWidth: 2, borderColor: "#8335A4" }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: 15, height: 15, marginLeft: 1.5, marginTop: 1.5, borderRadius: 20, backgroundColor: "#8335A4" }}></View>
                        </View>
                        <View style={{ height: 24, marginLeft: 6, borderRadius: 5, marginTop: 1, backgroundColor: "#8335A4", width: 5 }}></View>
                    </View>

                    <View style={{ marginLeft: 20, }}>
                        <TouchableOpacity onPress={() => Linking.openURL('tel:'+this.state.Mobile)}>
                        <Text style={{ fontWeight: "bold" }}>+91{this.state.Mobile}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 30, marginTop: 20, flexDirection: "row" }}>
                    <View style={{ width: 22, height: 22, borderRadius: 25, borderWidth: 2, borderColor: "#8335A4" }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: 15, height: 15, marginLeft: 1.5, marginTop: 1.5, borderRadius: 20, backgroundColor: "#8335A4" }}></View>
                        </View>
                        <View style={{ height: 24, marginLeft: 6, borderRadius: 5, marginTop: 1, backgroundColor: "#8335A4", width: 5 }}></View>
                    </View>

                    <View style={{ marginLeft: 20, }}>
                        <Text style={{ fontWeight: "bold" }}>{this.state.Email}</Text>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 30, marginTop: 20, flexDirection: "row" }}>
                    <View style={{ width: 22, height: 22, borderRadius: 25, borderWidth: 2, borderColor: "#8335A4" }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: 15, height: 15, marginLeft: 1.5, marginTop: 1.5, borderRadius: 20, backgroundColor: "#8335A4" }}></View>
                        </View>
                    </View>

                    <View style={{ marginLeft: 20, }}>
                        <Text style={{ fontWeight: "bold" }}>KK Road, Maudhapara, Fafadih, Raipur, Chhattisgarh</Text>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
                    <View style={{ borderBottomWidth: 1, borderColor: "#e6e6e6", marginBottom: 20 }}>

                    </View>
                    <View style={{ flexDirection: "row" }}>
                        {this.state.Facebook!=='' ?
                        <TouchableOpacity style={{ width: "15%", marginLeft: "2%", height: 40, borderRadius: 40 }}>
                            <Text>
                                <Icon name="facebook" style={{ fontSize: 25, color: "#4064AC" }} />
                            </Text>
                        </TouchableOpacity>
                        :null}

                        {this.state.Instagram !== '' ?
                        <TouchableOpacity style={{ width: "15%", marginLeft: "2%", height: 40, borderRadius: 40 }}>
                            <Text>
                                <Icon name="instagram" style={{ fontSize: 25, color: "#AD2AAA" }} />
                            </Text>
                        </TouchableOpacity>
                        :null}

                        {this.state.GooglePlus !== '' ?
                        <TouchableOpacity style={{ width: "15%", marginLeft: "2%", height: 40, borderRadius: 40 }}>
                            <Text>
                                <Icon name="google-plus" style={{ fontSize: 25, color: "#D64937" }} />
                            </Text>
                        </TouchableOpacity>
                        :null}

                    {this.state.Twitter !== '' ?
                        <TouchableOpacity style={{ width: "15%", marginLeft: "2%", height: 40, borderRadius: 40 }}>
                            <Text>
                                <Icon name="twitter" style={{ fontSize: 25, color: "#1C9CEB" }} />
                            </Text>
                        </TouchableOpacity>
                    :null}

                {this.state.YouTube !== '' ?
                        <TouchableOpacity style={{ width: "15%", marginLeft: "2%", height: 40, borderRadius: 40 }}>
                            <Text>
                                <Icon name="youtube" style={{ fontSize: 25, color: "#F60002" }} />
                            </Text>
                        </TouchableOpacity>
                :null}

                {this.state.LinkedIn !== '' ?
                        <TouchableOpacity style={{ width: "15%", marginLeft: "2%", height: 40, borderRadius: 40 }}>
                            <Text>
                                <Icon name="linkedin" style={{ fontSize: 22, color: "#0073AF" }} />
                            </Text>
                        </TouchableOpacity>
                :null}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appbar: {
        backgroundColor: "white",
    },

    profile_background: {
        width: 106,
        height: 105,
        borderColor: "#A60000",
        alignSelf: "center",
        borderWidth: 3,
        borderRadius: 80
    },

    profile_background2: {
        width: 105,
        height: 106,
        borderColor: "#e6e6e6",

        marginTop: 75,
        marginLeft: 30,
        borderWidth: 3,
        borderRadius: 90
    },
    view: {
        backgroundColor: "#8335A4",
        width: 120,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        alignSelf: "center",
        height: 30,
        paddingTop: 5,
        alignItems: "center"
    }
});