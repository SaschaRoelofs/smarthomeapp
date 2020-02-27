import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { Card, ListItem, Icon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const DashboardScreen = ({ navigation }) => {

    handleAction = () => {
        console.log("handleAction");
    }

    return (
        <View>
            {/* <Button title="LoginScreen" onPress={() => navigation.navigate('LoginScreen')} /> */}
            <Button title="Garagentor" onPress={() => handleAction()} />

        </View>
    )
}

export default DashboardScreen

const styles = StyleSheet.create({})
