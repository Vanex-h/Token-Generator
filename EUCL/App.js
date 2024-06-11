// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TokenGenerator from './components/TokenGenerator';
import TokenValidator from './components/TokenValidator';
import TokenHistory from './components/TokenHistory';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TokenValidator">
        <Stack.Screen name="TokenGenerator" component={TokenGenerator} />
        <Stack.Screen name="TokenValidator" component={TokenValidator} />
        <Stack.Screen name="TokenHistory" component={TokenHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
