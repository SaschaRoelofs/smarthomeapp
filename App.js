import React, { useState, useEffect } from 'react';
import {StatusBar} from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';


import DashboardScreen from './screens/DashboardScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import SetupScreen1 from './screens/SetupScreen_1'
import SplashScreen from './screens/SplashScreen'
import SetupScreen_2 from './screens/SetupScreen_2'
import { Alert } from 'react-native';

//import RootStackScreen from './src/navigations/RootStack'


const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (

  <HomeStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <HomeStack.Screen name="DashboardScreen" component={DashboardScreen} headerMode="none" />
    <HomeStack.Screen name="SetupScreen1" component={SetupScreen1} />
    <HomeStack.Screen name="SetupScreen_2" component={SetupScreen_2} />
  </HomeStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator screenOptions={{
    headerShown: false
  }} >
    {userToken ? (
      <RootStack.Screen name="App" component={HomeStackScreen} />
    ) : (
        <RootStack.Screen name="Auth" component={AuthStackScreen} />
      )}
  </RootStack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);


  useEffect(() => {
    // checkPermission();
    // messageListener()
    auth().onIdTokenChanged((user) => {
      //console.log(user)
      if (user) {
        setIsLoading(false);
        setUserToken(user)
      } else {
        console.log("Not logged in")
        setIsLoading(false);
        setUserToken(user)
      }
    })

  }, [])


  if (isLoading) {
    return <SplashScreen />;
  }

  return (

    <NavigationContainer >
      <RootStackScreen userToken={userToken} />
    </NavigationContainer>
  );
}
