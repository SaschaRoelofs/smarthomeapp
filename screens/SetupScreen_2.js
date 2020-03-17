import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const SetupScreen_2 = () => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                value={username}
                //onChangeText={}
                placeholder='Garage...'
                autoCapitalize='none'
            />
            <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SetupScreen_2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },

})
