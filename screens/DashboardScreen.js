import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const DashboardScreen = ({navigation}) => {
    return (
        <View>
            <Button title="LoginScreen" onPress={() => navigation.navigate('LoginScreen')} />

        </View>
    )
}

export default DashboardScreen

const styles = StyleSheet.create({})
