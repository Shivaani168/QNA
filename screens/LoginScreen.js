import React, { Component } from 'react';
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
  Dimensions
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import * as SplashScreen from 'expo-splash-screen';

let customFonts = {
  NerkoOne: require('../assets/fonts/NerkoOne-Regular.ttf'),
};

const appIcon = require('../assets/logo.png');
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fontsLoaded: false,
    
      secureTextEntry: true,
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  changeSecureText = () => {
    this.setState({secureTextEntry : ! this.state.secureTextEntry})
  }

  signIn = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('Dashboard');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    if (this.state.fontsLoaded) {
      const { email, password } = this.state;

      return (
        <KeyboardAwareScrollView style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <Image source={appIcon} style={styles.appIcon} />
          <Text style={styles.appTitleText}>Login</Text>
          <TextInput
            style={[styles.textinput,{alignSelf:'center'}]}
            onChangeText={(text) => this.setState({ email: text })}
            placeholder={'Enter Email'}
            placeholderTextColor={'black'}
          //  autoFocus
          />
          <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',alignContent:'center',}}>
          <TextInput
            style={[styles.textinput,{alignSelf:'center',marginTop:20,marginRight:45}]}
            onChangeText={(text) => this.setState({ password: text })}
            placeholder={'Enter Password'}
            placeholderTextColor={'black'}
            secureTextEntry={this.state.secureTextEntry}
          />
          <TouchableOpacity style={{marginLeft:-71, marginTop:25}} onPress={this.changeSecureText}>
          {this.state.secureTextEntry ?
          <Entypo name="eye-with-line" size={24} color="black" /> :
          <Entypo name="eye" size={24} color="black" />}
          </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={() => this.signIn(email, password)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('RegisterScreen')}>
            <Text style={styles.buttonTextNewUser}>New User?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Forgotpassword')}>
            <Text style={styles.buttonTextNewUser}>Forgot password?</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFA9E0',
    alignItems: 'center',
   // justifyContent: 'center',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(0),
  },
  appIcon: {
    width: RFValue(200),
    height: RFValue(200),
    resizeMode: 'contain',
    alignSelf : "center",
    marginTop : 20,
    borderRadius : RFValue(10),
   // paddingHorizontal : RFValue(90),
   // padding : RFValue(10)
  },
  appTitleText: {
    color: "black",
    textAlign: "center",
    fontSize: RFValue(40),
    fontFamily: "NerkoOne",
    marginBottom:RFValue(20)
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(50),
    borderColor: 'black',
    borderWidth: RFValue(4),
    fontSize: RFValue(20),
    color: 'black',
    backgroundColor: 'white',
    fontFamily: 'NerkoOne',
    borderRadius : RFValue(10),
    padding : RFValue(10),
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: 'white',
    marginBottom: RFValue(20),
    borderColor:"black",
    borderWidth: RFValue(4),
    resizeMode: 'contain',
    alignSelf : "center",
  },
  buttonText: {
    fontSize: RFValue(24),
    color: 'black',
    fontFamily: 'NerkoOne',
    borderColor: "black"
  },
  buttonTextNewUser: {
    fontSize: RFValue(17),
    color: 'black',
    fontFamily: 'NerkoOne',
    textDecorationLine: 'underline',
    resizeMode: 'contain',
    alignSelf : "center",
  },

});
