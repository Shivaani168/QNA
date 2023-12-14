import { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
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
let customFonts = {
  NerkoOne: require('../assets/fonts/NerkoOne-Regular.ttf'),
  Fruktur: require('../assets/fonts/Fruktur-Italic.ttf'),
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
var count=0

export default class G7HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
     name:'',
      questions: [],
       displayedTip:
        "Find all the answers to your questions!",
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
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

       quotes=()=>{
     var tips = [
    "Education is the best friend",
    "An educated person is respected everywhere",
    "True education reveals self-potential, more than just sows ideas",
    "Optimism is the key to success",
    "Education is the most powerful weapon which you can use to change the world"
  ];

  if (count < tips.length) {
    this.setState({
      displayedTip: tips[count],
    });
    count = count + 1;
    console.log(count);
  } else {
    count = 0;
    this.setState({
      displayedTip: tips[count],
    });
    count = count + 1;
    console.log(count);
  }}

  componentDidMount() {
    this._loadFontsAsync();
    this.getUserDetails();
  
  }

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View
          style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />   
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <TouchableOpacity style={{margin:10}} onPress={() => this.props.navigation.navigate('ClassChoice')}>
       <AntDesign name="leftcircleo" size={40} color="Black" />
       </TouchableOpacity> 
       </View>     
          <View
          style={{
            //margin: "5%",
            flexDirection: "row",
           // marginLeft: "2%",
            justifyContent: "center",
            width:'95%',
             backgroundColor: "#6699CC",
             borderRadius:20,
             alignSelf:'center',
             height:"15%"
             //margin: RFValue(13),
          }}
        >
         <Image
            source={require("../assets/homelogo.png")}
            style={{ 
              width: "30%",
              height:" 100%",
              alignSelf:"flex-end",
              borderRadius:30,
              resizeMode:'contain',
              marginLeft:RFValue(30)
              }}
          ></Image> 
          <TouchableOpacity
            style={{
              width: "60%",
              height:" 100%",
              paddingTop: "1%",
              paddingLeft: "1%",
              paddingBottom: "2%",
              borderRadius: 10,
              backgroundColor: "#6699CC",
              margin: "5%",
              textAlign: "center",
              alignSelf:"center",
              alignItems:"center",
              justifyContent: 'center',
              //margin: RFValue(13),
            }}
            
    onPress={() => {
      this.quotes()
            }}
          >
            <Text
              style={{
                paddingTop: "1%",
                color: "white",
                textAlign: "center",
                alignSelf:"center",
                alignItems:"center",
                justifyContent: 'center',
                fontFamily:"NerkoOne",
                fontSize:RFValue(20)

              }}
            >
              {this.state.displayedTip}
            </Text>
          </TouchableOpacity>
        </View>
         <Text style={{color: 'black', fontSize: RFValue(20),fontFamily: 'NerkoOne',marginLeft:10}}>Choose a category to explore</Text>
         <ScrollView style={{}}>
          <View style={styles.buttonContainer1}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '97%',
                height: 170,
                borderRadius:10,
                backgroundColor:"#2F5266",
              }} 
              onPress={() => this.props.navigation.navigate('G7EnglishScreen')}>
              <Image style={{width:'100%',height:'100%',borderRadius:10}}
            source={require("../assets/English.png")}
          ></Image> 
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '97%',
                height: 170,
                borderRadius:10,
                backgroundColor:"#BFA9E0",
                marginTop:30
              }} 
              onPress={() => this.props.navigation.navigate('G7MathsScreen')}>
              <Image style={{width:'100%',height:'100%',borderRadius:10}}
            source={require("../assets/Maths.png")}
          ></Image> 
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '97%',
                height: 170,
                borderRadius:10,
                backgroundColor:"#2F5266",
                marginTop:30
              }} 
              onPress={() => this.props.navigation.navigate('G7ScienceScreen')}>
              <Image style={{width:'100%',height:'100%',borderRadius:10}}
            source={require("../assets/Science.png")}
          ></Image> 
            </TouchableOpacity>
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
  quotebutton: {
      flex: 1,
  },
  buttonContainer1: {
    //flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    //flexDirection: 'row',
  },
   iconImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf:'center'
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.setHidden(true) : RFValue(15),
  },
});

