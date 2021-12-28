import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import UserProfile from '../UserProfile/UserProfile';

const Stack = createNativeStackNavigator();
const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
