
import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Profile from '../screens/Profile'

const SwitchNavigator = createSwitchNavigator(
    {
        LoginScreen: {
            screen: LoginScreen
        },
        SignupScreen: {
            screen: SignupScreen
        },
        DashboardScreen: {
            screen: DashboardScreen
        }
    },
    {
        initialRouteName: 'LoginScreen'
    }
)

export default createAppContainer(SwitchNavigator)