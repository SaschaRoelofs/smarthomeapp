import React, { useState } from 'react'
import { View, Image, KeyboardAvoidingView, StyleSheet, StatusBar, ToastAndroid } from 'react-native'
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import DismissKeyboard from '../components/DismissKeyboard'
import { InputEmail, InputPassword } from '../components/Input'
import { Button, TextButton } from '../components/Button'
import {colors} from '../config/theme'
import imageLogo from '../assets/images/logo.png'
import {post} from '../services/POST'

function SignupScreen({ navigation, route }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [error, setError] = useState(false)
    const {nickname} = route.params

    async function handleSignUp() {
        try {
            if (password === verifyPassword) {
                await auth().createUserWithEmailAndPassword(username, password);
                const fcmToken = await getFcmToken()
                createUserInDatabase(fcmToken)
            } else {
                console.log("Error")
                setError(true)
                ToastAndroid.showWithGravity(
                    'E-Mail oder Passwort sind falsch. Bitte versuche es nocheinmal',
                    ToastAndroid.LONG,
                    ToastAndroid.TOP
                );
            }

        } catch (e) {
            console.log("Error")
            setError(true)
            ToastAndroid.showWithGravity(
                'E-Mail oder Passwort sind falsch. Bitte versuche es nocheinmal',
                ToastAndroid.LONG,
                ToastAndroid.TOP
            );
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
            "nickname": nickname,
            "email": auth().currentUser.email,
            "FCMToken": fcmToken,
            "askFor": ''
        }).then((res) => {
            //console.log(res)
        }).catch((error) => {
            if (error == 'Error: Network error') {
                Alert.alert('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');
            }
        });
    }

    return (

        <DismissKeyboard >
            <KeyboardAvoidingView style={styles.container}>
                <StatusBar
                    backgroundColor="#FFFFFF"
                    barStyle="dark-content"
                />
                <Image source={imageLogo} style={styles.logo} />
                <View style={styles.form}>

                    <InputEmail
                        value={username}
                        onChangeText={username => setUsername(username)}
                        error={error}
                        placeholder="E-Mail"
                    />
                    <InputPassword
                        value={password}
                        onChangeText={password => setPassword(password)}
                        error={error}
                        placeholder="Password"
                    />
                    <InputPassword
                        value={verifyPassword}
                        onChangeText={verifyPassword => setVerifyPassword(verifyPassword)}
                        error={error}
                        placeholder="Password bestätigen"
                    />

                    <Button
                        title="Login"
                        onPress={() => handleSignUp()}
                        disabled={!username || !password || !verifyPassword}
                    />


                </View>
            </KeyboardAvoidingView>
        </DismissKeyboard>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        alignItems: "center",
        justifyContent: "space-between"
    },
    logo: {
        flex: 1,
        width: "100%",
        resizeMode: 'contain',
        alignSelf: "center",

    },
    form: {
        flex: 1,
        justifyContent: "center",
        width: "80%",
    }
});

export default SignupScreen