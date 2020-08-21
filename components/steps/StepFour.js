import React, { Component } from "react";
import { Image, View, Picker, ScrollView, AsyncStorage, TouchableOpacity, StyleSheet, TextInput, Text } from "react-native";
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

export default class StepFour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: "",
            Facebook:"",
            Instagram:"",
            Twitter:"",
            LinkedIn:"",
            YouTube:"",
            Mobile:""
        };
        this.submithandle = this.submithandle.bind(this)
    }

  async  componentDidMount() {
        const mobile = await AsyncStorage.getItem('mobile');
        this.setState({
            spinner: false,
            Mobile:mobile
        });
    }

    submithandle() {
        this.setState({
            spinner: true,
        });
        fetch('https://ipmsmpcs.com/popcard/api/CreateSocialLink', {
            method: "POST",
            body: JSON.stringify({
                Facebook: this.state.Facebook,
                Instagram: this.state.Instagram,
                Twitter: this.state.Twitter,
                YouTube: this.state.YouTube,
                LinkedIn: this.state.LinkedIn,
                Mobile:this.state.Mobile
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    spinner: false,
                });
                this.props.navigation.navigate('StepFive');
            })
    }

    render() {
        const city = [{ dlabel: "Bilaspur" }, { dlabel: "Raipur" }, { dlabel: "Bhatapara" }];
        const state = [{ dlabel: "Chhattisgarh" }, { dlabel: "Jharkhand" }, { dlabel: "Madhyapradesh" }];
        return (
            <View style={styles.wrapper}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <ScrollView horizontal={true} style={styles.steps} showsHorizontalScrollIndicator={false}>
                    <View style={styles.step}>
                        <Text style={styles.steptext}>1</Text>
                    </View>

                    <View style={styles.border}></View>
                    <View style={{ ...styles.step }}>
                        <Text style={{ ...styles.steptext }}>2</Text>
                    </View>
                    
                    <View style={styles.border}></View>
                    <View style={styles.step}>
                        <Text style={styles.steptext}>3</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={{ ...styles.step, backgroundColor: "#080572", marginLeft: 0 }}>
                        <Text style={{ ...styles.steptext, color: "white" }}>4</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={styles.step}>
                        <Text style={styles.steptext}>5</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={styles.step}>
                        <Text style={styles.steptext}>6</Text>
                    </View>
                </ScrollView>
                <View>
                    <Text style={styles.header}>Links</Text>
                </View>
                <View style={{ alignItems: "center", flex: 1 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <Icon name="facebook" style={{ fontSize: 30, backgroundColor: "#345099", color: "white", width: 50, paddingLeft: 17, paddingTop: 10, paddingBottom: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, }} />
                        </View>
                        <View style={{ width: "82%" }}>
                            <TextInput
                                onChangeText={Facebook => this.setState({ Facebook })}
                                value={this.state.Facebook}
                                placeholder={"https://facebook.com/popcard"}
                                placeholderTextColor="#3b5998"
                                style={{ ...styles.input, borderColor: "#3b5998", width:"100%" }} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <View >
                            <Icon name="instagram" style={{ fontSize: 30, backgroundColor: "#517fa4", color: "white", width: 50, paddingLeft: 13, paddingTop: 10, paddingBottom: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, }} />
                        </View>
                        <View style={{ width: "82%" }}>
                            <TextInput
                                onChangeText={Instagram => this.setState({ Instagram })}
                                value={this.state.Instagram}
                                placeholder={"https://instagram.com/popcard"}
                                placeholderTextColor="#517fa4"
                                style={{ ...styles.input, borderColor: "#517fa4", width:"100%" }} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ marginLeft: 0 }}>
                            <Icon name="twitter" style={{ fontSize: 30, backgroundColor: "#00aced", color: "white", width: 50, paddingLeft: 13, paddingTop: 10, paddingBottom: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, }} />
                        </View>
                        <View style={{width:"82%"}}>
                            <TextInput
                                onChangeText={Twitter => this.setState({ Twitter })}
                                value={this.state.Twitter}
                                placeholder={"https://twitter.com/popcard"}
                                placeholderTextColor="#00aced"
                                style={{ ...styles.input, borderColor: "#00aced", width:"100%" }} />

                                
                        </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <View >
                            <Icon name="youtube" style={{ fontSize: 30, backgroundColor: "#bb0000", color: "white", width: 50, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, paddingLeft: 13, paddingTop: 10, paddingBottom: 10 }} />
                        </View>
                        <View style={{ width: "82%" }}>
                            <TextInput
                                onChangeText={YouTube => this.setState({ YouTube })}
                                value={this.state.YouTube}
                                placeholder={"https://youtube.com/popcard"}
                                placeholderTextColor="#bb0000"
                                style={{ ...styles.input, borderColor: "#bb0000", width:"100%" }} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <Icon name="linkedin" style={{ fontSize: 30, backgroundColor: "#007bb6", color: "white", borderTopLeftRadius: 5, borderBottomLeftRadius: 5, width: 50, paddingLeft: 13, paddingTop: 10, paddingBottom: 10 }} />
                        </View>
                        <View style={{ width: "82%" }}>
                            <TextInput
                                onChangeText={LinkedIn => this.setState({ LinkedIn })}
                                value={this.state.LinkedIn}
                                placeholder={"https://linkedin.com/popcard"}
                                placeholderTextColor="#007bb6"
                                style={{ ...styles.input, borderColor: "#007bb6", width:"100%" }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity style={{ ...styles.submitButton }} onPress={this.submithandle}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
              
            </View>

        );
    }
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        height: 50,
        borderWidth: 1,
        borderColor: "#080572",
        paddingLeft: 10,
        width: "120%",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
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
        minWidth: "100%",
        alignItems: "center",
        paddingTop: 15,
        height: 50,
        borderRadius: 10
    },

    steps: {
        maxHeight: 50,
        marginTop: 20,
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