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


const AddProduct = (props)  => {
        const {reflact} = React.useContext(AuthContext);
        const [ProductTitle, setProductTitle] = React.useState("");
        const [ProductDescription, setProductDescription] = React.useState("");
        const [ProductPrice, setProductPrice] = React.useState("");
        const [avatarSource, setAvatarSource] = React.useState("");
        const [invalid, setInvalid] = React.useState("");
        const [Mobile, setMobile] = React.useState("");
        const [modalVisible, setModalVisible] = React.useState(false);
        const [fileUri, setFileUri] = React.useState("");
        const [img, setImg] = React.useState("");

        const [perror, setPerror] = React.useState("");
        const [flashmessage, setFlashmessage] = React.useState("");
        const [loader, setLoader] = React.useState(false);

    const _closeModal = () => {
        setModalVisible(false)
    }

    React.useEffect(()=>{
        mobile();
        const timer = setTimeout(() => {
            setFlashmessage(false)
        }, 3000);
        return () => clearTimeout(timer);
    },[flashmessage])

    const mobile = async () => {
        const mobile = await AsyncStorage.getItem('mobile');
        setMobile(mobile)
    }

const _openCamera = () => {
    ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
    }).then(image => {
        let source = { uri: image.path };
        
        setFileUri(image.path)
        setAvatarSource(source)
        setModalVisible(false)
        setImg(image)
    });
    }

    const _openPicker = () =>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image)
            let source = { uri: image.path };
            setFileUri(image.path)
        setAvatarSource(source)
        setModalVisible(false)
        setImg(image)
        });
    }

    const uploadimage = () =>{
        if(ProductTitle===''  ||  ProductDescription ===''  || ProductPrice ==='' || fileUri===''){
            setPerror('This field is required')
        }
        else{
        setLoader(true)
        RNFetchBlob.fetch('POST', 'https://ipmsmpcs.com/popcard/api/AddProduct', {
            'Content-Type': 'multipart/form-data',
        },
         [
            { name: 'image', filename: 'image.png', data: RNFetchBlob.wrap(fileUri) },
    
            {
                name: 'ProductTitle', data: ProductTitle
            },
            {
                name: 'ProductDescription', data: ProductDescription
            },
            {
                name: 'ProductPrice', data: ProductPrice
            },
            {
                name: 'Mobile', data: Mobile
            }
        ])
        .then((resp) => {
            console.log('success');
            reflact()
            setLoader(false)
            setProductDescription("")
            setProductPrice("")
            setProductTitle("")
            setFileUri("");
            setPerror("");
            setFlashmessage(true)
            flash();
        })
        .catch((err) => {
         console.log(err)
        })
        }
    }


    const renderFileUri = () => {
        if (fileUri) {
            return <Image
                source={{ uri: fileUri }}
                style={styles.images}
            />
        } else {
            return <Image
                source={require('./../assets/images/galeryImages.jpg')}
                style={styles.images}
            />
        }
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
                    <Text style={styles.header}>Add Product</Text>
                </Appbar>
                {flashmessage === true ?
                    <Card style={{ backgroundColor: "#00AD3F", padding: 20, position: "absolute", top: 50, width: "100%" }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}> Successfully! Product Created.</Text>
                    </Card>
                    : null}

                <ScrollView style={{ flex: 1, backgroundColor: "white", marginTop: 0, paddingHorizontal: 20 }}>
                    <Card style={{ paddingVertical: 50, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 20, alignSelf: "center", fontWeight: "bold" }}>Create A New Product</Text>
                       <Item style={{borderColor:"white", marginBottom:-10, marginTop:20}}>
                           <Label>Product Title</Label>
                        </Item>
                        <Item>
                            <Input value={ProductTitle} onChangeText={(ProductTitle) => setProductTitle(ProductTitle)} />
                        </Item>
                        {ProductTitle==='' ? 
                        <Text style={{color:"red", marginTop:5}}>{perror}</Text>
                        :null}
                        <Item style={{ borderColor: "white", marginBottom: -10, marginTop: 20 }}>
                            <Label>Product Description</Label>
                        </Item>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={(ProductDescription) => setProductDescription(ProductDescription)}
                            defaultValue={ProductDescription}
                            
                            maxLength={120}
                            
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                            
                        />
                        {ProductDescription==='' ? 
                        <Text style={{color:"red", marginTop:5}}>{perror}</Text>
                        :null}

                        <Item style={{ borderColor: "white", marginBottom: -10, marginTop: 20 }}>
                            <Label>Product Price</Label>
                        </Item>
                        <Item>
                            <Input keyboardType={"numeric"} value={ProductPrice} onChangeText={(ProductPrice) => setProductPrice(ProductPrice)} />
                        </Item>
                        {ProductPrice==='' ? 
                        <Text style={{color:"red", marginTop:5}}>{perror}</Text>
                        :null}

                      
                                <View>
                                    <View style={styles.ImageSections}>
                                <Card style={{ width: "100%" }}>
                                    <View>
                                        {renderFileUri()}
                                        {fileUri==='' ? 
                        <Text style={{color:"red", marginTop:5}}>{perror}</Text>
                        :null}
                                    </View>
                                </Card>
                                    </View>

                                    <View style={styles.btnParentSection}>
                                        <TouchableOpacity onPress={()=>setModalVisible(true)} style={styles.btnSection}  >
                                            <Text>Upload Image</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                         
                        <View style={{ marginTop: 20 }}>
                            {2 > 1 ?
                                <TouchableOpacity  style={{ ...styles.submitButton }} onPress={()=>uploadimage()}>
                                    <Text style={{ color: "white", fontWeight: "bold" }}>Submit Now</Text>
                                </TouchableOpacity>
                                : <View style={styles.submitButton2} disabled><Text style={{ color: "gray", fontWeight: "bold" }}>Submit Now</Text></View>}
                        </View>
                    </Card>
                </ScrollView>


                
                    <Modal
                        visible={modalVisible}
                        animationType={'fade'}
                        transparent={true}
                        onRequestClose={() => onRequestClose()}
                    >
                        <View style={styles.alertBackground}>
                            <View style={{...styles.alertBox, alignItems:"center", paddingTop:10}}>
                            <Card style={{height:50}}>
                            <TouchableHighlight underlayColor={'#F5F5F5'} style={{  alignItems:"center", height:50, minWidth:"100%", alignSelf:"flex-start" ,borderRadius:5, padding:10}} onPress={()=>_openCamera()}>
                                <Text style={{marginTop:5}}><Icon name="camera" /> Open camera</Text>
                                </TouchableHighlight>
                            </Card>
                            
                            <Card style={{ height: 50, marginTop:5 }}>
                                <TouchableHighlight underlayColor={'#F5F5F5'} style={{ alignItems: "center", height: 50, minWidth: "100%", alignSelf: "flex-start", borderRadius: 5, padding: 10 }} onPress={()=>_openPicker()}>
                                    <Text style={{ marginTop: 5 }}><Icon name="file-image-o" /> Pick From Gallery</Text>
                                </TouchableHighlight>
                            </Card>
                            
                                <TouchableHighlight underlayColor={'#F5F5F5'} onPress={()=>_closeModal}>
                                    <Text style={styles.modalItem}>Cancel</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                
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

modalItem:{
     marginTop:20,
     
}
});

export default AddProduct