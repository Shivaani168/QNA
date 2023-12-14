import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import firebase from 'firebase';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  NerkoOne: require('../assets/fonts/NerkoOne-Regular.ttf'),
};

export default class ChemQuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      question_id: this.props.question.key,
      question_data: this.props.question.value,
      is_liked: false,
      likes: this.props.question.value.likes,
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

  likeAction = () => {
    if (this.state.is_liked) {
      firebase
        .database()
        .ref('chemistry')
        .child(this.state.question_id)
        .child('likes')
        .set(firebase.database.ServerValue.increment(-1));
      this.setState({ likes: (this.state.likes -= 1), is_liked: false });
    } else {
      firebase
        .database()
        .ref('chemistry')
        .child(this.state.question_id)
        .child('likes')
        .set(firebase.database.ServerValue.increment(1));
      this.setState({ likes: (this.state.likes += 1), is_liked: true });
    }
  };

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
    let question = this.state.question_data;
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      let images = {
        image_1: require('../assets/chemistry.jpg'),
        image_2: require('../assets/chemistry1.jpg'),
        image_3: require('../assets/chemistry2.jpg'),
        image_4: require('../assets/chemistry3.jpg'),
        image_5: require('../assets/chemistry4.jpg'),
      };
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate('ChemQuestionScreen', {
              question: question,
              question_id: this.state.question_id,
            })
          }>
          <SafeAreaView style={styles.droidSafeArea} />
          <View
            style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }>
            <Image
              source={images[question.preview_image]}
              style={styles.questionImage}></Image>
            <View style={styles.titleContainer}>
              <View style={styles.titleTextContainer}>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.questionTitleTextLight
                      : styles.questionTitleText
                  }>
                  {question.question}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.questionAuthorTextLight
                      : styles.questionAuthorText
                  }>
                  {question.student}
                </Text>
              </View>
            </View>

            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={
                  this.state.is_liked
                    ? styles.likeButtonLiked
                    : styles.likeButtonDisliked
                }
                onPress={() => this.likeAction()}>
                <Ionicons
                  name={'heart'}
                  size={RFValue(30)}
                  color={this.state.light_theme ? 'black' : 'white'}
                />

                <Text
                  style={
                    this.state.light_theme
                      ? styles.likeTextLight
                      : styles.likeText
                  }>
                  {this.state.likes}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: '#F5EDBE',
    borderRadius: RFValue(20),
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(5),
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: '#2f345d',
    borderRadius: RFValue(20),
  },
  questionImage: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(250),
    marginTop: RFValue(10),
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  questionTitleText: {
    fontSize: RFValue(25),
    fontFamily: 'NerkoOne',
    color: 'pink',
  },
  questionTitleTextLight: {
    fontSize: RFValue(25),
    fontFamily: 'NerkoOne',
    color: 'blue',
  },
  questionAuthorText: {
    fontSize: RFValue(18),
    fontFamily: 'NerkoOne',
    color: 'white',
  },
  questionAuthorTextLight: {
    fontSize: RFValue(18),
    fontFamily: 'NerkoOne',
    color: 'black',
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likeButtonLiked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  likeButtonDisliked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#eb3948',
    borderWidth: 2,
    borderRadius: RFValue(30),
  },
  likeText: {
    color: 'white',
    fontFamily: 'NerkoOne',
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeTextLight: {
    fontFamily: 'NerkoOne',
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6,
  },
});
