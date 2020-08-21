import React from 'react';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Card, Appbar } from 'react-native-paper';
export default class PrivacyPolicy extends React.Component {

    render() {
        return (
            <View>
                <Appbar style={styles.appbar}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name="menu" size={30} color='black' style={{ marginLeft: '3%' }} />
                    </TouchableOpacity>
                    <Text style={styles.header}>Upgrade Plan</Text>
                </Appbar>
                <ScrollView>
               

                <Card style={{ width: "90%", alignSelf: "center", marginTop:20, paddingBottom:20 }}>
                    <View style={{ borderColor: "#e6e6e6", borderBottomWidth: 1 }}>
                        <Text style={{ fontWeight: "bold", alignSelf: "center", paddingTop: 10, fontSize: 30, paddingBottom: 5 }}>Pro Plan</Text>
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <Text style={{ alignSelf: "center", fontSize: 16, marginBottom:15, color: "gray" }}>Free Template </Text>
                        <Text style={{ alignSelf: "center", fontSize: 16, marginBottom:15, color: "gray" }}>Unlimitted Sharing On Social Media </Text>

                        <Text style={{ alignSelf: "center", fontSize: 16, marginBottom:15, color: "gray" }}>Location & Address Features </Text>
                        <Text style={{ alignSelf: "center", fontSize: 16, marginBottom:15, color: "gray" }}>Other Releated Features </Text>
                            <TouchableOpacity style={{ backgroundColor: "#080572", alignSelf: "center", width: 200, height: 50, borderRadius: 10, }}>
                                <Text style={{ color: "white", fontWeight: "bold", marginTop: 13, alignSelf: "center" }}>Purchase Now</Text>
                            </TouchableOpacity>
                    </View>
                </Card>
                <View style={{paddingBottom:40}}></View>
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