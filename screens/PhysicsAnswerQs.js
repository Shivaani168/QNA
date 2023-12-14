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
  Text,ScrollView
} from 'react-native';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';

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
  NerkoOne: require('../assets/fonts/NerkoOne-Regular.ttf'),
};

const appIcon = require('../assets/logo.png');

export default class PhysicsAnswerQs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      fontsLoaded: false,
      questionId: props.route.params.questionId,
      //question:props.route.params.question,
      answers: [],
      name:'',
      ansname: '',
      question:''
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

 componentDidMount() {
    this._loadFontsAsync();
    this.loadAnswers(); // Load answers when the component mounts
    this.getUserDetails()
    this.getAnswerUserDetails()
    this.loadQuestion();
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

       getAnswerUserDetails = () => {
        db.collection("questionGrade10")
          .where("subject", "==","physics")
          .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {

            this.setState({ansname : doc.data().ansusername})
            })
        })
    }

  loadAnswers = async () => {
     const { questionId } = this.state;

    try {
      const docSnapshot = await firebase
        .firestore()
        .collection('questionGrade10')
        .doc(questionId)
        .get();

      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        const answers = data.answer || [];
        this.setState({ answers });
      }
    } catch (error) {
      console.error('Error loading answers: ', error);
    }
  };

    loadQuestion = async () => {
     const { questionId } = this.state;

    try {
      const docSnapshot = await firebase
        .firestore()
        .collection('questionGrade10')
        .doc(questionId)
        .get();

      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        const question = data.question || [];
        this.setState({ question });
      }
    } catch (error) {
      console.error('Error loading question: ', error);
    }
  };

 addAnswer =async () => {
    const { answer, questionId } = this.state;

    if (answer.trim() !== '') {
      
      try {
        const docRef = await 
          db
          .collection('questionGrade10')
          .doc(questionId);

        await docRef.update({
          answer: firebase.firestore.FieldValue.arrayUnion(this.state.name+": "+answer),
          
        });

        this.loadAnswers(); // Reload answers after submitting a new answer
        alert('Answer submitted successfully');
      } catch (error) {
        console.error('Error adding answer: ', error);
        alert(error.message);
      }
    } else {
      alert('Please enter your answer');
    }
  };

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
    // const { answer } = this.state;

      return ( 
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <View
          style={{
           // margin: "5%",
            flexDirection: "row",
           // marginLeft: "2%",
            justifyContent: "center",
            width:'98%',
             backgroundColor: "white",
             borderRadius:20,
             alignSelf:'center',
             marginTop:20
             //margin: RFValue(13),
          }}
        >
         <Image
            source={require("../assets/whitelogo.png")}
            style={{ 
              width: RFValue(140),
              height: RFValue(140),
              paddingLeft:20,
              borderRadius:30,
              resizeMode:'contain',
              //marginLeft:5, 
              backgroundColor:"white",
              //margin: RFValue(13),
              }}
          ></Image> 
          <TouchableOpacity
            style={{
              width: "60%",
              paddingTop: "1%",
              paddingLeft: "1%",
              paddingBottom: "2%",
              alignSelf: "center",
              borderRadius: 10,
              backgroundColor: "white",
              //margin: RFValue(13),
            }}
            
          >
            <Text
              style={{
                paddingTop: "1%",
                color: "black",
                //fontWeight: "bold",
                textAlign: "center",
                fontFamily:"NerkoOne",
                fontSize:RFValue(40)
              }}
            >
              {this.state.question}
            </Text>
          </TouchableOpacity>
        </View>
 <ScrollView style={styles.answerContainer}>
            {this.state.answers.map((answer, index) => (
              <Text key={index} style={styles.answerText}>
              Answered by  {answer}
              </Text>
            ))}
          </ScrollView>


          <TextInput
            style={styles.textinput}
            onChangeText={(answer) => this.setState({ answer: answer })}
            placeholder={'Enter the answer to the question'}
            placeholderTextColor={'black'}
          />
          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={() => this.addAnswer()}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginTop: 10 }]}
            onPress={() => this.props.navigation.navigate('PhysicsScreen')}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAC329',
    alignItems: 'center',
    justifyContent: 'center',
  },
    answerContainer: {
    marginTop: RFValue(20),
    paddingHorizontal: RFValue(20),
  },
    answerText: {
    fontSize: RFValue(25),
    color: '#FFFFFF',
    fontFamily: 'NerkoOne',
    marginBottom: RFValue(10),
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.setHidden(true) : RFValue(15),
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(40),
    padding: RFValue(10),
    marginTop: RFValue(10),
    borderColor: 'black',
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(15),
    color: '#black',
    backgroundColor: 'white',
    fontFamily: 'NerkoOne',
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: 'white',
    marginBottom: RFValue(10),
    borderColor:"black",
    borderWidth: RFValue(4),
    resizeMode: 'contain',
    alignSelf : "center",
  },
  buttonText: {
    fontSize: RFValue(24),
    color: '#15193c',
    fontFamily: 'NerkoOne',
  },
});