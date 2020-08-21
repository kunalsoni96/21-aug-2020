import React from 'react';
import { View, AsyncStorage, Text, TextInput, Image, StyleSheet } from 'react-native';
import { Input, Button, Label } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Verify extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            check:""
        }
    }
    

    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={{ marginBottom: 5, color: "#080572", marginTop: "20%",  fontSize:20 }}>OTP Verify Successfully</Text>
                <Text>{this.state.check}</Text>
                <Icon name="verified-user" style={{ fontSize: 160, color: "#01267e", marginTop:100 }} />
                <Button onPress={()=>this.props.navigation.navigate('StepOne')} style={styles.submitButton}><Text style={{ color: "white", fontWeight: "bold" }}>Proceed</Text></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Image: {
        width: 50,
        height: 50,
        marginTop: "10%",
        marginBottom: "10%"
    },

    OTPwrapper: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#e6e6e6",
        borderTopColor: "#e6e6e6",
        paddingVertical: 10
    },



    wrapper: {
        alignItems: "center",
        paddingHorizontal: 30,
        backgroundColor: "white",
        flex: 1,

    },

    input: {
        marginBottom: 30,
        height: 50,
        marginTop: 50,
        borderWidth: 1,
        borderColor: "#080572",
        paddingLeft: 10,
        width: "100%",
        borderRadius: 10,
        backgroundColor: "white",
    },

    resend: {
        backgroundColor: "white",
        borderWidth: 1,
        height: 30,
        borderColor: "#e6e6e6",
        justifyContent: "center",
        width: 100
    },

    submitButton: {
        width: "100%",
        textAlignVertical: "center",
        justifyContent: "center",
        height: 50,
        marginTop: "70%",
        borderRadius: 10,
        backgroundColor: "#080572",
        position: "relative"
    }
});