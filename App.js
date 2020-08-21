import React, {useState, useEffect} from 'react';
import { View, StyleShet, Text, AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import IntroSlider from './components/IntroSlider';
import Splash from './components/Splash';
import OTP from './components/OTP';
import Verify from './components/Verify';
import StepOne from './components/steps/StepOne';
import StepTwo from './components/steps/StepTwo';
import StepThree from './components/steps/StepThree';
import StepFour from './components/steps/StepFour';
import StepFive from './components/steps/StepFive';
import StepSix from './components/steps/StepSix';
import MyAccount from './components/MyAccount';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

import DemoProfile from './components/DemoProfile';
import StarterProfile from './components/StarterProfile';
import AddProduct from './components/AddProduct';
import AddUPI from './components/AddUPI';
import Galery from './components/Galery';
import Register from './components/Register';
import About from './components/About';
import DrawerContent from './components/DrawerContent';
import {AuthContext} from './components/AuthContext'

import MainTab from './components/MainTab'

import TermsNConditions from './components/TermsNConditions'
import Location from './components/Location'
import Email from './components/Email'
import BusinessTemplate from './components/BusinessTemplate'
import SocialLinks from './components/SocialLinks'
import ChangePassword from './components/ChangePassword'
import UpdateProfile from './components/UpdateProfile'
import PrivacyPolicy from './components/PrivacyPolicy'
import Plan from './components/Plan';

import AddGallery from './components/AddGallery';
import AddAbout from './components/AddAbout';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const RandomContext = React.createContext();
const App = () => {  
  const [auth, Setauth] = useState('invalid')
  const [checkpayment, Setcheckpayment] = useState();
  const [randomcode, setRandomcode] = useState(Math.random())
  const authContext = React.useMemo(()=>({
    SignIn: async()=>{
      const asyncdata = await AsyncStorage.getItem('login');
      Setauth(asyncdata);
    },

    SignOut:()=>{
     AsyncStorage.clear();
     Setauth('invalid');
    },

    reflact:()=>{
      setRandomcode(Math.random());
    }

    
  }));

  const checklogin = async() =>{
    const asyncdata = await AsyncStorage.getItem('login');
    Setauth(asyncdata);
  }

  useEffect (()=>{
    checklogin();
    paymentfn();
  },[])


  const paymentfn = async() =>{
    const mobile = await AsyncStorage.getItem('mobile');
    fetch('https://ipmsmpcs.com/popcard/api/FetchContact',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        Mobile: mobile
      })
    })
    .then((res)=>res.json())
    .then((res)=>{
      Setcheckpayment(res.Status.PaymentStatus)
      
    })
  }


  if(auth!=='verified'){
    return (
      <AuthContext.Provider value={authContext}>
      <RandomContext.Provider value={randomcode}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" options={({ navigation }) => ({
              headerShown: false
            })} component={Splash} />

            <Stack.Screen name="IntroSlider" component={IntroSlider} options={({ navigation }) => ({
              headerShown: false
            })} />
          <Stack.Screen name="Profile" component={DemoProfile} options={({ navigation }) => ({
            headerShown: false
          })} />
            <Stack.Screen name="Register" component={Register} options={({ navigation }) => ({
              headerShown: false
            })} />
            <Stack.Screen name="OTP" component={OTP} options={({ navigation }) => ({
              headerShown: false
            })} />
            <Stack.Screen name="Verify" component={Verify} options={({ navigation }) => ({
              headerShown: false
            })} />
          <Stack.Screen name="StepOne" component={StepOne} options={({ navigation }) => ({
            headerShown: false
          })} />
          <Stack.Screen name="StepTwo" component={StepTwo} options={({ navigation }) => ({
            headerShown: false
          })} />
          <Stack.Screen name="StepThree" component={StepThree} options={({ navigation }) => ({
            headerShown: false
          })} />
          <Stack.Screen name="StepFour" component={StepFour} options={({ navigation }) => ({
            headerShown: false
          })} />
          <Stack.Screen name="StepFive" component={StepFive} options={({ navigation }) => ({
            headerShown: false
          })} />
          <Stack.Screen name="StepSix" component={StepSix} options={({ navigation }) => ({
            headerShown: false
          })} />
          
          <Stack.Screen name="Login" component={Login} options={({ navigation }) => ({
            headerShown: false
          })} />

            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={({ navigation }) => ({
              headerShown: false
            })} />

            <Stack.Screen name="ResetPassword" component={ResetPassword} options={({ navigation }) => ({
              headerShown: false
            })} />
          
          
          </Stack.Navigator>
        </NavigationContainer>
        </RandomContext.Provider>
        </AuthContext.Provider>
    );
        }


  else {
    if(checkpayment==='1'){
      return(
      <AuthContext.Provider value={authContext}>
      <RandomContext.Provider value={randomcode}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="StarterProfile">
            <Stack.Screen name="StarterProfile" options={({ navigation }) => ({
              headerShown: false
            })} component={StarterProfile} />

          </Stack.Navigator>
        </NavigationContainer>
         </RandomContext.Provider>
      </AuthContext.Provider>
      );
    }
    
    else if (checkpayment === '2') {
    return (
      <AuthContext.Provider value={authContext}>
      <RandomContext.Provider value={randomcode}>
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props=><DrawerContent {...props} />}>
        
        <Drawer.Screen name="MainTab" component={MainTab} />

          <Drawer.Screen name="TermsNConditions" component={TermsNConditions} />

          <Drawer.Screen name="AddGallery" component={AddGallery} />

          <Drawer.Screen name="AddAbout" component={AddAbout} />

          <Drawer.Screen name="MyAccount" component={MyAccount} />

          <Drawer.Screen name="ChangePassword" component={ChangePassword} />

          <Drawer.Screen name="Location" component={Location} />

          <Drawer.Screen name="Email" component={Email} />

          <Drawer.Screen name="BusinessTemplate" component={BusinessTemplate} />

          <Drawer.Screen name="SocialLinks" component={SocialLinks} />

          <Drawer.Screen name="UpdateProfile" component={UpdateProfile} />

          <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />

          <Drawer.Screen name="Plan" component={Plan} />

          <Drawer.Screen name="AddProduct" component={AddProduct} />

          <Drawer.Screen name="AddUPI" component={AddUPI} />

      </Drawer.Navigator>
    </NavigationContainer>
    </RandomContext.Provider>
      </AuthContext.Provider>
    );
  }
  else{
    return(
      <AuthContext.Provider value={authContext}>
      <RandomContext.Provider value={randomcode}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="DemoProfile">
            <Stack.Screen name="DemoProfile" options={({ navigation }) => ({
              headerShown: false
            })} component={DemoProfile} />

          </Stack.Navigator>
        </NavigationContainer>
        </RandomContext.Provider>
      </AuthContext.Provider>
    );
  }
}
}

export default App;
export {RandomContext}