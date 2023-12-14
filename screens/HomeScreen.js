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
  Dimensions,
  ImageBackground
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import firebase from 'firebase';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  NerkoOne: require('../assets/fonts/NerkoOne-Regular.ttf'),
  Fruktur: require('../assets/fonts/Fruktur-Italic.ttf'),
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      questions: [],
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

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === 'light' });
      });
  };
  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }>
          <ImageBackground source={require("../assets/bg4.png")} style={styles.backgroundImage}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }>
                Study app
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '25%',
                height: '25%',
              }} 
              onPress={() => this.props.navigation.navigate('BiologyScreen')}>
              <Image
                source={require('../assets/biologyLogo.png')}
                style={{ width: '220%', height: '70%' }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '25%',
                height: '25%',
              }}
              onPress={() => this.props.navigation.navigate('ChemistryScreen')}>
              <Image
                source={require('../assets/chemistryLogo.png')}
                style={{ width: '220%', height: '70%' }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24%',
                height: '25%',
              }}
              onPress={() => this.props.navigation.navigate('PhysicsScreen')}>
              <Image
                source={require('../assets/physicsLogo.png')}
                style={{ width: screenWidth-50, height: '70%' }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '23%',
                height: '23%',
              }}
              onPress={() => this.props.navigation.navigate('MathsScreen')}>
              <Image
                source={require('../assets/mathsLogo.png')}
                style={{ width: '230%', height: '70%' }}
              />
            </TouchableOpacity>
            <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight2
                    : styles.appTitleText2
                }>
                Reset the app to see the latest updates
              </Text>
          </View>
          <View style={{ flex: 0.08 }} />
          </ImageBackground>
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
    backgroundColor: 'pink',
  },
  backgroundImage: {
    flex : RFValue(1),
    resizeMode : "cover",
    height : screenHeight,
    width : screenWidth,
  },
  buttonContainer: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
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
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(50),
    fontFamily: 'NerkoOne',
  },
  appTitleTextLight: {
    color: 'black',
    fontSize: RFValue(50),
    fontFamily: 'NerkoOne',
  },
  appTitleText2: {
    color: 'white',
    fontSize: RFValue(20),
    fontFamily: 'NerkoOne',
  },
  appTitleTextLight2: {
    color: 'black',
    fontSize: RFValue(20),
    fontFamily: 'NerkoOne',
  },
});

