import React from "react";
import {Text, StyleSheet,View,TouchableOpacity,TextInput,Image,SafeAreaView,Platform,StatusBar,ImageBackground,Dimensions} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

let customFonts = {
  NerkoOne: require('../assets/fonts/NerkoOne-Regular.ttf'),
};

export default class SplashScreen extends React.Component{
render(){
  return(
 <View style = {styles.container}>


                <SafeAreaView style = {styles.droidSafeArea} />
                <ImageBackground
                style = {styles.backgroundImage}
                source={require("../assets/splashscreen.gif")}
                resizeMode='cover'>


                    <View style={{backgroundColor:'darkGrey',height:screenHeight/2,width:screenWidth,marginTop:screenHeight/1.3,borderTopLeftRadius:30,borderTopRightRadius:30}}>
                    <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={()=>this.props.navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
                    </View>


                 
                </ImageBackground>


            </View>
  )
}
}


const styles = StyleSheet.create({


  container : {
    flex : RFValue(1),
    backgroundColor : "white"
  },
  droidSafeArea : {
    marginTop: Platform.OS == "android" ? StatusBar.setHidden(true) : RFValue(0)
  },
  backgroundImage : {
    flex : RFValue(1),
    resizeMode : "cover",
    height : screenHeight,
    width : screenWidth,
  },
  goText : {
    alignSelf : "center",
    fontWeight : "bold",
    fontSize : RFValue(26),
    marginTop : screenHeight/25,
    //backgroundColor : "rgb(220, 188, 196)",
    borderRadius : RFValue(10),
    paddingHorizontal : RFValue(90),
    padding : RFValue(10),
    fontFamily: "NerkoOne"
  },
  button: {
    width: RFValue(250),
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
    alignSelf : "center",
  },
  buttonText: {
    fontSize: RFValue(24),
    color: 'black',
    fontFamily: 'NerkoOne',
    borderColor: "black"
  },
})
