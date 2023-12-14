import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screens/Profile';
import StackNavigator from './StackNavigator';
import Logout from '../screens/Logout';
import CustomDrawer from './CustomerDrawer';


// const Drawer = createDrawerNavigator();




// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator  
//     screenOptions={{
//       headerShown: false,
//       drawerActiveBackgroundColor: '#1c0f24',
//       drawerActiveTintColor: "white",
//       drawerInactiveTintColor: "black",
//       drawerLabelStyle: {
//         fontSize: 17,
//       },}}>
//       <Drawer.Screen
//         name="Home"
//         component={StackNavigator}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Drawer.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           headerShown: false,
//         }}
//       />
     
//       <Drawer.Screen
//         name="Logout"
//         component={Logout}
//         options={{ unmountOnBlur: true }}
//       />
//     </Drawer.Navigator>
//   );
// };




// export default DrawerNavigator;







const Drawer=createDrawerNavigator()
const DrawerNavigator= ()=>{
  return(
    <Drawer.Navigator useLegacyImplementation
    >
      <Drawer.Screen
        name="Home"
        component={StackNavigator}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
      />


    </Drawer.Navigator>

  )
}

export default DrawerNavigator;