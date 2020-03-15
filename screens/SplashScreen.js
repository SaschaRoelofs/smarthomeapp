import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

const SplashScreen = () => {
    return (
        <View>
            <Text>Loading...</Text>
            <ActivityIndicator />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    }
    

})
