import React, { Component } from "react";
import { Image, View, Picker, Dimensions, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, AsyncStorage, TextInput, Text } from "react-native";
import { Appbar } from 'react-native-paper';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from './AuthContext'
const { width, height } = Dimensions.get('window');
const BusinessTemplate = (props)=> {
    const {reflact} = React.useContext(AuthContext)
    const [radioimageselected, setRadioimageselected] = React.useState("");
    const [spinner, setSpinner] = React.useState(false);
    const [Mobile, setMobile] = React.useState("");
    const [fetchcategory, setFetchcategory] = React.useState([]);
    const [fetchtemplate, setFetchtemplate] = React.useState([]);
    const [fetchcategorytemplate, setFetchcategorytemplate] = React.useState([]);
    const [TemplateName, setTemplateName] = React.useState("");
    const [Search, setSearch] = React.useState("")

  const  search_by_category = (id) => {
        setSpinner(true)
        fetch('https://ipmsmpcs.com/popcard/api/FetchTemplateCategory', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                id: id
            })
        })

            .then((res) => res.json())
            .then((res) => {
                console.log('lkkll' + res.data)
                setFetchtemplate(res.data)
                setSpinner(false)
            })
    }

    React.useEffect(()=>{
        f_fetchcategory();
        f_fetchtemplate();
    },[])

    const f_fetchcategory = async() => {
        const mobile = await AsyncStorage.getItem('mobile');
        setMobile(mobile)

        fetch('https://ipmsmpcs.com/popcard/api/FetchCategory', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                Mobile: mobile
            })
        })
            .then((res) => res.json())
            .then((res) => {
            setFetchcategory(res.Status)
            setSpinner(false)

            })
            .catch((error) => {
                console.log('kunal soni' + error)
            })
    }

const f_fetchtemplate = async() =>{
        fetch('https://ipmsmpcs.com/popcard/api/FetchTemplate', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                Mobile: Mobile
            })
        })
            .then((res) => res.json())
            .then((res) => {
                console.log('vishal' + res.Status)
                setFetchtemplate(res.Status)
                setSpinner(false)
            })

            .catch((error) => {
                console.log('kunal soni' + error)
            })
    }

   const onSelect = (index, value)  => {
        setRadioimageselected(`${value}`)
    }

    const submithandle = () => {
       setSpinner(true)
        fetch('https://ipmsmpcs.com/popcard/api/CreateTemplate', {
            method: "POST",
            body: JSON.stringify({
                TemplateId: radioimageselected,
                Mobile: Mobile
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setSpinner(false)
                reflact();
            })
    }


   const all = () => {
        setSpinner(true)
        fetch('https://ipmsmpcs.com/popcard/api/FetchTemplate', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                Mobile: Mobile
            })
        })
            .then((res) => res.json())
            .then((res) => {
                console.log('vishal' + res.Status)
              
                setFetchtemplate(res.Status)
                setSpinner(false)
            })

            .catch((error) => {
                console.log('kunal soni' + error)
            })
    }

   const search = () => {
        fetch('https://ipmsmpcs.com/popcard/api/FetchTemplateSearch', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                TemplateName: Search
            })
        })
            .then((res) => res.json())
            .then((res) => {
                console.log('vishal' + res.Status)

                setFetchtemplate(res.Status)
                setSpinner(false)
            })

            .catch((error) => {
                console.log('kunal soni' + error)
            })
    }

        return (

            <View style={{flex:1, backgroundColor:"white"}}>
                <Spinner
                    visible={spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <Appbar style={styles.appbar}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-back" size={30} color='black' style={{ marginLeft: '3%' }} />
                    </TouchableOpacity>
                    <Text style={styles.header}>Business Template</Text>
                </Appbar>
                <View style={{paddingHorizontal:10, marginTop:20}}>
                    <Text style={{...styles.header, marginBottom:10, marginLeft:5}}>Please Select Template</Text>
                    <TextInput placeholder="Search" onKeyPress={() => search()} style={{ borderWidth: 1, borderColor: "#e6e6e6", borderRadius: 30, height: 40, paddingLeft: 10 }} value={Search} onChangeText={(Search) => setSearch(Search)} />
                    <ScrollView horizontal={true} style={{marginBottom:10}} showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => all()} style={{ backgroundColor: "#080572", padding: 10, borderRadius: 5, paddingHorizontal: 20, marginTop: 10 }}>
                                <Text style={{ color: "white" }}>All</Text>
                            </TouchableOpacity>
                            {fetchcategory.map(row => (
                                <TouchableOpacity onPress={() => search_by_category(row.id)} style={{ backgroundColor: "white", borderWidth: 1, borderColor: "#e6e6e6", marginLeft: 10, padding: 10, borderRadius: 5, paddingHorizontal: 20, marginTop: 10 }}>
                                    <Text style={{ color: "#080572" }}>{row.Name}</Text>
                                </TouchableOpacity>
                            ))}

                        </View>

                    </ScrollView>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 20, paddingHorizontal:10, maxHeight: Dimensions.get('window').height, paddingBottom: 50 }}>
                    <View >
                        <RadioGroup
                            onSelect={(index, value) => onSelect(index, value)}
                            size={24}
                            thickness={5}
                            color='#9575b2'
                            highlightColor='black'
                            style={{ borderRadius: 10 }}
                        >

                            {fetchtemplate.map(row => (
                                <RadioButton
                                    value={row.Image}
                                    style={{ maxHeight: 200, padding: 0, minWidth: "120%", marginTop: 5, backgroundColor: "pink" }}>
                                    <ImageBackground style={{ zIndex: 0 }} source={{ uri: 'https://ipmsmpcs.com/popcard/public/assets/uploads/' + row.Image }} style={{ minWidth: "100%", height: 200, marginLeft: -57 }} >
                                        {radioimageselected === row.Image ?
                                            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1 }}>

                                            </View>
                                            : null}
                                    </ImageBackground>
                                </RadioButton>
                            ))}


                        </RadioGroup>
                    </View>
                </ScrollView>
                <View  style={{paddingHorizontal:10}}>
                    {radioimageselected !== '' ?
                        <TouchableOpacity style={{ ...styles.submitButton }} onPress={()=>submithandle()}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>Submit Now</Text>
                        </TouchableOpacity>
                        : <View style={styles.submitButton2} disabled><Text style={{ color: "gray", fontWeight: "bold" }}>Next</Text></View>}
                </View>
            </View>

        );
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
        paddingHorizontal: 20,
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
    
        marginBottom: 10,
        marginTop:10,
        minWidth: "100%",
        alignItems: "center",
        paddingTop: 15,
        height: 50,
        borderRadius: 10
    },

    steps: {
        maxHeight: 50,
        marginTop: 20,
        height: 100,
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

    appbar: {
        backgroundColor: "white"
    },
    header: {
        fontWeight: "bold",
        fontSize: 16
    }

})


export default BusinessTemplate