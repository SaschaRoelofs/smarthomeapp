import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Firebase from './components/Firebase'

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

  useEffect(() => {
    Firebase.auth().onIdTokenChanged((user) => {
      //console.log(user)
      if (user) {
        setIsLoading(false);
        setUserToken(user)
      } else {
        console.log("Fehler...")
        setIsLoading(true);
        setUserToken(user)
      }
    });

  }, [])

  // if (isLoading) {
  //   return <SplashScreen />;
  // }

  return (

      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>

  );
};

// const Stack = createStackNavigator();

// function App() {
//   return (

//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{
//         headerShown: false
//       }} initialRouteName="LoginScreen">
//         <Stack.Screen name="SignupScreen" component={SignupScreen} />
//         <Stack.Screen name="LoginScreen" component={LoginScreen} />
//         <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
//         <Stack.Screen name="SetupScreen1" component={SetupScreen1} />
//       </Stack.Navigator>
//     </NavigationContainer>

//   );
// }

// export default App;
