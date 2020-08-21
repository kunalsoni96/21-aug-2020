import React from 'react';
import { Image, View, FlatList, ScrollView, TouchableOpacity, Dimensions, ImageBackground, StyleSheet, TextInput, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Appbar } from 'react-native-paper';
import { Input, Item, Label } from 'native-base';
import Geolocation from '@react-native-community/geolocation';

export default class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: "",
            Address: "",
            City: "Raipur",
            State: "Chhattisgarh",
            Mobile: "",
            GPS:"",
            Mobile:"",
            loader:false
        }
    }

    componentDidMount() {
        // Geolocation.getCurrentPosition(
            
        //     (position)=>{
        //         fetch('https://ipmsmpcs.com/popcard/api/LocationSubmit',{
        //             headers:{
        //                 'Accept':'application/json',
        //                 'Content-Type':'application/json'
        //             },
        //             method:"POST",
        //             body:JSON.stringify({
        //                 Mobile:this.state.Mobile,
        //                 latitude:position.coords.latitude,
        //                 longitude: position.coords.longitude
        //             })
        //         })
        //         .then((res)=>res.json())
        //         .then((res)=>{
        //             console.log('success')
        //         })
        //     }

        // )
        this.mobile();
    }

    mobile = async () => {
        const mobile = await AsyncStorage.getItem('mobile');
        this.setState({
            Mobile: mobile
        })
    }
    
    render() {
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                <Appbar style={styles.appbar}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left" size={25} color='black' style={{ marginLeft: '3%' }} />
                    </TouchableOpacity>
                    <Text style={styles.header}>Location</Text>
                </Appbar>

                <View style={{ flex: 1, backgroundColor: "white", marginTop: 50, paddingHorizontal: 20 }}>
                    <Card style={{ paddingVertical: 50, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 20, alignSelf: "center", fontWeight: "bold" }}>Location & Address</Text>
                        <Item>
                            <Icon name="location-arrow" style={{ fontSize: 22 }} />
                            <Input value={this.state.GPS} editable={false}  onChangeText={(GPS) => this.setState({ GPS })} />
                        </Item>
                        <Item>
                            <Icon name="address-card-o" style={{ fontSize: 22 }} />
                            <Input value={this.state.Address} onChangeText={(Address) => this.setState({ Address })} />
                        </Item>

                        <View style={{ marginTop: 20 }}>
                            {this.state.Address.length > 8 ?
                                <TouchableOpacity style={{ ...styles.submitButton }} onPress={this.nextStep}>
                                    <Text style={{ color: "white", fontWeight: "bold" }}>Update Now</Text>
                                </TouchableOpacity>
                                : <View style={styles.submitButton2} disabled><Text style={{ color: "gray", fontWeight: "bold" }}>Update Now</Text></View>}
                        </View>
                    </Card>
                </View>
            </View>
        );
    }
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