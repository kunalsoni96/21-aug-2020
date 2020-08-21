import React from 'react';
import {View, ScrollView, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card, Appbar } from 'react-native-paper';

export default class Payment extends React.Component{
    render(){
        return(
            <View>
                <ScrollView>
                <Appbar style={styles.appbar}>
                     <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name="menu" size={30} color='black' style={{ marginLeft: '3%' }} />
                    </TouchableOpacity>
                    <Text style={styles.header}>Bank Details</Text>
                </Appbar>
                 <Card style={{paddingHorizontal:10, paddingTop:20, paddingBottom:10}}>
                    <View style={{flexDirection:"row"}}>
                    <View style={{width:"40%"}}>
                            <Text style={{ fontWeight: "bold" }}>1. Bank Name :</Text>
                    </View>
                        <View style={{ width: "60%" }}>
                            <Text>Bank Of India</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop:10 }}>
                        <View style={{ width: "40%" }}>
                            <Text style={{fontWeight:"bold"}}>2. IFSC Code:</Text>
                        </View>
                        <View style={{ width: "60%" }}>
                            <Text>KJKI5625 :</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop:10 }}>
                        <View style={{ width: "40%" }}>
                            <Text style={{ fontWeight: "bold" }}>3. Branch Name :</Text>
                        </View>
                        <View style={{ width: "60%" }}>
                            <Text>Mangla</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop:10 }}>
                        <View style={{ width: "40%" }}>
                            <Text style={{ fontWeight: "bold" }}>4. Account Number :</Text>
                        </View>
                        <View style={{ width: "60%" }}>
                            <Text>9568596547852</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ width: "40%" }}>
                            <Text style={{ fontWeight: "bold" }}>5. Account Type :</Text>
                        </View>
                        <View style={{ width: "60%" }}>
                            <Text>Current Account</Text>
                        </View>
                    </View>
                </Card>
            <View style={{flexDirection:"row", paddingVertical:5}}>
                <View style={{width:"49%",}}>
                        <Card style={{ padding: 10,  }}>
                            <Image source={require('./../assets/images/paytm.jpg')} style={{ width: "70%", marginLeft:20, height: 50, marginBottom:-10 }} />
                            <View style={{ padding: 10, alignItems: "center" }}>
                                <Image source={require('./../assets/images/qr.jpg')} style={{ width: 110, height: 110 }} />
                            </View>
                        </Card>
                </View>
            
                    <View style={{ width: "49%", marginLeft: "2%" }}>
                        <Card style={{ padding: 10 }}>
                            <Image source={require('./../assets/images/googlepay.jpg')} style={{ width: "100%", marginBottom:-10, height: 50 }} />
                            <View style={{ padding: 10, alignItems: "center" }}>
                                <Image source={require('./../assets/images/qr.jpg')} style={{ width: 110, height: 110 }} />
                            </View>
                        </Card>
                    </View>
            </View>

                <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                    <View style={{ width: "49%" }}>
                        <Card style={{ padding: 10 }}>
                            <Image source={require('./../assets/images/phonepay.jpg')} style={{ width: "100%", marginBottom:-10, height: 50 }} />
                            <View style={{ padding: 10, alignItems: "center" }}>
                                <Image source={require('./../assets/images/qr.jpg')} style={{ width: 110, height: 110 }} />
                            </View>
                        </Card>
                    </View>

                    <View style={{ width: "49%", marginLeft: "2%"}}>
                        <Card style={{padding:10,  }}>

                            <Image source={require('./../assets/images/bhim.jpg')} style={{ width:"60%", marginLeft:30, marginBottom:-10,  height: 50 }} />
                        
                            <View style={{ padding: 10, alignItems: "center" }}>
                            <Image source={require('./../assets/images/qr.jpg')} style={{ width: 110, height:110 }} />
                            </View>
                        </Card>
                    </View>
                </View>

               
                </ScrollView>
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
    }
});