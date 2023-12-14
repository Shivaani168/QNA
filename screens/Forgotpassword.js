import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert, 
  TouchableOpacity,
  Text
} from "react-native";

import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "NerkoOne": require("../assets/fonts/NerkoOne-Regular.ttf")
};

const appIcon = require("../assets/logo.png");

export default class Forgotpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fontsLoaded: false
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
 
 forgotPassword = (email) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Please check your email and reset your password");
        this.props.navigation.replace("Login")
      })
      .catch(error => {
        alert(error.message)
        //alert("There is no user record corresponding to this identifier. Please check your entered email or click below to sign up for a new account.");
      });
 }
  

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      const {email} = this.state;
      
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
            <Image
                source={require('../assets/logo.png')}
                style={{ width: RFValue(200), height:RFValue(200),alignSelf:"center" }}
              />
            <Text style={styles.appTitleText}>Reset password</Text>
           
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ email: text })}
              placeholder={"Registered email"}
              placeholderTextColor={"black"}
    
            />
            <TouchableOpacity
              style={[styles.button, { marginTop: 20 }]}
              onPress={() => this.forgotPassword(email)}
            >
              <Text style={styles.buttonText}>Send email</Text>
            </TouchableOpacity>    
            <TouchableOpacity
              onPress={()=>this.props.navigation.replace("Login")}
            >
              <Text style={styles.buttonTextNewUser}>Back to login page</Text>
            </TouchableOpacity>    
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('RegisterScreen')}>
            <Text style={styles.buttonTextNewUser}>New User?</Text>
          </TouchableOpacity>     
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFA9E0",
    alignItems:"center",
    justifyContent:"center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitleText: {
    color: "black",
    textAlign: "center",
    fontSize: RFValue(40),
    fontFamily: "NerkoOne",
    marginBottom:RFValue(20)
  },
  textinput: {
    width:  RFValue(250),
    height: RFValue(40),
    padding: RFValue(10),
    marginTop:RFValue(10),
    borderColor: "#FFFFFF",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(15),
    color: "black",
    backgroundColor: "white",
    fontFamily: "NerkoOne"
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white",
    marginBottom:RFValue(20)
  },
  buttonText: {
    fontSize: RFValue(24),
    color: "#15193c",
    fontFamily: "NerkoOne"
  },
  buttonTextNewUser: {
    fontSize: RFValue(20),
    color: "black",
    fontFamily: "NerkoOne",
    textDecorationLine: 'underline'
  }
});
