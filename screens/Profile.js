import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import firebase from "firebase";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


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

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      light_theme: true,
      name: "",
      last_name:"",
      email:"",
      date:"",
       image: "https://dummyimage.com/100x100/bfa9e0/fff&text=Profile",
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

  pickImage = async () => {
    
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    

  console.log("Result",result.assets[0].uri);

    if (!result.canceled) {
      this.setState({ image: result.assets[0].uri });
    
      this.uploadImage(result.assets[0].uri);
    }
   
    
  };

  uploadImage = async (imageUri) => {
   try{
    // var blobOb = await fetch(imageUri);
    // var blob = await blobOb.blob();
    const blob =await new Promise((resolve,reject)=>{
      const xhr=new XMLHttpRequest();
      xhr.onload=function(){
        resolve(xhr.response);
      }
      xhr.error=function(){
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType='blob';
      xhr.open('GET',imageUri,true)
      xhr.send(null)
    });
    return storageRef = firebase
      .storage()
      .ref().child('userss/'+firebase.auth().currentUser.email)
      .put(blob)
      .then(() => {
        this.fetchImage();
      })}
      catch(error)  {
        console.log(error);
      };
  };
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

   getUserDetails = () => {
        db.collection("users")
          .where("uid", "==", firebase.auth().currentUser.uid)
          .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {

            this.setState({name : doc.data().name})
            this.setState({last_name : doc.data().second_name})
            this.setState({email : doc.data().email})
            this.setState({date : doc.data().date_created})
            })
            console.log("Date created"+this.state.date);
        })
    }

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
              <Text
                style={styles.appTitleText}>
                Profile
              </Text>
          </View>
          <View style={styles.screenContainer}>
           <TouchableOpacity onPress={this.pickImage} style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: this.state.image }}
            style={{ width: 100, height: 100, alignSelf: 'center', borderRadius: 80, borderWidth: 2, borderColor: 'white', margin: 15 }}
          />
          <Text style={{fontSize:RFValue(15),fontFamily:"NerkoOne",marginEnd:RFValue(10)}}>
          Click on the icon above to choose your own profile picture!
          </Text>
        </TouchableOpacity>
              <Text style={styles.userDetailText}>
                Username: {this.state.name} {this.state.last_name}
              </Text>
              <Text style={styles.userDetailText}>
                Email: {this.state.email}
              </Text>
              <Text style={styles.userDetailText}>
                Date joined: {this.state.date}
              </Text>
              
            <TouchableOpacity style={{
              width: RFValue(250),
              height: RFValue(50),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: RFValue(30),
              backgroundColor: 'white',
              marginBottom: RFValue(20),
              borderColor:"black",
              borderWidth: RFValue(4),
              resizeMode: 'contain',
              alignSelf : "center",}}
            onPress={() => firebase.auth().signOut()}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
           <TouchableOpacity
            style={{width: RFValue(250),
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
              alignSelf : "center",}}
            onPress={() => this.props.navigation.navigate('ClassChoice')}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
            </View>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFA9E0"
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.setHidden(true) : RFValue(15),
  },
  iconImage: {
    width:RFValue(100),
    height:RFValue(100),
    resizeMode: "contain"
  },
  appTitleText: {
    color: "black",
    fontSize: RFValue(50),
    fontFamily: "NerkoOne"
  },
  userDetailText: {
    color: "black",
    fontSize: RFValue(25),
    fontFamily: "NerkoOne",
    margin:RFValue(10)
  },
  buttonText: {
    color: "black",
    fontSize: RFValue(25),
    fontFamily: "NerkoOne",
  },
  screenContainer: {
    flex: 0.85
  },
});