import React, { Component } from "react";
import { Image,  View, Picker, Dimensions, ImageBackground, ScrollView, TouchableOpacity, StyleSheet, AsyncStorage, TextInput, Text } from "react-native";
import { Appbar } from 'react-native-paper';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get('window');
export default class StepFive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioimageselected:"",
            spinner: false,
            Mobile:"",
            fetchcategory:[],
            fetchtemplate:[],
            fetchcategorytemplate:[],
            TemplateName:""
        };

        this.submithandle = this.submithandle.bind(this)
        this.search_by_category = this.search_by_category.bind(this)
        this.search = this.search.bind(this)
    }

    search_by_category = (id) => {
        this.setState({
            spinner:true
        })
        fetch('https://ipmsmpcs.com/popcard/api/FetchTemplateCategory',{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:"POST",
            body:JSON.stringify({
                id:id
            })
        })

        .then((res)=>res.json())
        .then((res)=>{
            console.log('lkkll'+res.data)
            this.setState({
                fetchtemplate:res.data,
                spinner:false
            })
        })
    }

   async componentDidMount() {
       const mobile = await AsyncStorage.getItem('mobile');
        this.setState({
            spinner: true,
            Mobile:mobile
        })

           fetch('https://ipmsmpcs.com/popcard/api/FetchCategory', {
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
               },
               method: "POST",
               body: JSON.stringify({
                   Mobile: this.state.Mobile
               })
           })
               .then((res) => res.json())
               .then((res) => {
                   
                   this.setState({
                       fetchcategory: res.Status,
                       spinner:false

                   })

               })
               .catch((error) => {
                   console.log('kunal soni' + error)
               })



       fetch('https://ipmsmpcs.com/popcard/api/FetchTemplate', {
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           method: "POST",
           body: JSON.stringify({
               Mobile: this.state.Mobile
           })
       })
           .then((res) => res.json())
           .then((res) => {
               console.log('vishal' + res.Status)
               this.setState({
                   fetchtemplate: res.Status,
                   spinner: false

               })
           })

           .catch((error) => {
               console.log('kunal soni' + error)
           })
       }

    onSelect(index, value) {
        this.setState({
            radioimageselected: `${value}`,
        })
    }

    submithandle() {
        this.setState({
            spinner: true,
        });
        fetch('https://ipmsmpcs.com/popcard/api/CreateTemplate', {
            method: "POST",
            body: JSON.stringify({
                TemplateId: this.state.radioimageselected,
                Mobile:"8085264230"
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
                this.props.navigation.navigate('StepSix');
            })
    }


    all =() =>{
        this.setState({
            spinner: true,
        });
        fetch('https://ipmsmpcs.com/popcard/api/FetchTemplate', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                Mobile: this.state.Mobile
            })
        })
            .then((res) => res.json())
            .then((res) => {
                console.log('vishal' + res.Status)
                this.setState({
                    fetchtemplate: res.Status,
                    spinner: false

                })
            })

            .catch((error) => {
                console.log('kunal soni' + error)
            })
    }

    search = () => {
        fetch('https://ipmsmpcs.com/popcard/api/FetchTemplateSearch', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                TemplateName: this.state.Search
            })
        })
            .then((res) => res.json())
            .then((res) => {
                console.log('vishal' + res.Status)
                this.setState({
                    fetchtemplate: res.Status,
                    spinner: false

                })
            })

            .catch((error) => {
                console.log('kunal soni' + error)
            })
    }


    render() {   
        const city = [{ dlabel: "Bilaspur" }, { dlabel: "Raipur" }, { dlabel: "Bhatapara" }];
        const state = [{ dlabel: "Chhattisgarh" }, { dlabel: "Jharkhand" }, { dlabel: "Madhyapradesh" }];
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
                    <View style={styles.step}>
                        <Text style={styles.steptext}>2</Text>
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
                    <View style={{ ...styles.step, backgroundColor: "#080572", marginLeft: 0 }}>
                        <Text style={{ ...styles.steptext, color: "white" }}>5</Text>
                    </View>

                    <View style={styles.border}></View>
                    <View style={styles.step}>
                        <Text style={styles.steptext}>6</Text>
                    </View>
                </ScrollView>
                <View>
                    <Text style={styles.header}>Please Select Template</Text>
                    <TextInput placeholder="Search" onKeyPress={()=>this.search()} style={{borderWidth:1, borderColor:"#e6e6e6", borderRadius:30, height:40, paddingLeft:10}} value={this.state.Search} onChangeText={(Search)=>this.setState({Search})}/>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={()=>this.all()} style={{backgroundColor:"#080572", padding:10, borderRadius:5, paddingHorizontal:20, marginTop:10}}>
                            <Text style={{color:"white"}}>All</Text>
                        </TouchableOpacity>
                        {this.state.fetchcategory.map(row=>(
                            <TouchableOpacity onPress={()=>this.search_by_category(row.id)} style={{ backgroundColor: "white", borderWidth:1, borderColor:"#e6e6e6", marginLeft:10, padding: 10, borderRadius: 5, paddingHorizontal: 20, marginTop: 10 }}>
                                <Text style={{ color: "#080572" }}>{row.Name}</Text>
                            </TouchableOpacity>
                        ))}
                        
                        </View>

                    </ScrollView>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 20, maxHeight: Dimensions.get('window').height, paddingBottom:50 }}>
                 <View >
                        <RadioGroup
                            onSelect={(index, value)=>this.onSelect(index,value)}
                            size={24}
                            thickness={5}
                            color='#9575b2'
                            highlightColor='black'
                            style={{ borderRadius: 10}}
                        >
                            
                        {this.state.fetchtemplate.map(row=>(
                            <RadioButton
                                value={row.Name}
                                style={{ maxHeight: 200, padding: 0, minWidth: "120%", marginTop:5,backgroundColor:"pink" }}>
                                <ImageBackground style={{ zIndex: 0 }} source={{uri:'https://ipmsmpcs.com/popcard/public/assets/uploads/'+row.Image}} style={{ minWidth:"100%", height: 200, marginLeft:-57 }} >
                                    {this.state.radioimageselected===row.Name ?
                                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1 }}>

                                        </View>
                                    :null}
                                </ImageBackground>
                            </RadioButton>
                        ))}

                          
                        </RadioGroup>
                </View>
                </ScrollView>
                <View >
                    {this.state.radioimageselected !== '' ?
                        <TouchableOpacity style={{ ...styles.submitButton }} onPress={this.submithandle}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>Next</Text>
                        </TouchableOpacity>
                        : <View style={styles.submitButton2} disabled><Text style={{ color: "gray", fontWeight: "bold" }}>Next</Text></View>}
                </View>
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
        paddingHorizontal: 20,
        backgroundColor: "white",
        flex: 1,
    },

    header: {
        fontWeight: "bold",
        fontSize: 25,
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
        height:100,
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

})