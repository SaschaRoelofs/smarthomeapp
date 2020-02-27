import React, { useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'

import Firebase from '../components/Firebase'

function SignupScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')


    handleSignUp = () => {

        // storeEmail();
        // storePassword();
        // console.log(getUsername());

        Firebase.auth()
            .createUserWithEmailAndPassword(username, password)
            .then(() => navigation.navigate('DashboardScreen'))
            .catch(error => console.log(error))


    }

    // storeEmail = async (username) => {

    //     try {
    //         await AsyncStorage.setItem('@username', username )
    //     } catch (e) {
    //         // save error
    //     }

    //     console.log('Done.')
    // }

    // storePassword = async (password) => {
    //     try {
    //         await AsyncStorage.setItem('@password', password )
    //     } catch (e) {
    //         // save error
    //     }

    //     console.log('Done.')
    // }



    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                value={username}
                onChangeText={username => setUsername(username)}
                placeholder='Email'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputBox}
                value={password}
                onChangeText={password => setPassword(password)}
                placeholder='Password'
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
        </View>
    )

}

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
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#FFA611',
        borderColor: '#FFA611',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})

export default SignupScreen