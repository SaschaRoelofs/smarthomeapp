import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';


import DashboardScreen from './src/screens/DashboardScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignupScreen from './src/screens/SignupScreen'
import SetupScreen1 from './src/screens/SetupScreen1'
import SplashScreen from './src/screens/SplashScreen'
import SetupScreen_2 from './src/screens/SetupScreen_2'
import { Alert } from 'react-native';


const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="DashboardScreen" component={DashboardScreen} headerMode="none" />
    <HomeStack.Screen name="SetupScreen1" component={SetupScreen1} />
    <HomeStack.Screen name="SetupScreen_2" component={SetupScreen_2} />
  </HomeStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
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
    <NavigationContainer>
      <RootStackScreen userToken={userToken} />
    </NavigationContainer>
  );
}

