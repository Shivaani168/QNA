import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  NerkoOne: require('../assets/fonts/NerkoOne-Regular.ttf'),
};
import { AntDesign } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import firebaseConfig from '../config';
// firebase 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  const existingApp = firebase.app();
  console.log('Existing Firebase app:', existingApp);
}
const db=firebase.firestore();

export default class G7EnglishScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      questions: [],
      name:''
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchQuestions();
    this.getUserDetails();
   
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

  fetchQuestions = () => {
       const user = firebase.auth().currentUser;

    const email = user.email;

    db.collection("questionGrade7").where('subject','==','english').onSnapshot((snapshot) => {
      var allT = [];
      snapshot.docs.map((doc) => {
        var task = doc.data();
        task.id = doc.id;
        allT.push(task);
      })
          this.setState({ questions: allT });
          console.log(this.state.questions);
          //this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log('The read failed: ' + errorObject.code);
        }
      );
  };



  renderItem = ({ item }) => {
    return (
<TouchableOpacity onPress={()=>this.props.navigation.navigate('G7EnglishAnswerQs', {questionId:item.id,question:item.question})}>
     <View style={{backgroundColor:'white',alignSelf:'center',borderRadius:30,width:screenWidth-20,margin:10}}
           >
            <Text style={{
             fontSize:RFValue(20),
             textAlign:'center',
             color:'black',
             fontFamily:'NerkoOne',
             margin:10
           }}>
            Question: {item.question}
           </Text>
           <Text style={{
             fontSize:RFValue(15),
             textAlign:'center',
             color:'black',
             fontFamily:'NerkoOne',
             alignSelf:'flex-end',
             marginRight:20
             }}>
            Posted by {item.username}
                </Text>
          </View> 
          </TouchableOpacity>
      
    );
  };

    emptylist=()=>{
        return(
          <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',}}>
      <Text style={{fontSize:RFValue(25),textAlign:'center',color:'white',fontFamily:'NerkoOne',alignSelf:'center',justifyContent:'center',alignItems:'center',}} > No questions at the moment. Please click on the '+' icon to create one.</Text>
      </View>
        ) 
      }

  keyExtractor = (item, index) => index.toString();

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View
          style={styles.cardContainer1}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <TouchableOpacity style={{margin:10}} onPress={() => this.props.navigation.navigate('G7Home')}>
       <AntDesign name="leftcircleo" size={30} color="black" />
       </TouchableOpacity>
       <TouchableOpacity style={{
         width: RFValue(35),
         height: RFValue(30),
         alignItems: 'center',
         backgroundColor: 'white',
         borderRadius: 50,
         justifyContent:"center",
         margin:RFValue(8)
         }}
          onPress={() => this.props.navigation.navigate('G7AddQuestion')}
          >
          <AntDesign name="plus" size={32} color="black" />
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row",justifyContent: 'center',
    alignItems: 'center',marginRight:RFValue(70),marginDown:RFValue(20),backgroundColor:" white"}}>
            <Image
                source={require('../assets/englishlogo.png')}
                style={styles.iconImage}></Image>
              <Text style={styles.appTitleText}>
                English
              </Text>
              </View>
 <View style={styles.buttonContainer}>
              <FlatList 
               ListEmptyComponent={()=>this.emptylist()}
                        scrollEnabled
                keyExtractor={this.keyExtractor}
                data={this.state.questions}
                renderItem={this.renderItem}
              />
           </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
cardContainer1: {
  flex:1,
    backgroundColor: '#4EBEEA',
    //borderRadius: RFValue(20),
    },
    buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.setHidden(true) : RFValue(15),
  },
  iconImage: {
    width: RFValue(100),
    height: RFValue(100),
    resizeMode: 'contain',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(60),
    fontFamily: 'NerkoOne',
    //marginTop:60
  },
});