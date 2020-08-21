import React from 'react';
import { View, Text, TextInput, Image, ScrollView, AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native';
import {Card, Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import {RandomContext} from './../App.js'
const ProductList = (props) => {
    const[flashmessage, setFlashmessage] = React.useState(false);
    const [showalert, setShowalert] = React.useState(false);
    const [deleteid, setDeleteid] = React.useState("");
    const [loader, setLoader] = React.useState(false);
    const [Mobile, setMobile] = React.useState("");
    const [productlist, setProductList] = React.useState([]);
    const randomcode = React.useContext(RandomContext)

   const showAlert = (id) => {
        setShowalert(true)
        setDeleteid(id)
    };

   const hideAlert = () => {
        setShowalert(false)
    };

   const fetchproductlist = async () => {
        const mobile = await AsyncStorage.getItem('mobile');
        setMobile(mobile)
        fetch('https://ipmsmpcs.com/popcard/api/ProductList',{
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
            setLoader(false)
            setProductList(res.data)
            console.log(res.data)
        })
    }

  const  DeleteProduct = () =>{
       
        setLoader(true)
        setShowalert(false)

        fetch('https://ipmsmpcs.com/popcard/api/ProductDelete',{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:"POST",
            body:JSON.stringify({
                id:deleteid
            })
        })

        .then((res)=>res.json())
        .then((res)=>{
            fetch('https://ipmsmpcs.com/popcard/api/ProductList', {
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
                    setLoader(false)
                    setProductList(res.data)
                    setFlashmessage(true)
                })
        })
    }

    React.useEffect(()=>{
        fetchproductlist();
        const timer = setTimeout(() => {
            setFlashmessage(false)
        }, 3000);
        return () => clearTimeout(timer);
    },[randomcode,flashmessage])

    
        
        return (
            <View >
                <Spinner
                    visible={loader}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <AwesomeAlert
                    show={showalert}
                    showProgress={false}
                    title="Are You Sure ?"
                    message="if you delete this product. you cant undone. you have create a new product."
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No, cancel"
                    confirmText="Yes, delete it"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        hideAlert();
                    }}
                    onConfirmPressed={() => {
                        DeleteProduct();
                    }}
                />
                <Appbar style={styles.appbar}>
                    <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                        <Icon name="menu" size={30} color='black' style={{ marginLeft: '3%' }} />
                    </TouchableOpacity>
                    <Text style={styles.header}>Products </Text>
                </Appbar>

                {flashmessage === true ?
                    <Card style={{ backgroundColor: "#00AD3F", padding: 20, position: "absolute", top: 50, width: "100%" }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}> Successfully! Product Removed.</Text>
                    </Card>
                    : null}
            <ScrollView>
               
            {productlist.map((row=>
                    <Card style={{ paddingHorizontal: 5, marginTop: 5 }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: "30%", padding: 5 }}>
                                <View style={{ marginTop: 1 }}>
                                    <Image source={{uri:'https://ipmsmpcs.com/popcard/public/assets/uploads/'+row.Image}} style={{ width: 100, height: 100, borderRadius: 10 }} />
                                </View>
                            </View>

                            <View style={{ width: "70%", padding: 10 }}>
                                <View>
                                <Text style={{ fontWeight: "bold" }}>{row.ProductTitle}</Text>
                                    <Text>{row.ProductDescription}</Text>
                                    <View style={{ flexDirection: "row", borderTopWidth: 1, borderTopColor: "#e6e6e6", marginTop: 7, paddingTop: 5 }}>
                                        <View>
                                            <Text style={{ color: "#080572", marginTop: 10 }}>Price : Rs.{row.ProductPrice}</Text>
                                        </View>
                                        <View >
                                            <Card style={{ paddingHorizontal: 20, paddingVertical: 10, marginLeft: 10 }}>
                                                <TouchableOpacity onPress={()=>showAlert(row.id)}><Text style={{ color: "#080572" }}>Delete Product</Text></TouchableOpacity>
                                            </Card>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        </Card>
        ))}
                        <View style={{height:100}}>

                        </View>
                    </ScrollView>
            </View>
            
        );
}

const styles = StyleSheet.create({
    appbar:{
        backgroundColor:"white"
    },
    header:{
        fontWeight:"bold",
        fontSize:16
    }
});

export default ProductList