import React from 'react';
import {View, StyleSheet, Image, AsyncStorage, ImageBackground} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from './AuthContext'
import { RandomContext } from './../App.js'



const DrawerContent = (props) =>{
    const [BackgroundImage, setBackgroundImage] = React.useState('');
    const[Image, setImage] = React.useState("");
    const[Name, setName] = React.useState("");
    const[CompanyName, setCompanyName] = React.useState("");
    const[Designation, setDesignation] = React.useState("");
    const { SignOut } = React.useContext(AuthContext);  
    const randomcode = React.useContext(RandomContext)
    React.useEffect(()=>{
        profile();
    },[randomcode])



    const profile = async() =>{
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
            console.log('res.data')
            setName(res.data.Name)
            setCompanyName(res.data.Company)
            setDesignation(res.data.Designation)
            setImage(res.data.Image)
            setBackgroundImage(res.data.TemplateId)
        })
    }
        return(
            <View style={{flex:1}}>
                <DrawerContentScrollView {...props}>
                    <View>
                    <ImageBackground source={{uri:'https://ipmsmpcs.com/popcard/public/assets/uploads/'+BackgroundImage}} style={{width:"100%", height:130, marginTop:-4, paddingTop:30}}>
                        <View style={styles.UserInfo}>
                            <View style={{width:"30%"}}>
                            <Avatar.Image source={{uri:'https://ipmsmpcs.com/popcard/public/assets/uploads/'+Image}} style={{borderWidth:2, width:68, height:68, borderRadius:100, borderColor:"white"}}/>
                            </View>
                                <View style={{ width: "70%" }}>
                                <Title style={{color:"white"}}>{Name}</Title>
                            <Text style={{color:"white"}}>{Designation}</Text>
                            </View>
                            
                        </View>
                        </ImageBackground>
                    </View>
                    <Drawer.Section>
                        <DrawerItem label="Home" onPress={() => props.navigation.navigate('MainTab')} icon={({ color, size }) => (<Icon name="home" style={{ fontSize: 28, color: "black", marginRight:-20 }} />)} />

                        <DrawerItem onPress={()=>props.navigation.navigate('MyAccount')} label="MyAccount" icon={({ color, size }) => (<Icon name="account-circle" style={{ fontSize: 25, color: "black", marginRight: -20}} />)} />

                        <DrawerItem label="Refer" icon={({ color, size }) => (<Icon name="attachment" style={{ fontSize: 25, color: "black", marginRight: -20 }} />)} />

                        <DrawerItem onPress={()=>props.navigation.navigate('AddProduct')} label="Add Product" icon={({ color, size }) => (<Icon name="shop" style={{ fontSize: 25, color: "black", marginRight: -20 }} />)} />

                        {/* <DrawerItem label="Franchise Option" icon={({ color, size }) => (<Icon name="trending-up" style={{ fontSize: 25, color: "black", marginRight: -20 }} />)} /> */}

                        <DrawerItem onPress={() => props.navigation.navigate('AddAbout')} label="Add About" icon={({ color, size }) => (<Icon name="control-point-duplicate" style={{ fontSize: 25, color: "black", marginRight: -20 }} />)} />

                        <DrawerItem onPress={() => props.navigation.navigate('AddGallery')} label="Add Gallery" icon={({ color, size }) => (<Icon name="control-point-duplicate" style={{ fontSize: 25, color: "black", marginRight: -20 }} />)} />

                        <DrawerItem onPress={() => props.navigation.navigate('AddUPI')} label="Update BankDetails" icon={({ color, size }) => (<Icon name="control-point-duplicate" style={{ fontSize: 25, color: "black", marginRight: -20 }} />)} />

                        <DrawerItem onPress={() => props.navigation.navigate('PrivacyPolicy')} label="Privacy Policy" icon={({ color, size }) => (<Icon name="security" style={{ fontSize: 25, color: "black", marginRight: -20 }} />)} />

                        <DrawerItem onPress={() => props.navigation.navigate('TermsNConditions')} label="Terms N Conditions" icon={({ color, size }) => (<Icon name="control-point-duplicate" style={{ fontSize: 25, color: "black", marginRight: -20 }} />)} />
                    </Drawer.Section>  
                </DrawerContentScrollView>
                <Drawer.Section>
                    <DrawerItem onPress={() => SignOut()} label="Sign Out" icon={({ color, size }) => (<Icon name="remove-circle-outline" style={{ fontSize: 25, color: "black", marginRight: -20 }} />)} />
                </Drawer.Section>               
            </View>
        );
}

const styles = StyleSheet.create({
   
    UserInfo:{
        paddingLeft:20,
        flexDirection:"row"
    },

  
})

export default DrawerContent