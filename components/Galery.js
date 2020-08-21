import React from 'react';
import { Image, View, FlatList, ScrollView, TouchableOpacity, AsyncStorage, Dimensions, ImageBackground, StyleSheet, TextInput, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import { Card, Appbar, Avatar } from 'react-native-paper';
import ImageView from 'react-native-image-view';
import {RandomContext} from './../App.js'
const Galery = (props)=>{ 
    const randomcode = React.useContext(RandomContext);   
    const [isImageViewVisible, setIsImageViewVisible] = React.useState(false);
    const [FlatListItems, setFlatListItems] = React.useState([])
    const [Img, setImg] = React.useState('');
    const [ProfileImg, setProfileImg] = React.useState('');
    const [Name, setName] = React.useState('');
    const [Company, setCompany] = React.useState('');
    const [Designation, setDesignation] = React.useState('');
    
    
   const ImgView = (name) => {
       setImg(name)
        setIsImageViewVisible(true)
    }

    const close = () =>{
        setIsImageViewVisible(false)
    }

    React.useEffect(()=>{
        fetchgallery();
    },[randomcode])

const fetchgallery = async() =>{
    const mobile = await AsyncStorage.getItem('mobile');
    fetch('https://ipmsmpcs.com/popcard/api/Profile',{
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            Mobile:mobile
        })
    })
    .then((res)=>res.json())
    .then((res)=>{
        console.log('ljl')
        setFlatListItems(res.Gallery)
        setName(res.data.Name)
        setDesignation(res.data.Designation)
        setCompany(res.data.Company)
        setProfileImg(res.data.Image)
    })
}

const images = [
    {
        source: {
            uri: 'https://ipmsmpcs.com/popcard/public/assets/uploads/'+Img,
        },
        
        width: 806,
        height: 720,
        dataSource: {},
    }
];
        return(
            <View style={{backgroundColor:"white"}}>
                <Appbar style={styles.appbar}>
                    <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                        <Ionicons name="menu" size={30} color='black' style={{ marginLeft: '3%' }} />
                    </TouchableOpacity>
                    <Text style={styles.header}>Gallery</Text>
                </Appbar>
                <View style={{alignItems:"center", marginTop:40, paddingBottom:10, marginBottom:10, borderColor:"#e6e6e6", borderBottomWidth:1}}>
                    <Image source={{uri:'https://ipmsmpcs.com/popcard/public/assets/uploads/'+ProfileImg}} style={{width:100, marginBottom:20, height:100, borderRadius:100,}} />
                    <Text style={{fontWeight:"bold"}}>{Name}</Text>
                    <Text >{Designation}</Text>
                    <Text >{Company}</Text>
                </View>
                <ImageView
                    images={images}
                    imageIndex={0}
                    isVisible={isImageViewVisible}
                    renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
                    onClose={()=>close()}
                />
                <ScrollView style={{minHeight:500}}>
                <FlatList style={{ marginTop:0 }} data={FlatListItems} numColumns={3}
                renderItem={({ item }) => (
                        <View style={{ justifyContent:"space-between", width:"33%", marginLeft:1, marginTop:5, }}>
                            <TouchableOpacity onPress={() => ImgView(item.Image)}>
                            <Image source={{uri:'https://ipmsmpcs.com/popcard/public/assets/uploads/'+item.Image}} style={{width:"100%", height:120, borderRadius:5}} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                
                </ScrollView>
                
            </View>
        );
    }
export default Galery;

const styles = StyleSheet.create({
    appbar: {
        backgroundColor: "white"
    },
    header: {
        fontWeight: "bold",
        fontSize: 16
    }
});