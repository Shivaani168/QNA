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
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";


import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import { Entypo } from '@expo/vector-icons';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "NerkoOne": require("../assets/fonts/NerkoOne-Regular.ttf")
};
const appIcon = require("../assets/logo.png");
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import firebase from 'firebase';
import firebaseConfig from '../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// firebase 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
  console.log('Existing Firebase app:', existingApp);
}
const db=firebase.firestore();

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:"",
      last_name:"",
      email: "",
      password: "",
      confirmPassword: "",
      fontsLoaded: false,
      secureTextEntry:true,
      date:''
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
      var d = new Date();
    console.log(d.toDateString())
    this.setState({date:d.toDateString()})
  }

  changeSecureText = () => {
    this.setState({secureTextEntry : ! this.state.secureTextEntry})
  }
 
 registerUser = (email, password,confirmPassword,first_name,last_name) => {

   firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
        alert("User registered!!");
       
        this.props.navigation.replace("Login");
db.collection('users').add({
 password : this.state.password,
                      email : this.state.email,
                      name : this.state.first_name,
                      second_name: this.state.last_name,
                      uid:firebase.auth().currentUser.uid,
                      date_created:this.state.date
})
      
      })
      .catch(error => {
        alert(error.message);
      });
  }
  

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      const { email, password, confirmPassword, first_name, last_name } = this.state;
      
      return (
        <KeyboardAwareScrollView style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <Image
                source={require('../assets/logo.png')}
                style={{ width: RFValue(200), height:RFValue(200),alignSelf:"center" }}
              />
            <Text style={styles.appTitleText}>Register</Text>
            <TextInput
              style={styles.textinput1}
              onChangeText={text => this.setState({ first_name: text })}
              placeholder={"First name"}
              placeholderTextColor={"black"}
    
            />
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ last_name: text })}
              placeholder={"Last name"}
              placeholderTextColor={"black"}
        
            />
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ email: text })}
              placeholder={"Enter Email"}
              placeholderTextColor={"black"}
  
            />
            <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',alignContent:'center',}}>
          <TextInput
            style={[styles.textinput,{alignSelf:'center',marginTop:20,marginRight:35}]}
            onChangeText={(text) => this.setState({ password: text })}
            placeholder={'Enter Password'}
            placeholderTextColor={'black'}
            secureTextEntry={this.state.secureTextEntry}
          />
          <TouchableOpacity style={{marginLeft:-65, marginTop:25}} onPress={this.changeSecureText}>
          {this.state.secureTextEntry ?
          <Entypo name="eye-with-line" size={24} color="black" /> :
          <Entypo name="eye" size={24} color="black" />}
          </TouchableOpacity>
          </View>
          
            <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',alignContent:'center',}}>
          <TextInput
            style={[styles.textinput,{alignSelf:'center',marginTop:20,marginRight:35}]}
            onChangeText={(text) => this.setState({ password: text })}
            placeholder={'Enter Password'}
            placeholderTextColor={'black'}
            secureTextEntry={this.state.secureTextEntry}
          />
          <TouchableOpacity style={{marginLeft:-65, marginTop:25}} onPress={this.changeSecureText}>
          {this.state.secureTextEntry ?
          <Entypo name="eye-with-line" size={24} color="black" /> :
          <Entypo name="eye" size={24} color="black" />}
          </TouchableOpacity>
          </View>
            <TouchableOpacity
              style={[styles.button, { marginTop: 20 }]}
              onPress={() => this.registerUser(email, password, confirmPassword,first_name,last_name)}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>    
            <TouchableOpacity
              onPress={()=>this.props.navigation.replace("Login")}
            >
              <Text style={styles.buttonTextNewUser}>Login?</Text>
            </TouchableOpacity> 
        </KeyboardAwareScrollView>
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
    borderColor: "black",
    backgroundColor:"white",
    borderWidth: RFValue(4),
    fontSize: RFValue(15),
    color: "black",
    fontFamily: "NerkoOne",
    marginTop : screenHeight/25,
    borderRadius : RFValue(10),
    padding : RFValue(10),
    resizeMode: 'contain',
    alignSelf : "center",
  },
  textinput1: {
    width:  RFValue(250),
    height: RFValue(40),
    borderColor: "black",
    backgroundColor:"white",
    borderWidth: RFValue(4),
    fontSize: RFValue(15),
    color: "black",
    fontFamily: "NerkoOne",
    //marginTop : screenHeight/25,
    borderRadius : RFValue(10),
    padding : RFValue(10),
    resizeMode: 'contain',
    alignSelf : "center",
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white",
    marginBottom:RFValue(20),
    resizeMode: 'contain',
    alignSelf : "center",
  },
  buttonText: {
    fontSize: RFValue(24),
    color: "#15193c",
    fontFamily: "NerkoOne",
    resizeMode: 'contain',
    alignSelf : "center",
  },
  buttonTextNewUser: {
    fontSize: RFValue(20),
    color: "black",
    fontFamily: "NerkoOne",
    textDecorationLine: 'underline',
    resizeMode: 'contain',
    alignSelf : "center",
  }
});
