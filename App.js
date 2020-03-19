import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import auth from '@react-native-firebase/auth';


import DashboardScreen from './screens/DashboardScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import SetupScreen1 from './screens/SetupScreen1'
import SplashScreen from './screens/SplashScreen'
import SetupScreen_2 from './screens/SetupScreen_2'


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
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  
    //1
  // async function checkPermission() {
  //   const enabled = await Firebase.messaging().hasPermission();
  //   if (enabled) {
  //       getToken();
  //   } else {
  //       requestPermission();
  //   }
  // }
  
  //   //3
  //   async function getToken() {
  //   let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   if (!fcmToken) {
  //       fcmToken = await Firebase.messaging().getToken();
  //       if (fcmToken) {
  //           // user has a device token
  //           await AsyncStorage.setItem('fcmToken', fcmToken);
  //       }
  //   }
  // }
  
  //   //2
  //   async function requestPermission() {
  //   try {
  //       await Firebase.messaging().requestPermission();
  //       // User has authorised
  //       getToken();
  //   } catch (error) {
  //       // User has rejected permissions
  //       console.log('permission rejected');
  //   }
  // }

  // async function createNotificationListener() {
  //   Firebase.notifications().onNotification(notification => {
  //     notification.android.setChannelId('insider').setSound('default')
  //     Firebase.notifications().displayNotification(notification)
  //   })
  // }
  

  useEffect(() => {
    
    // const channel = new Firebase.notifications.Android.Channel('insider', 'insider channel', Firebase.notifications.Android.Importance.Max)
    // Firebase.notifications().android.createChannel(channel)
    // checkPermission();
    // createNotificationListener();
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
    });

  }, [])

  if (isLoading) {
    return <SplashScreen />;
  }

  return (

      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>

  );
};

