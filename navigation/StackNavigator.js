import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import G7HomeScreen from '../screens/G7HomeScreen';
import G8HomeScreen from '../screens/G8HomeScreen';
import G9HomeScreen from '../screens/G9HomeScreen';
import G10HomeScreen from '../screens/G10HomeScreen';
import Profile from "../screens/Profile";
import G7EnglishScreen from '../screens/G7EnglishScreen';
import G8EnglishScreen from '../screens/G8EnglishScreen';
import G9EnglishScreen from '../screens/G9EnglishScreen';
import EnglishScreen from '../screens/EnglishScreen';
import G7EnglishAnswerQs from '../screens/G7EnglishAnswerQs';
import G8EnglishAnswerQs from '../screens/G8EnglishAnswerQs';
import G9EnglishAnswerQs from '../screens/G9EnglishAnswerQs';
import EnglishAnswerQs from '../screens/EnglishAnswerQs';
import G7ScienceScreen from '../screens/G7ScienceScreen';
import G8ScienceScreen from '../screens/G8ScienceScreen';
import G9ScienceScreen from '../screens/G9ScienceScreen';
import BiologyScreen from '../screens/BiologyScreen';
import ChemistryScreen from '../screens/ChemistryScreen';
import G7MathsScreen from '../screens/G7MathsScreen';
import G8MathsScreen from '../screens/G8MathsScreen';
import G9MathsScreen from '../screens/G9MathsScreen';
import MathsScreen from '../screens/MathsScreen';
import PhysicsScreen from '../screens/PhysicsScreen';
import G7AddQuestion from '../screens/G7AddQuestion';
import G8AddQuestion from '../screens/G8AddQuestion';
import G9AddQuestion from '../screens/G9AddQuestion';
import AddQuestion from '../screens/AddQuestion';
import G7ScienceAnswerQs from '../screens/G7ScienceAnswerQs';
import G8ScienceAnswerQs from '../screens/G8ScienceAnswerQs';
import G9ScienceAnswerQs from '../screens/G9ScienceAnswerQs';
import BioAnswerQuestion from '../screens/BioAnswerQs';
import ChemAnswerQuestion from '../screens/ChemAnswerQs';
import PhysicsAnswerQuestion from '../screens/PhysicsAnswerQs';
import G7MathsAnswerQs from '../screens/G7MathsAnswerQs';
import G8MathsAnswerQs from '../screens/G8MathsAnswerQs';
import G9MathsAnswerQs from '../screens/G9MathsAnswerQs';
import MathsAnswerQuestion from '../screens/MathsAnswerQs';
import ClassChoice from '../screens/ClassChoice';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ClassChoice"
      screenOptions={{
        headerShown: false,
         
      }}>
<Stack.Screen name="ClassChoice" component={ClassChoice}  />
<Stack.Screen name="Profile" component={Profile} />
<Stack.Screen name="G7Home" component={G7HomeScreen} />
<Stack.Screen name="G8Home" component={G8HomeScreen} />
<Stack.Screen name="G9Home" component={G9HomeScreen} />
<Stack.Screen name="G10Home" component={G10HomeScreen} />
<Stack.Screen name="G7EnglishScreen" component={G7EnglishScreen} />
<Stack.Screen name="G8EnglishScreen" component={G8EnglishScreen} />
<Stack.Screen name="G9EnglishScreen" component={G9EnglishScreen} />
<Stack.Screen name="EnglishScreen" component={EnglishScreen} />
<Stack.Screen name="G7EnglishAnswerQs" component={G7EnglishAnswerQs} />
<Stack.Screen name="G8EnglishAnswerQs" component={G8EnglishAnswerQs} />
<Stack.Screen name="G9EnglishAnswerQs" component={G9EnglishAnswerQs} />
<Stack.Screen name="EnglishAnswerQs" component={EnglishAnswerQs} />
<Stack.Screen name="G7ScienceScreen" component={G7ScienceScreen} />
<Stack.Screen name="G8ScienceScreen" component={G8ScienceScreen} />
<Stack.Screen name="G9ScienceScreen" component={G9ScienceScreen} />
<Stack.Screen name="G7ScienceAnswerQs" component={G7ScienceAnswerQs} />
<Stack.Screen name="G8ScienceAnswerQs" component={G8ScienceAnswerQs} />
<Stack.Screen name="G9ScienceAnswerQs" component={G9ScienceAnswerQs} />
<Stack.Screen name="BiologyScreen" component={BiologyScreen} />
<Stack.Screen name="ChemistryScreen" component={ChemistryScreen} />
<Stack.Screen name="PhysicsScreen" component={PhysicsScreen} />
<Stack.Screen name="BioAnswerQuestion" component={BioAnswerQuestion} />
<Stack.Screen name="ChemAnswerQuestion" component={ChemAnswerQuestion} />
<Stack.Screen name="PhysicsAnswerQuestion" component={PhysicsAnswerQuestion} />
<Stack.Screen name="G7MathsScreen" component={G7MathsScreen} />
<Stack.Screen name="G8MathsScreen" component={G8MathsScreen} />
<Stack.Screen name="G9MathsScreen" component={G9MathsScreen} />
<Stack.Screen name="MathsScreen" component={MathsScreen} />
<Stack.Screen name="G7MathsAnswerQs" component={G7MathsAnswerQs} />
<Stack.Screen name="G8MathsAnswerQs" component={G8MathsAnswerQs} />
<Stack.Screen name="G9MathsAnswerQs" component={G9MathsAnswerQs} />
<Stack.Screen name="MathsAnswerQuestion" component={MathsAnswerQuestion} />
<Stack.Screen name="G7AddQuestion" component={G7AddQuestion} />
<Stack.Screen name="G8AddQuestion" component={G8AddQuestion} />
<Stack.Screen name="G9AddQuestion" component={G9AddQuestion} />
<Stack.Screen name="AddQuestion" component={AddQuestion} />
</Stack.Navigator>
  );
};

export default StackNavigator;
