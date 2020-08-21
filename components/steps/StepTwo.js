import React, { Fragment, Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { SafeAreaView, StatusBar, AsyncStorage, Dimensions, TouchableHighlight, Image, View, Picker, ScrollView, TouchableOpacity, StyleSheet, TextInput, Text } from "react-native";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import { Card } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import RNFetchBlob from 'rn-fetch-blob';
import Modal from 'react-native-modal';

export default class StepTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {

            Mr: 'Mr',
            CompanyOrFreelancer: "Freelancer",
            spinner: "",
            Name: "",
            CompanyName: "",
            Designation: "Owner",
            Mobile: "",
            imgdata: "",
            fileUri: "",
            img: "",
            avatarSource: "",
            error: "",
            modalVisible: false,
        };

        this.submithandle = this.submithandle.bind(this);
        this.updateDesignation = this.updateDesignation.bind(this);
        this.updateMr = this.updateMr.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this._openPicker = this._openPicker.bind(this);
        this._openCamera = this._openCamera.bind(this);
    }

    _closeModal() {
        this.setState({
            modalVisible: false
        })
    }

    updateDesignation = (Designation) => {
        this.setState({
            Designation: Designation
        })
    }

    updateMr = (Mr) => {
        this.setState({
            Mr: Mr
        })
    }

    async componentDidMount() {
        const mobile = await AsyncStorage.getItem('mobile');
        this.setState({
            Mobile: mobile,
            spinner: false,
        });
    }

    _openCamera() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            let source = { uri: image.path };
            this.setState({
                fileUri: image.path,
                avatarSource: source,
                modalVisible: false
            })
        });
    }

    _openPicker() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image)
            let source = { uri: image.path };
            this.setState({
                fileUri: image.path,
                avatarSource: source,
                img: image,
                modalVisible: false
            })

        });
    }


    renderFileUri() {
        if (this.state.fileUri) {
            return <Image
                source={{ uri: this.state.fileUri }}
                style={styles.images}
            />
        } else {
            return <Image
                source={require('./../../assets/images/galeryImages.jpg')}
                style={styles.images}
            />
        }
    }
    
    submithandle(){
        this.setState({
            spinner: true,
        });
        if(this.state.fileUri===''){
            this.setState({
                error : 'Please Select Your Pic',
                spinner: false,
            })
        
        }
        else{
        RNFetchBlob.fetch('POST', 'https://ipmsmpcs.com/popcard/api/CreateProfile', {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

            [
                { name: 'image', filename: this.state.Mobile + '.jpg', type: 'image/jpg', data: RNFetchBlob.wrap(this.state.fileUri) },
                
            ],
            )
        .then((res)=>res.json())
        .then((res)=>{
            fetch('https://ipmsmpcs.com/popcard/api/CreateProfileInformation', {
                method: "POST",
                body: JSON.stringify({
                    CompanyName: this.state.CompanyName,
                    Name: this.state.Mr+'. '+this.state.Name,
                    Designation: this.state.Designation,
                    CompanyOrFreelancer:this.state.CompanyOrFreelancer,
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
                    this.props.navigation.navigate('StepThree');
                })
            
        })
        .catch((error)=>{
            
        })
    }
    }
    
    render() {
        
        const designation = [{ dlabel: 'Director' }, { dlabel: 'Owner' }];
        const mr = [{ dlabel: 'Mr.' }, { dlabel: 'Mrs.' }];
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
                    <View style={{ ...styles.step, backgroundColor: "#080572", marginLeft: 0 }}>
                        <Text style={{ ...styles.steptext, color: "white" }}>2</Text>
                    </View>
                    <View style={styles.border}></View>
                    <View style={styles.step}>
                        <Text style={styles.steptext}>3</Text>
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
                    <Text style={styles.header}>Company Details</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Fragment>
                        <StatusBar barStyle="dark-content" />
                        <SafeAreaView>
                            <View >
                               
                                <View style={styles.ImageSections}>
                                  <Card style={{width:"100%"}}>
                                    <View>
                                        {this.renderFileUri()}
                                        <Text style={{ textAlign: 'center', fontWeight:"bold", color:"red" }}>
                                            {this.state.error}
                                        </Text>
                                    </View>
                                </Card>
                                </View>

                                <View style={styles.btnParentSection}>
                                    <TouchableOpacity style={styles.btnSection} onPress={() => this.setState({ modalVisible: true })}  >
                                        <Text>Upload Image</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </SafeAreaView>
                    </Fragment>
                <View style={{flexDirection:"row", marginBottom:10}}>
                    <View style={{width:"50%", flexDirection:"row"}}>
                    <View>
                    <RadioButton
                        value="Company"  
                        status={this.state.CompanyOrFreelancer === 'Company' ? 'checked' : 'unchecked'}
                        onPress={() => this.setState({ CompanyOrFreelancer: 'Company' })}
                    />
                    </View>
                            <View>
                    <Text style={{marginTop:10}}>Business</Text>
                                </View>
                    </View>
                        <View style={{ width: "50%", flexDirection: "row" }}>
                            <View>
                                <RadioButton 
                                    value="Freelancer"
                                    status={this.state.CompanyOrFreelancer === 'Freelancer' ? 'checked' : 'unchecked'}
                                    onPress={() => this.setState({CompanyOrFreelancer:'Freelancer'})}
                                />
                            </View>
                            <View>
                                <Text style={{ marginTop: 10 }}>Personal</Text>
                            </View>
                        </View>
                </View>
                <View style={{flexDirection:"row"}}>
                        <View style={{ width: "38%", borderWidth:1, borderColor:"#080572",  borderRadius:10, height:50,}}>
                        <Picker style={{ color: "#080572" }} selectedValue={this.state.Mr} onValueChange={this.updateMr}>
                            {mr.map(row => (
                                <Picker.Item label={row.dlabel} value={row.dlabel} />
                            ))}

                        </Picker>
                    </View>
                        <View style={{ width: "58%", marginLeft:"3%"}}>
                    <TextInput
                        onChangeText={(Name) => this.setState({ Name })}
                        value={this.state.Name}
                        placeholder={"Full Name..."}
                        placeholderTextColor="#080572"
                        style={{...styles.input}} />
                    </View>
                </View>
                    <View style={styles.input}>
                        <Picker style={{ color: "#080572", marginLeft: -10 }} selectedValue={this.state.Designation} onValueChange={this.updateDesignation}>
                            {designation.map(row => (
                                <Picker.Item label={row.dlabel} value={row.dlabel} />
                            ))}

                        </Picker>
                    </View>
                         
                    <TextInput
                        onChangeText={(CompanyName) => this.setState({ CompanyName })}
                        value={this.state.CompanyName}
                        placeholder={"Company Name..."}
                        placeholderTextColor="#080572"
                        style={styles.input} />
                </View>

                <View >
                    {this.state.Name.length > 4 && this.state.CompanyName.length > 4 ?
                        <TouchableOpacity style={{ ...styles.submitButton }} onPress={this.submithandle}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>Next</Text>
                        </TouchableOpacity>
                        : <View style={styles.submitButton2} disabled><Text style={{ color: "gray", fontWeight: "bold" }}>Next</Text></View>}
                </View>
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'fade'}
                    transparent={true}
                    onRequestClose={() => this.onRequestClose()}
                >
                    <View style={styles.alertBackground}>
                        <View style={{ ...styles.alertBox, alignItems: "center", paddingTop: 10 }}>
                            <Card style={{ height: 50 }}>
                                <TouchableHighlight underlayColor={'#F5F5F5'} style={{ alignItems: "center", height: 50, minWidth: "100%", alignSelf: "flex-start", borderRadius: 5, padding: 10 }} onPress={this._openCamera}>
                                    <Text style={{ marginTop: 5 }}><Icon name="camera" /> Open camera</Text>
                                </TouchableHighlight>
                            </Card>

                            <Card style={{ height: 50, marginTop: 5 }}>
                                <TouchableHighlight underlayColor={'#F5F5F5'} style={{ alignItems: "center", height: 50, minWidth: "100%", alignSelf: "flex-start", borderRadius: 5, padding: 10 }} onPress={this._openPicker}>
                                    <Text style={{ marginTop: 5 }}><Icon name="file-image-o" /> Pick From Gallery</Text>
                                </TouchableHighlight>
                            </Card>

                            <TouchableHighlight underlayColor={'#F5F5F5'} onPress={this._closeModal}>
                                <Text style={styles.modalItem}>Cancel</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>  
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
        fontSize: 22,
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


    scrollView: {
        backgroundColor: Colors.lighter,
    },

    body: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
        height: Dimensions.get('screen').height - 20,
        width: Dimensions.get('screen').width
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
        width:300,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    },

    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold'
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


    alertBackground: {
        borderWidth: 1,
        borderColor: "#e6e6e6",

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // If the mask is to be displayed in a semi-transparent state, it must be set here. The a in the reba controls the transparency, which is in the range of 0.0 to 1.0.
    },

    alertBox: {
        width: "100%",
        height: 200,
        backgroundColor: 'white',
    },

    modalItem: {
        marginTop: 20,

    }
})