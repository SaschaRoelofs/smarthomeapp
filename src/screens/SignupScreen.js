import React, { useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

function SignupScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')


    async function handleSignUp() {
        try {
            await auth().createUserWithEmailAndPassword(username, password);
            const fcmToken = await getFcmToken()
            createUserInDatabase(fcmToken)
        } catch (e) {
            console.error(e.message);
        }
    }

    const getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            return fcmToken
        } else {
            showAlert('Failed', 'No token received');
        }
    }

    const createUserInDatabase = (fcmToken) => {

        axios.post('http://5.181.50.205:4000/create-user', {
            "email": auth().currentUser.email,
            "FCMToken": fcmToken,
        }).then((res) => {
            //console.log(res)
        }).catch((error) => {
            if (error == 'Error: Network error') {
                Alert.alert('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');
            }
        });
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