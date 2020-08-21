import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, AsyncStorage, TextInput, Image, StyleSheet } from 'react-native';
import { Card, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RandomContext} from './../App.js'
const About = (props) => {
    const randomcode = React.useContext(RandomContext);
    const[AboutTitle,setAboutTitle] = React.useState("");
    const[AboutDescription,setAboutDescription] = React.useState("");
    React.useEffect(()=>{
        fetchabout();
    },[randomcode])

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
            <View>
                <Appbar style={styles.appbar}>
                    <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                        <Icon name="menu" size={30} color='black' style={{ marginLeft: '3%' }} />
                    </TouchableOpacity>
                    <Text style={styles.header}>About</Text>
                </Appbar>
            <ScrollView style={{marginBottom:50}}>
                <Card style={{padding:10}}>
                    <Text style={{fontWeight:"bold"}}>{AboutTitle}</Text>

                    <Text>
                        {AboutDescription}
                    </Text>
                </Card>
            <View style={{alignItems:"center", marginTop:10}}>
            {/* <Card style={{width:200, height:50, paddingTop:15}}>
            <TouchableOpacity><Text style={{alignSelf:"center"}}>Download Brochure</Text></TouchableOpacity>
            </Card> */}
            </View>
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
    }
});

export default About