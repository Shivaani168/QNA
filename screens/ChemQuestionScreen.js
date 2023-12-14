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
  Dimensions,
  TextInput
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";
import * as Font from "expo-font";
import firebase from "firebase";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "NerkoOne": require("../assets/fonts/NerkoOne-Regular.ttf")
};

export default class ChemQuestionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      is_liked: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  async addAnswer() {
    this.props.navigation.navigate('ChemistryScreen');
    if (this.state.answer) {
      let answerData = {
        answer:this.state.answer
      };
      await firebase
        .database() 
        .ref('/biology/')
        .child(question.question_id)
        .child('answer')
        .set({answer:this.state.answer})
        .then(function (snapshot) {});
     // this.props.setUpdateToTrue();
      
    } else {
      alert( 
        'Error! All fields are required!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  render() {
    let question = this.state.question_data;
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      let images = {
        image_1: require('../assets/chemistry.jpg'),
        image_2: require('../assets/chemistry1.jpg'),
        image_3: require('../assets/chemistry2.jpg'),
        image_4: require('../assets/chemistry3.jpg'),
        image_5: require('../assets/chemistry4.jpg'),
      };
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >
                Study App
              </Text>
            </View>
          </View>
          <View style={styles.postContainer}>
            <ScrollView
              style={
                this.state.light_theme
                  ? styles.postCardLight
                  : styles.postCard
              }
            >
              <Image
                source={images[this.props.route.params.question.preview_image]}
                style={styles.image}
              ></Image>
              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.postTitleTextLight
                        : styles.postTitleText
                    }
                  >
                    {this.props.route.params.question.question}
                  </Text>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.postAuthorTextLight
                        : styles.postAuthorText
                    }
                  >
                    {this.props.route.params.question.student}
                  </Text>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.postAuthorTextLight
                        : styles.postAuthorText
                    }
                  >
                    {this.props.route.params.question.created_on}
                  </Text>
                </View>
              </View>
              <View style={styles.actionContainer}>
              <TouchableOpacity>
              <View style={this.state.is_liked?styles.likeButton:styles.likeButtonDisliked}>
                <View style={styles.likeButton}>
                  <Ionicons
                    name={"heart"}
                    size={RFValue(30)}
                    color={this.state.light_theme ? "black" : "white"}
                  />

                  <Text
                    style={
                      this.state.light_theme
                        ? styles.likeTextLight
                        : styles.likeText
                    }
                  >
                  {this.props.route.params.question.likes}
                  </Text>
                  </View> 
                </View>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.backButton} onPress={() =>
            this.props.navigation.navigate("Home")}>
                <Text
                    style={
                      this.state.light_theme
                        ? styles.likeTextLight
                        : styles.likeText
                    }
                  >
                    Back
                  </Text>
                </TouchableOpacity>
                <TextInput
            style={styles.textinput}
            onChangeText={(answer) => this.setState({ answer: answer })}
            placeholder={'Answer'}
            placeholderTextColor={'#FFFFFF'}
          />
                <TouchableOpacity
                  style={styles.backButton2}
                  onPress={() => this.addAnswer()}>
                  <Text 
                    style={
                      this.state.light_theme
                        ? styles.likeTextLight
                        : styles.likeText
                    }>
                    Answer!
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "#F5EDBE"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
appTitle: {
    flex: 0.08,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '200%',
    height: '200%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(10),
    fontFamily: 'NerkoOne',
  },
  appTitleTextLight: {
    color: 'black',
    fontSize: RFValue(50),
    fontFamily: 'NerkoOne',
  },
  postContainer: {
    flex: 1
  },
  postCard: {
    margin: RFValue(20),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  postCardLight: {
    margin: RFValue(20),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain",
    marginTop:10
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  postTitleText: {
    fontFamily: "NerkoOne",
    fontSize: RFValue(25),
    color: "white"
  },
  postTitleTextLight: {
    fontFamily: "NerkoOne",
    fontSize: RFValue(25),
    color: "black"
  },
  postAuthorText: {
    fontFamily: "NerkoOne",
    fontSize: RFValue(18),
    color: "pink"
  },
  postAuthorTextLight: {
    fontFamily: "NerkoOne",
    fontSize: RFValue(18),
    color: "blue"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30)
  },
    backButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30),
    marginTop:20,
    fontFamily: "NerkoOne",
  },
  likeText: {
    color: "white",
    fontFamily: "NerkoOne",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeTextLight: {
    fontFamily: "NerkoOne",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(40),
    padding: RFValue(10),
    marginTop: RFValue(10),
    borderColor: '#FFFFFF',
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(15),
    color: '#FFFFFF',
    backgroundColor: 'black',
    fontFamily: 'NerkoOne',
  },
  backButton2: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(30),
    fontFamily: 'NerkoOne',
  },
});