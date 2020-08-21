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


    const AddUPI = (props)  => {
            const {reflact} = React.useContext(AuthContext);
            
            const [Mobile, setMobile] = React.useState("");
            const [AccountNumber, setAccountNumber] = React.useState("");
            const [BankName, setBankName] = React.useState("");
            const [BranchName, setBranchName] = React.useState("");
            const [GSTNumber, setGSTNumber] = React.useState("");
            const [AccountType, setAccountType] = React.useState("");
            const [IFSCCode, setIFSCCode] = React.useState("");
            
            const [modalVisible1, setModalVisible1] = React.useState(false);
            const [modalVisible2, setModalVisible2] = React.useState(false);
            const [modalVisible3, setModalVisible3] = React.useState(false);
            const [modalVisible4, setModalVisible4] = React.useState(false);
           
            const [fileUri1, setFileUri1] = React.useState("");
            const [avatarSource1, setAvatarSource1] = React.useState("");
            const [img1, setImg1] = React.useState("");


            const [fileUri2, setFileUri2] = React.useState("");
            const [avatarSource2, setAvatarSource2] = React.useState("");
            const [img2, setImg2] = React.useState("");


            const [fileUri3, setFileUri3] = React.useState("");
            const [avatarSource3, setAvatarSource3] = React.useState("");
            const [img3, setImg3] = React.useState("");


            const [fileUri4, setFileUri4] = React.useState("");
            const [avatarSource4, setAvatarSource4] = React.useState("");
            const [img4, setImg4] = React.useState("");
            

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

    const _openCamera1 = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            let source = { uri: image.path };
            
            setFileUri1(image.path)
            setAvatarSource1(source)
            setModalVisible1(false)
            setImg(image)
        });
        }

        const _openPicker1 = () =>{
            
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(image => {
                console.log(image)
                let source = { uri: image.path };
                setFileUri1(image.path)
            setAvatarSource1(source)
            setModalVisible1(false)
            setImg1(image)
            
            });
        }





        const _openCamera2 = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            let source = { uri: image.path };
            
            setFileUri2(image.path)
            setAvatarSource2(source)
            setModalVisible2(false)
            setImg2(image)
        });
        }

        const _openPicker2 = () =>{
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(image => {
                console.log(image)
                let source = { uri: image.path };
                setFileUri2(image.path)
            setAvatarSource2(source)
            setModalVisible2(false)
            setImg2(image)
            });
        }





        const _openCamera3 = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            let source = { uri: image.path };
            
            setFileUri3(image.path)
            setAvatarSource3(source)
            setModalVisible3(false)
            setImg3(image)
        });
        }

        const _openPicker3 = () =>{
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(image => {
                console.log(image)
                let source = { uri: image.path };
                setFileUri3(image.path)
            setAvatarSource3(source)
            setModalVisible3(false)
            setImg3(image)
            });
        }


        const _openCamera4 = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            let source = { uri: image.path };
            
            setFileUri4(image.path)
            setAvatarSource4(source)
            setModalVisible4(false)
            setImg4(image)
        });
        }

        const _openPicker4 = () =>{
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(image => {
                console.log(image)
                let source = { uri: image.path };
                setFileUri4(image.path)
            setAvatarSource4(source)
            setModalVisible4(false)
            setImg4(image)
            });
        }

        const uploadimage = () =>{
            
            setLoader(true)
            RNFetchBlob.fetch('POST', 'https://ipmsmpcs.com/popcard/api/AddGallery', {
                'Content-Type': 'multipart/form-data',
            },
            [
                { name: 'image', filename: Mobile+'.jpg', data: RNFetchBlob.wrap(fileUri1) },
                { name: 'image', filename: Mobile+'.jpg', data: RNFetchBlob.wrap(fileUri2) },
                { name: 'image', filename: Mobile+'.jpg', data: RNFetchBlob.wrap(fileUri3) },
                { name: 'image', filename: Mobile+'.jpg', data: RNFetchBlob.wrap(fileUri4) },
        
            ])
            .then((resp) => {
                console.log('success');
                reflact()
                setLoader(false)
                
                setPerror("");
                setFlashmessage(true)
                flash();
            })
            .catch((err) => {
            console.log(err)
            })
            }


        const renderFileUri1 = () => {
            if (fileUri1) {
                return <Image
                    source={{ uri: fileUri1 }}
                    style={styles.images}
                />
            } else {
                return <Image
                    source={require('./../assets/images/bhim.jpg')}
                    style={styles.images}
                />
            }
        }

        const renderFileUri2 = () => {
            if (fileUri2) {
                return <Image
                    source={{ uri: fileUri2 }}
                    style={styles.images}
                />
            } else {
                return <Image
                    source={require('./../assets/images/paytm.jpg')}
                    style={styles.images}
                />
            }
        }

        const renderFileUri3 = () => {
            if (fileUri3) {
                return <Image
                    source={{ uri: fileUri3 }}
                    style={styles.images}
                />
            } else {
                return <Image
                    source={require('./../assets/images/phonepay.jpg')}
                    style={styles.images}
                />
            }
        }

        const renderFileUri4 = () => {
            if (fileUri4) {
                return <Image
                    source={{ uri: fileUri4 }}
                    style={styles.images}
                />
            } else {
                return <Image
                    source={require('./../assets/images/googlepay.jpg')}
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
                        <Text style={styles.header}>Bank Details</Text>
                    </Appbar>
                    {flashmessage === true ?
                        <Card style={{ backgroundColor: "#00AD3F", padding: 20, position: "absolute", top: 50, width: "100%" }}>
                            <Text style={{ color: "white", fontWeight: "bold" }}> Successfully! Phtoto Added.</Text>
                        </Card>
                        : null}

                    <ScrollView style={{ flex: 1, backgroundColor: "white", marginTop: 0, paddingHorizontal: 20 }}>
                        <Card style={{ paddingVertical: 50, paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 20, alignSelf: "center", fontWeight: "bold" }}>Update Your Bank Details</Text>
                        <Item style={{marginTop:20}}>
                            
                            <Input placeholder="Account Number" keyboardType={"numeric"} value={AccountNumber} onChangeText={(AccountNumber) => setAccountNumber(AccountNumber)} />
                        </Item>

                        <Item>
                            
                            <Input placeholder="IFSC Code" value={IFSCCode} onChangeText={(IFSCCode) => setIFSCCode(IFSCCode)} />
                        </Item>

                        <Item>
                            
                            <Input placeholder="Bank Name" value={BankName} onChangeText={(BankName) => setBankName(BankName)} />
                        </Item>

                        <Item>
                            
                            <Input placeholder="Branch Name" value={BranchName} onChangeText={(BranchName) => setBranchName(BranchName)} />
                        </Item>

                        <Item>
                            
                            <Input placeholder="Account Type" value={AccountType} onChangeText={(AccountType) => setAccountType(AccountType)} />
                        </Item>

                        <Item>
                            
                            <Input placeholder="GSTNumber" value={GSTNumber} onChangeText={(GSTNumber) => setGSTNumber(GSTNumber)} />
                        </Item>
                                    <View>
                                        <View style={styles.ImageSections}>
                                    <Card style={{ width: "100%" }}>
                                        <View>
                                            {renderFileUri1()}
                                         
                                        </View>
                                    </Card>
                                        </View>

                                        <View style={styles.btnParentSection}>
                                            <TouchableOpacity onPress={()=>setModalVisible1(true)} style={styles.btnSection}  >
                                                <Text>Upload BHIM QR ScreenShot</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                    <View>
                                        <View style={styles.ImageSections}>
                                    <Card style={{ width: "100%" }}>
                                        <View>
                                            {renderFileUri2()}
                             
                                        </View>
                                    </Card>
                                        </View>

                                        <View style={styles.btnParentSection}>
                                            <TouchableOpacity onPress={()=>setModalVisible2(true)} style={styles.btnSection}  >
                                                <Text>Upload Paytm QR Screenshot</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                    <View>
                                        <View style={styles.ImageSections}>
                                    <Card style={{ width: "100%" }}>
                                        <View>
                                            {renderFileUri3()}
                                     
                                        </View>
                                    </Card>
                                        </View>

                                        <View style={styles.btnParentSection}>
                                            <TouchableOpacity onPress={()=>setModalVisible3(true)} style={styles.btnSection}  >
                                                <Text>Upload PhonePay QR Screenshot</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                    <View>
                                        <View style={styles.ImageSections}>
                                    <Card style={{ width: "100%" }}>
                                        <View>
                                            {renderFileUri4()}
                                     
                                        </View>
                                    </Card>
                                        </View>

                                        <View style={styles.btnParentSection}>
                                            <TouchableOpacity onPress={()=>setModalVisible4(true)} style={styles.btnSection}  >
                                                <Text>Upload GooglePay QR Screenshot</Text>
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
                            visible={modalVisible1}
                            animationType={'fade'}
                            transparent={true}
                            onRequestClose={() => onRequestClose()}
                        >
                            <View style={styles.alertBackground}>
                                <View style={{...styles.alertBox, alignItems:"center", paddingTop:10}}>
                                <Card style={{height:50}}>
                                <TouchableHighlight underlayColor={'#F5F5F5'} style={{  alignItems:"center", height:50, minWidth:"100%", alignSelf:"flex-start" ,borderRadius:5, padding:10}} onPress={()=>_openCamera1()}>
                                    <Text style={{marginTop:5}}><Icon name="camera" /> Open camera</Text>
                                    </TouchableHighlight>
                                </Card>
                                
                                <Card style={{ height: 50, marginTop:5 }}>
                                    <TouchableHighlight underlayColor={'#F5F5F5'} style={{ alignItems: "center", height: 50, minWidth: "100%", alignSelf: "flex-start", borderRadius: 5, padding: 10 }} onPress={()=>_openPicker1()}>
                                        <Text style={{ marginTop: 5 }}><Icon name="file-image-o" /> Pick From Gallery</Text>
                                    </TouchableHighlight>
                                </Card>
                                
                                    <TouchableHighlight underlayColor={'#F5F5F5'} onPress={()=>_closeModal}>
                                        <Text style={styles.modalItem}>Cancel</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>

                         <Modal
                            visible={modalVisible2}
                            animationType={'fade'}
                            transparent={true}
                            onRequestClose={() => onRequestClose()}
                        >
                            <View style={styles.alertBackground}>
                                <View style={{...styles.alertBox, alignItems:"center", paddingTop:10}}>
                                <Card style={{height:50}}>
                                <TouchableHighlight underlayColor={'#F5F5F5'} style={{  alignItems:"center", height:50, minWidth:"100%", alignSelf:"flex-start" ,borderRadius:5, padding:10}} onPress={()=>_openCamera2()}>
                                    <Text style={{marginTop:5}}><Icon name="camera" /> Open camera</Text>
                                    </TouchableHighlight>
                                </Card>
                                
                                <Card style={{ height: 50, marginTop:5 }}>
                                    <TouchableHighlight underlayColor={'#F5F5F5'} style={{ alignItems: "center", height: 50, minWidth: "100%", alignSelf: "flex-start", borderRadius: 5, padding: 10 }} onPress={()=>_openPicker2()}>
                                        <Text style={{ marginTop: 5 }}><Icon name="file-image-o" /> Pick From Gallery</Text>
                                    </TouchableHighlight>
                                </Card>
                                
                                    <TouchableHighlight underlayColor={'#F5F5F5'} onPress={()=>_closeModal}>
                                        <Text style={styles.modalItem}>Cancel</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>

                         <Modal
                            visible={modalVisible3}
                            animationType={'fade'}
                            transparent={true}
                            onRequestClose={() => onRequestClose()}
                        >
                            <View style={styles.alertBackground}>
                                <View style={{...styles.alertBox, alignItems:"center", paddingTop:10}}>
                                <Card style={{height:50}}>
                                <TouchableHighlight underlayColor={'#F5F5F5'} style={{  alignItems:"center", height:50, minWidth:"100%", alignSelf:"flex-start" ,borderRadius:5, padding:10}} onPress={()=>_openCamera3()}>
                                    <Text style={{marginTop:5}}><Icon name="camera" /> Open camera</Text>
                                    </TouchableHighlight>
                                </Card>
                                
                                <Card style={{ height: 50, marginTop:5 }}>
                                    <TouchableHighlight underlayColor={'#F5F5F5'} style={{ alignItems: "center", height: 50, minWidth: "100%", alignSelf: "flex-start", borderRadius: 5, padding: 10 }} onPress={()=>_openPicker3()}>
                                        <Text style={{ marginTop: 5 }}><Icon name="file-image-o" /> Pick From Gallery</Text>
                                    </TouchableHighlight>
                                </Card>
                                
                                    <TouchableHighlight underlayColor={'#F5F5F5'} onPress={()=>_closeModal}>
                                        <Text style={styles.modalItem}>Cancel</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>

                         <Modal
                            visible={modalVisible4}
                            animationType={'fade'}
                            transparent={true}
                            onRequestClose={() => onRequestClose()}
                        >
                            <View style={styles.alertBackground}>
                                <View style={{...styles.alertBox, alignItems:"center", paddingTop:10}}>
                                <Card style={{height:50}}>
                                <TouchableHighlight underlayColor={'#F5F5F5'} style={{  alignItems:"center", height:50, minWidth:"100%", alignSelf:"flex-start" ,borderRadius:5, padding:10}} onPress={()=>_openCamera4()}>
                                    <Text style={{marginTop:5}}><Icon name="camera" /> Open camera</Text>
                                    </TouchableHighlight>
                                </Card>
                                
                                <Card style={{ height: 50, marginTop:5 }}>
                                    <TouchableHighlight underlayColor={'#F5F5F5'} style={{ alignItems: "center", height: 50, minWidth: "100%", alignSelf: "flex-start", borderRadius: 5, padding: 10 }} onPress={()=>_openPicker4()}>
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

    export default AddUPI