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
  TouchableOpacity
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from '@expo/vector-icons';
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
import firebase from 'firebase';
import firebaseConfig from '../config';
// firebase 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
  console.log('Existing Firebase app:', existingApp);
}
const db=firebase.firestore();
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

let customFonts = {
  NerkoOne: require('../assets/fonts/NerkoOne-Regular.ttf'),
};

export default class ClassChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      dropdownHeight: 40,
      name: "",
      grade: "",
      image:"https://dummyimage.com/100x100/bfa9e0/fff&text=Profile"
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.getUserDetails();
    this.fetchImage();
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

    fetchImage = async () => {
    await firebase
      .storage()
      .ref().child('userss/'+firebase.auth().currentUser.email)
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((e) => {
        console.log(e);
      });
  };



  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
<View
          style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
              <Text style={styles.appTitleText}> Hi {this.state.name}!</Text>
              <TouchableOpacity style={{marginLeft:RFValue(5)}} onPress={() => this.props.navigation.navigate('Profile')}>
              
          <Image
            source={{ uri: this.state.image }}
            style={{ width: RFValue(70), height: RFValue(70), alignSelf: 'center', borderRadius: 80, borderWidth: 2, borderColor: 'white', margin: 15 }}
          />
        
       </TouchableOpacity> 
          </View>
          <Text style={styles.appTitleTextWelcome}> Choose your grade to start learning! </Text>
          <ScrollView style={{}}>
          <View style={{flexDirection:"row",}}>
          <View style={styles.buttonContainer1}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: RFValue(150),
                height: RFValue(160),
               
                borderWidth:2,
                borderColor:'black',
                borderRadius:20,
                margin:RFValue(10),
                
              }} 
              onPress={() => this.props.navigation.navigate('G7Home')}>
            <Image
                source={require('../assets/grade7.png')}
                style={styles.gradeImage}></Image>
            </TouchableOpacity>
                        <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: RFValue(150),
                height: RFValue(160),
               
                borderWidth:2,
                borderColor:'black',
                borderRadius:20,
                margin:RFValue(10),
              }}
              onPress={() => this.props.navigation.navigate('G9Home')}>
              <Image
                source={require('../assets/grade9.png')}
                style={styles.gradeImage}></Image>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer2}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: RFValue(150),
                height: RFValue(160),
               
                borderWidth:2,
                borderColor:'black',
                borderRadius:20,
                margin:RFValue(10),
              }}
              onPress={() => this.props.navigation.navigate('G8Home')}>
              <Image
                source={require('../assets/grade8.png')}
                style={styles.gradeImage}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: RFValue(150),
                height: RFValue(160),
               
                borderWidth:2,
                borderColor:'black',
                borderRadius:20,
                margin:RFValue(10),
              }}
              onPress={() => this.props.navigation.navigate('G10Home')}>
              <Image
                source={require('../assets/grade10.png')}
                style={styles.gradeImage}></Image>
            </TouchableOpacity>
          </View>
          </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFA9E0',
  },
    buttonContainer1: {
   // flex:0.5,
    alignItems: 'center',
    justifyContent: 'center',
    position:"absolute"
  },
    buttonContainer2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:RFValue(170),
    marginTop:RFValue(70),
    margin:RFValue(10),
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.setHidden(true) : RFValue(15),
  },
  appTitle: {
   // flex: 0.3,
    flexDirection: 'row',
    justifyContent:"center",
    alignItems:"center"
  },
  iconImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  gradeImage: {
    width: RFValue(140),
    height: RFValue(180),
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
  //  flex: 0.8,
    justifyContent: 'center',
    margin: RFValue(13),
    flexDirection:"row"
  },
  appTitleText: {
    color: 'black',
    fontSize: RFValue(35),
    fontFamily: 'NerkoOne',
  },
   appTitleTextWelcome: {
    color: 'black',
    fontSize: RFValue(20),
    fontFamily: 'NerkoOne',
  },
});