import React, { Component } from "react";
import { Image, View, Picker, ScrollView, AsyncStorage, TouchableOpacity, StyleSheet, TextInput, Text } from "react-native";
import { Appbar } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

export default class StepThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: "",       
            WhatsappNumber:"",
            Address:"",
            City:"Raipur",
            State:"Chhattisgarh",
            WebsiteURL:"",   
            Mobile:"",
            FetchState:[],
            FetchCity:[]
        };

        this.updateCity = this.updateCity.bind(this)
        this.updateState = this.updateState.bind(this)
        this.submithandle = this.submithandle.bind(this)
    }

    updateCity = (City) => {
        this.setState({ City : City })
    }

    updateState = (State) => {
        this.setState({State:State, spinner:true})

        fetch('https://ipmsmpcs.com/popcard/api/City', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                State:State
            }),
        })
            .then((r) => r.json())
            .then((r) => {
                
                this.setState({
                    FetchCity: r.city,
                    spinner: false
                })

            })
            .catch((error) => {
                console.log(error)
            })
    }

   async componentDidMount() {
       const mobile = await AsyncStorage.getItem('mobile');
        this.setState({
            spinner: true,
            Mobile: mobile,
        });

        fetch('https://ipmsmpcs.com/popcard/api/State',{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
                   
        })
        .then((r)=>r.json())
        .then((r)=>{
            console.log(r.state)
            this.setState({
                FetchState:r.state,
                spinner:false
            })
            
        })
        .catch((error)=>{
            console.log(error)
        })


       fetch('https://ipmsmpcs.com/popcard/api/DefaultCity', {
           method: "POST",
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
         
       })
           .then((r) => r.json())
           .then((r) => {
               console.log(r.state)
               this.setState({
                   FetchCity: r.city,
                   spinner: false
               })

           })
           .catch((error) => {
               console.log(error)
           })
    }

    submithandle() {
        this.setState({
            spinner: true,
        });
        fetch('https://ipmsmpcs.com/popcard/api/CreateAddress', {
            method: "POST",
            body: JSON.stringify({
                Address: this.state.Address,
                City: this.state.City,
                State: this.state.State,
                WhatsappNumber: this.state.WhatsappNumber,
                WebsiteURL: this.state.WebsiteURL,
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
                this.props.navigation.navigate('StepFour');
            })
        }

        
    render() {
        
        const city = [{ dlabel: "Bilaspur" }, { dlabel: "Raipur" }, { dlabel: "Bhatapara" }];
        const state = [{ dlabel: "Chhattisgarh" }, { dlabel: "Jharkhand" }, { dlabel: "Madhyapradesh" }];
        // alert(state)
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
                    <View style={styles.step}>
                        <Text style={styles.steptext}>2</Text>
                    </View>
                    
                    <View style={styles.border}></View>
                    <View style={{ ...styles.step, backgroundColor: "#080572", marginLeft: 0 }}>
                        <Text style={{ ...styles.steptext, color: "white" }}>3</Text>
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
                    <View style={styles.step}>
                        <Text style={styles.steptext}>6</Text>
                    </View>
                </ScrollView>
                <View>
                    <Text style={styles.header}>Address</Text>
                </View>
                <View style={{ alignItems: "center", flex: 1 }}>
                    <TextInput
                        onChangeText={(WhatsappNumber) => this.setState({ WhatsappNumber })}
                        value={this.state.text}
                        placeholder={"Whatsapp Number"}
                        placeholderTextColor="#080572"
                        keyboardType={"numeric"}
                        style={styles.input} />

                    <TextInput
                        onChangeText={(Address) => this.setState({ Address })}
                        value={this.state.Address}
                        placeholder={"Address"}
                        placeholderTextColor="#080572"
                        style={styles.input} />

                    <View style={styles.input}>
                        <Picker style={{ color: "#080572", marginLeft: -10 }} selectedValue={this.state.State} onValueChange={this.updateState}>
                            {this.state.FetchState.map(row => (
                                <Picker.Item label={row.State} value={row.State} />
                            ))}
                        </Picker>
                    </View>
                    
                    <View style={styles.input}>
                        <Picker style={{ color: "#080572", marginLeft: -10 }} selectedValue={this.state.City} onValueChange={this.updateCity}>
                            {this.state.FetchCity.map(row => (
                                <Picker.Item label={row.City} value={row.City} />
                            ))}

                        </Picker>
                    </View>

                    
                    <TextInput
                        onChangeText={(WebsiteURL) => this.setState({ WebsiteURL })}
                        value={this.state.WebsiteURL}
                        placeholder={"Website URL"}
                        placeholderTextColor="#080572"
                        style={styles.input} />
                   
                    
                        {this.state.Address.length > 7 && this.state.WhatsappNumber.length > 8 ?
                            <TouchableOpacity style={{ ...styles.submitButton }} onPress={this.submithandle}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Next</Text>
                            </TouchableOpacity>
                            : <View style={styles.submitButton2} disabled><Text style={{ color: "gray", fontWeight: "bold" }}>Next</Text></View>}
                    
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