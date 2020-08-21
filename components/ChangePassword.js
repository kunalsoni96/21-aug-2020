import React from 'react';
import { Image, View, FlatList, ScrollView, TouchableOpacity, Dimensions, ImageBackground, StyleSheet, TextInput, Text, AsyncStorage } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card, Appbar } from 'react-native-paper';
import ImageView from 'react-native-image-view';
import {Input, Item, Label} from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay';

export default class ChangePassword extends React.Component {
constructor(props){
    super(props);
    this.state = {
        Password:"",
        ConfirmPassword:"",
        invalid:"",
        Mobile:"",
        loader:false,
        flashmessage:false,
    }
    this.changepassword = this.changepassword.bind(this)
}

componentDidMount(){
    this.mobile();
}

 mobile = async() => {
    const mobile = await AsyncStorage.getItem('mobile');
    this.setState({
        Mobile:mobile
    })
}

changepassword = ()=>{
    this.setState({
        loader:true
    })
    if(this.state.Password ===this.state.ConfirmPassword){
    fetch('https://ipmsmpcs.com/popcard/api/ChangePassword',{
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        method:"POST",
        body:JSON.stringify({
            Mobile:this.state.Mobile,
            Password:this.state.Password
        })
    })
    
    .then((res)=>{
        this.setState({
            flashmessage:true,
            Password:"",
            loader:false,
            ConfirmPassword:""          
        },
        ()=>setTimeout(() => {
          this.closeFlashMessage()  
        }, 3000)
        )
    })

}

else{
    this.setState({
        invalid :"Password Not Matched!",
        loader:false
    })
}
}

    closeFlashMessage() {
        this.setState({
            flashmessage: false
        })
    }
    render() {
        return (
            <View style={{backgroundColor:"white", flex:1}}>
                <Spinner
                    visible={this.state.loader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <Appbar style={styles.appbar}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-back" size={30} color='black' style={{ marginLeft: '3%' }} />
                    </TouchableOpacity>
                    
        <Text style={styles.header}>Change Password {this.state.Mobile}</Text>
                </Appbar>
                {this.state.flashmessage === true ? 
                <Card style={{ backgroundColor: "#00AD3F", padding: 20, position: "absolute", top:50, width:"100%" }}>
                    <Text style={{color:"white", fontWeight:"bold"}}> Successfully! Changed Password</Text>
                </Card>
    :null}
                <View style={{flex:1, backgroundColor:"white", marginTop:50, paddingHorizontal:20}}>
                    <Card style={{paddingVertical:50, paddingHorizontal:10}}>
                        <Text style={{fontWeight:"bold", fontSize:18, alignSelf:"center", marginBottom:20}}>Reset Password</Text>
                    <Text>Create a New Password</Text>
                    <Item>
                            <Input placeholder="******" secureTextEntry={true} value={this.state.Password} onChangeText={(Password)=>this.setState({Password})} />
                    </Item>

                    <Text style={{marginTop:30}}>Confirm Password</Text>
                    <Item>
                            <Input placeholder="******" secureTextEntry={true} value={this.state.ConfirmPassword} onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })}/>
                    </Item>
                <Text style={{color:"red", fontWeight:"bold", marginTop:5}}>{this.state.invalid}</Text>
                        <View style={{marginTop:20}}>
                            {this.state.Password.length > 3 && this.state.ConfirmPassword.length > 3 ?
                                <TouchableOpacity style={{ ...styles.submitButton }} onPress={this.changepassword}>
                                    <Text style={{ color: "white", fontWeight: "bold" }}>Reset Now</Text>
                                </TouchableOpacity>
                                : <View style={styles.submitButton2} disabled><Text style={{ color: "gray", fontWeight: "bold" }}>Reset Now</Text></View>}
                        </View>  
            </Card>
                </View>
            </View>
        );
    }
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
});