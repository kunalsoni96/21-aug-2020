import React from 'react';
import { Image, SafeAreaView, TouchableHighlight, AsyncStorage, StatusBar, Fragment, View, FlatList, ScrollView, TouchableOpacity, Dimensions, ImageBackground, StyleSheet, TextInput, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Appbar } from 'react-native-paper';
import { Input, Item, Label } from 'native-base';
import Textarea from 'react-native-textarea';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import RNFetchBlob from 'rn-fetch-blob';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from './AuthContext.js'

const AddAbout = (props)  => {
        const {reflact} = React.useContext(AuthContext);
        const[AboutTitle, setAboutTitle] = React.useState('')
        const[AboutDescription, setAboutDescription] = React.useState('')
        const [perror, setPerror] = React.useState("");
        const [Mobile, setMobile] = React.useState("");
        const [flashmessage, setFlashmessage] = React.useState("");
        const [loader, setLoader] = React.useState(false);

    React.useEffect(()=>{
        mobile();
        fetchabout();
        const timer = setTimeout(() => {
            setFlashmessage(false)
        }, 3000);
        return () => clearTimeout(timer);
    },[flashmessage])

    const mobile = async () => {
        const mobile = await AsyncStorage.getItem('mobile');
        setMobile(mobile)
    }

    const submithandle = () =>{
        setLoader(true)
        if(AboutTitle!==''  ||  AboutDescription !==''){
        fetch('https://ipmsmpcs.com/popcard/api/AddAbout',{
            method:"POST",
            body:JSON.stringify({
                AboutTitle:AboutTitle,
                AboutDescription:AboutDescription,
                Mobile:Mobile
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        .then((resp) => {
            console.log('success');
            reflact()
            setLoader(false)
            setAboutDescription("")
            setAboutTitle("")
            setPerror("");
            setFlashmessage(true)
            flash();
        })
        .catch((err) => {
        setLoader(false)
         console.log(err)
        })
          
        }
        else{
          setPerror('This field is required')
        }
    }

    const fetchabout = async() =>{
        const mobile = await AsyncStorage.getItem('mobile');
        fetch('https://ipmsmpcs.com/popcard/api/Profile',{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:"POST",
            body:JSON.stringify({
                Mobile:mobile
            })
        })
        .then((res)=>res.json())
        .then((res)=>{
            setAboutDescription(res.data.AboutDescription)
            setAboutTitle(res.data.AboutTitle)
        })
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
                    <Text style={styles.header}>Add About</Text>
                </Appbar>
                {flashmessage === true ?
                    <Card style={{ backgroundColor: "#00AD3F", padding: 20, position: "absolute", top: 50, width: "100%" }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}> Successfully! About Added.</Text>
                    </Card>
                    : null}

                <ScrollView style={{ flex: 1, backgroundColor: "white", marginTop: 0, paddingHorizontal: 20 }}>
                    <Card style={{ paddingVertical: 50, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 20, alignSelf: "center", fontWeight: "bold" }}>Add About Your Company</Text>
                       <Item style={{borderColor:"white", marginBottom:-10, marginTop:20}}>
                           <Label>About Title</Label>
                        </Item>
                        <Item>
                            <Input value={AboutTitle} onChangeText={(AboutTitle) => setAboutTitle(AboutTitle)} />
                        </Item>
                        {AboutTitle==='' ? 
                        <Text style={{color:"red", marginTop:5}}>{perror}</Text>
                        :null}
                        <Item style={{ borderColor: "white", marginBottom: -10, marginTop: 20 }}>
                            <Label>About Description</Label>
                        </Item>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={(AboutDescription) => setAboutDescription(AboutDescription)}
                            defaultValue={AboutDescription}
                            
                            maxLength={120}
                            
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                            
                        />
                        {AboutDescription==='' ? 
                        <Text style={{color:"red", marginTop:5}}>{perror}</Text>
                        :null}

                         
                        <View style={{ marginTop: 20 }}>
                            {2 > 1 ?
                                <TouchableOpacity  style={{ ...styles.submitButton }} onPress={()=>submithandle()}>
                                    <Text style={{ color: "white", fontWeight: "bold" }}>Submit Now</Text>
                                </TouchableOpacity>
                                : <View style={styles.submitButton2} disabled><Text style={{ color: "gray", fontWeight: "bold" }}>Submit Now</Text></View>}
                        </View>
                    </Card>
                </ScrollView>


                
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

    textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: 'white',
        borderBottomWidth:1,
        marginTop:30,
        borderColor:"#e6e6e6"
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
    },

    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },

    images: {
        width: "100%",
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },

    btnParentSection: {
        alignItems: 'center',
        marginTop: 10
    },

    btnSection: {
        width: 300,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    },

    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },


    alertBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // If the mask is to be displayed in a semi-transparent state, it must be set here. The a in the reba controls the transparency, which is in the range of 0.0 to 1.0.
    },

    alertBox: {
        width: "100%",
        height: 250,
        backgroundColor: 'white',
    },

    
alertBackground:{
    borderWidth:1,
    borderColor:"#e6e6e6",
    
    alignItems:'center',
    justifyContent:'center',
         backgroundColor: 'rgba(0, 0, 0, 0.5)', // If the mask is to be displayed in a semi-transparent state, it must be set here. The a in the reba controls the transparency, which is in the range of 0.0 to 1.0.
},
 
alertBox: {
    width:"100%",
    height:200,
    backgroundColor:'white',
},


});

export default AddAbout