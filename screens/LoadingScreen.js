import React from "react";
import {Text, StyleSheet,View,TouchableOpacity,TextInput,Image,SafeAreaView,Platform,StatusBar,ImageBackground,Dimensions} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase"

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default class LoadingScreen extends React.Component{
componentDidMount(){
  this.loading()
}

 loading = () => {
    firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    this.props.navigation.navigate("ClassChoice");
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;
    // ...
  } else {
    this.props.navigation.replace("SplashScreen");
    // User is signed out
    // ...
  }
});

  };

render(){
  return(
 <View style = {styles.container}>

                <SafeAreaView style = {styles.droidSafeArea} />
               <ImageBackground source={require("../assets/loading.gif")}
                resizeMode='contain' style={{  flex : RFValue(1),
    resizeMode : "cover",
    alignSelf:'center',
    height : screenHeight,
    width : screenWidth-100,}}></ImageBackground>
            </View>
  )
}
}


const styles = StyleSheet.create({


  container : {
    flex : RFValue(1),
    backgroundColor : "periwinkle"
  },
 
  droidSafeArea : {
    marginTop: Platform.OS == "android" ? StatusBar.setHidden(true) : RFValue(0)
  },
})