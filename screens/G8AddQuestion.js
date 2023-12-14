import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import RNPickerSelect from 'react-native-picker-select';

import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase";
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

import firebaseConfig from '../config';
// firebase 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
  console.log('Existing Firebase app:', existingApp);
}
const db=firebase.firestore();
let customFonts = {
  "NerkoOne": require("../assets/fonts/NerkoOne-Regular.ttf")
};
 const subjectOptions = [
    { label: 'English', value: 'english' },
    { label: 'Maths', value: 'maths' },
    { label: 'Science', value: 'science' },
   
  ];

  const pickerstyle=StyleSheet.create({
    placeholder:{color:"black",fontWeight:"bold"}
  })
export default class G8AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: " ",
      dropdownHeight: 40,
     selectedSubject:'',
      question:'',
      name: ''
    
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.getUserDetails()
  }
   addQuestion = async() => {
    
if(this.state.selectedSubject!='' && this.state.question!=''){
    await db.collection("questionGrade8").add({
          question:this.state.question,
        subject:this.state.selectedSubject,
          date: new Date(),
          answer:'',
          username: this.state.name,
          ansusername: '',
        });
        alert("Saved")
        this.props.navigation.navigate('G8Home')
}
else{
  alert("Please fill both the fields")
}
   
  }

   getUserDetails = () => {
        db.collection("users")
          .where("uid", "==", firebase.auth().currentUser.uid)
          .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {

            this.setState({name : doc.data().name})
            })
        })
    }

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
     
      return (
<KeyboardAvoidingView
    behavior={Platform.OS=== 'android' ? 'height':'padding'}
          style={
            styles.container
          }>
          <SafeAreaView style={styles.droidSafeArea} />
          
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Add Question</Text>
            </View>
          </View>
          <Text style={{
              fontSize: RFValue(24),
              color: 'black',
              fontFamily: 'NerkoOne',
              borderColor: "black",
              marginLeft:10
              }}>
              Select a question
              </Text>
            <View style={{backgroundColor:"white",marginDown:40,borderRadius:30,margin:RFValue(5)}}>
      <RNPickerSelect style={pickerstyle}
        items={subjectOptions}
        onValueChange={(value) => this.setState({selectedSubject:value})}
        placeholder={{ label: 'Select a subject', value: null }}
      />
            </View>
              <TextInput
                style={
                 styles.inputFont
                }
                onChangeText={(text) => this.setState({ question:text })}
                placeholder={'Question'}
                placeholderTextColor={"black"}
                value={this.state.question}
              />
              <View style={styles.submitButton}>
              <TouchableOpacity
              style={styles.backButton}
              onPress={() => this.addQuestion()}>
           <Text style={{
              fontSize: RFValue(24),
              color: 'black',
              fontFamily: 'NerkoOne',
              borderColor: "black"
              }}>
              Submit
              </Text>
                </TouchableOpacity>
                <TouchableOpacity
              style={styles.backButton2}
              onPress={() => this.props.navigation.navigate('G8Home')}>
             <Text style={{
              fontSize: RFValue(24),
              color: 'black',
              fontFamily: 'NerkoOne',
              borderColor: "black"
              }}>
              Back
              </Text>
            </TouchableOpacity>
              </View>
         
          </KeyboardAvoidingView>
        
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFA9E0',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.setHidden(true) : RFValue(15),
  },
appTitle: {
    //flex: 0.3,
    flexDirection: 'row',
  },
  appIcon: {
    //flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    //flex: 0.8,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'black',
    fontSize: RFValue(40),
    fontFamily: 'NerkoOne',
  },
  inputFont: {
    height: RFValue(40),
    borderColor: 'black',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'black',
    fontFamily: 'NerkoOne',
    backgroundColor:"white",
    fontSize:RFValue(20),
    marginTop:RFValue(30),
    margin:RFValue(5)
  },
  backButton: {
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
  backButton2: {
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
  submitButton: {
    marginTop: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

