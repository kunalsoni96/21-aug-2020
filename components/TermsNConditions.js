import React from 'react';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import {View, ScrollView, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Card, Appbar } from 'react-native-paper';

 export default class TermsNConditions extends React.Component {

     render(){
    return (
        <View>
            <Appbar style={styles.appbar}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                    <Icon name="menu" size={30} color='black' style={{ marginLeft: '3%' }} />
                </TouchableOpacity>
                <Text style={styles.header}>Terms & Conditions</Text>
            </Appbar>
        <ScrollView showsHorizontalScrollIndicator={false} style={{marginBottom:50}}>
            <Collapse style={{marginTop:10}}>
                <CollapseHeader style={{height:50}}>
                    <Separator bordered style={{backgroundColor:"white"}}>
                        <View style={{flexDirection:"row"}}>
                        <View style={{ width:"90%" }}>
                        <Text style={{fontWeight:"bold"}}>Ask Many Question?</Text>
                        </View>
                            <View style={{ width: "10%" }}>
                            <Icon name="keyboard-arrow-down" style={{fontSize:20}}/>
                            </View>
                        </View>
                    </Separator>
                </CollapseHeader>
                <CollapseBody style={{backgroundColor:"white"}}>
                    <ListItem >
                        <Text>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. </Text>
                    </ListItem>
                  
                </CollapseBody>
            </Collapse>

            <Collapse style={{ marginTop: 1 }}>
                <CollapseHeader style={{ height: 50 }}>
                    <Separator bordered style={{ backgroundColor: "white" }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: "90%" }}>
                                <Text style={{ fontWeight: "bold" }}>Ask Many Question?</Text>
                            </View>
                            <View style={{ width: "10%" }}>
                                <Icon name="keyboard-arrow-down" style={{ fontSize: 20 }} />
                            </View>
                        </View>
                    </Separator>
                </CollapseHeader>
                <CollapseBody style={{ backgroundColor: "white" }}>
                    <ListItem >
                        <Text>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. </Text>
                    </ListItem>

                </CollapseBody>
            </Collapse>

            <Collapse style={{ marginTop: 1 }}>
                <CollapseHeader style={{ height: 50 }}>
                    <Separator bordered style={{ backgroundColor: "white" }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: "90%" }}>
                                <Text style={{ fontWeight: "bold" }}>Ask Many Question?</Text>
                            </View>
                            <View style={{ width: "10%" }}>
                                <Icon name="keyboard-arrow-down" style={{ fontSize: 20 }} />
                            </View>
                        </View>
                    </Separator>
                </CollapseHeader>
                <CollapseBody style={{ backgroundColor: "white" }}>
                    <ListItem >
                        <Text>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. </Text>
                    </ListItem>

                </CollapseBody>
            </Collapse>

            <Collapse style={{ marginTop: 1 }}>
                <CollapseHeader style={{ height: 50 }}>
                    <Separator bordered style={{ backgroundColor: "white" }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: "90%" }}>
                                <Text style={{ fontWeight: "bold" }}>Ask Many Question?</Text>
                            </View>
                            <View style={{ width: "10%" }}>
                                <Icon name="keyboard-arrow-down" style={{ fontSize: 20 }} />
                            </View>
                        </View>
                    </Separator>
                </CollapseHeader>
                <CollapseBody style={{ backgroundColor: "white" }}>
                    <ListItem >
                        <Text>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. </Text>
                    </ListItem>

                </CollapseBody>
            </Collapse>

            <Collapse style={{ marginTop: 1 }}>
                <CollapseHeader style={{ height: 50 }}>
                    <Separator bordered style={{ backgroundColor: "white" }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: "90%" }}>
                                <Text style={{ fontWeight: "bold" }}>Ask Many Question?</Text>
                            </View>
                            <View style={{ width: "10%" }}>
                                <Icon name="keyboard-arrow-down" style={{ fontSize: 20 }} />
                            </View>
                        </View>
                    </Separator>
                </CollapseHeader>
                <CollapseBody style={{ backgroundColor: "white" }}>
                    <ListItem >
                        <Text>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. </Text>
                    </ListItem>

                </CollapseBody>
            </Collapse>

            <Collapse style={{ marginTop: 1 }}>
                <CollapseHeader style={{ height: 50 }}>
                    <Separator bordered style={{ backgroundColor: "white" }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: "90%" }}>
                                <Text style={{ fontWeight: "bold" }}>Ask Many Question?</Text>
                            </View>
                            <View style={{ width: "10%" }}>
                                <Icon name="keyboard-arrow-down" style={{ fontSize: 20 }} />
                            </View>
                        </View>
                    </Separator>
                </CollapseHeader>
                <CollapseBody style={{ backgroundColor: "white" }}>
                    <ListItem >
                        <Text>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. </Text>
                    </ListItem>

                </CollapseBody>
            </Collapse>
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

