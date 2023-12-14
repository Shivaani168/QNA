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
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase";
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "NerkoOne": require("../assets/fonts/NerkoOne-Regular.ttf")
};

export default class PhysicsAddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "image_1",
      dropdownHeight: 40,
      light_theme: true,
      name: ""
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

 async fetchUser() {
    let theme, name;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
        name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
      });
    this.setState({
      light_theme: theme === "light" ? true : false,
      isEnabled: theme === "light" ? false : true,
      name: name,
    });
  }

  async addQuestion() {
    if (this.state.question) {
      let questionData = {
        preview_image: this.state.previewImage,
        question: this.state.question,
        student: this.state.name,
        created_on: new Date(),
        student_uid: firebase.auth().currentUser.uid,
        likes: 0
      }
      await firebase
        .database()
        .ref("/physics/" + (Math.random().toString(36).slice(2)))
        .set(questionData)
        .then(function (snapshot) {

        })
      this.props.setUpdateToTrue();
      this.props.navigation.navigate('PhysicsScreen')
    } else {
      alert(
        'Error! All fields are required!',
        '',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      let preview_images = { 
        image_1: require('../assets/physics.jpg'),
        image_2: require('../assets/physics1.png'),
        image_3: require('../assets/physics2.jpg'),
        image_4: require('../assets/physics3.jpg'),
        image_5: require('../assets/physics4.png'),
      };
      return (
<View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>Add Question</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <Image
              source={preview_images[this.state.previewImage]}
              style={styles.previewImage}></Image>
            <View style={{ height: RFValue(this.state.dropdownHeight) }}>
              <DropDownPicker
                items={[
                  { label: 'Image 1', value: 'image_1' },
                  { label: 'Image 2', value: 'image_2' },
                  { label: 'Image 3', value: 'image_3' },
                  { label: 'Image 4', value: 'image_4' },
                  { label: 'Image 5', value: 'image_5' },
                ]}
                defaultValue={this.state.previewImage}
                open={this.state.dropdownHeight == 300 ? true : false}
                onOpen={() => {
                  this.setState({ dropdownHeight: 300 });
                }}
                onClose={() => {
                  this.setState({ dropdownHeight: 40 });
                }}
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor:this.state.light_theme
                    ? "black"
                    : "white",
                }}
                textStyle={{
                  color: this.state.light_theme ? 'black': 'white' && this.state.dropdownHeight == 300 ? 'black' : 'white',
                  fontFamily: 'NerkoOne',
                }}
                onSelectItem={(item) =>
                  this.setState({
                    previewImage: item.value,
                  }) 
                }
              />
            </View>
            <ScrollView> 
              <TextInput
                style={
                  this.state.light_theme
                    ? styles.inputFontLight
                    : styles.inputFont
                }
                onChangeText={(question) => this.setState({ question })}
                placeholder={'Question'}
                placeholderTextColor={this.state.light_theme
                    ? "black"
                    : "white"}
              />
              <View style={styles.submitButton}>
              <TouchableOpacity
              style={styles.backButton}
              onPress={() => this.addQuestion()}>
              Submit
                </TouchableOpacity>
                <TouchableOpacity
              style={styles.backButton2}
              onPress={() => this.props.navigation.navigate('PhysicsScreen')}>
              Back
            </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006A6B',
  },
  containerLight: {
    flex: 1,
    backgroundColor: "pink",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
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
    flex: 0.8,
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
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain',
  },
  inputFont: {
    height: RFValue(40),
    marginTop: RFValue(40),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'white',
    fontFamily: 'NerkoOne',
  },
  inputFontLight: {
    height: RFValue(40),
    marginTop: RFValue(40),
    borderColor: 'black',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'black',
    fontFamily: 'NerkoOne',
  },
  backButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30),
    fontFamily: "NerkoOne"
  },
  backButton2: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30),
    fontFamily: "NerkoOne",
    marginTop:20
  },
  submitButton: {
    marginTop: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
