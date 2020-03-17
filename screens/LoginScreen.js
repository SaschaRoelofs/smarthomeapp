import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button, AsyncStorage } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Firebase from '../components/Firebase'



function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const auth = Firebase.auth()

    // useEffect(() => {
    //     console.log("UseEffect")

    //     auth.onIdTokenChanged((user) => {
    //         if (user) {
    //             navigation.navigate('DashboardScreen')
    //         } else {
    //             console.log("Fehler")
    //         }
    //     });

    // })

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(username, password)
            .then(() => navigation.push('DashboardScreen'))
            .catch(error => console.log(error))

    }



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
            <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Button
                title="Don't have an account yet? Sign up"
                onPress={() => navigation.navigate('SignupScreen')}
            />

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
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
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

export default LoginScreen

