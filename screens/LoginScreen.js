import React, { useState, useEffect } from 'react'
import { Image, View, StatusBar, StyleSheet, SafeAreaView, ToastAndroid, PermissionsAndroid, KeyboardAvoidingView, Keyboard } from 'react-native'
import auth from '@react-native-firebase/auth';

import DismissKeyboard from '../components/DismissKeyboard'
import { InputEmail, InputPassword } from '../components/Input'
import { Button, TextButton } from '../components/Button'
import colors from '../config/colors'
import imageLogo from '../assets/images/logo.png'


async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location permission is required for scanning wifi networks',
                message:
                    'This app needs location permission as this is required  ' +
                    'to scan for wifi networks.',
                buttonNegative: 'DENY',
                buttonPositive: 'ALLOW',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use Location');
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}
async function requestSettingsPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Settings permission is required for scanning wifi networks',
                message:
                    'This app needs settingd permission as this is required  ' +
                    'to scan for wifi networks.',
                buttonNegative: 'DENY',
                buttonPositive: 'ALLOW',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use Settings');
        } else {
            console.log('Settings permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)


    async function handleLogin() {
        try {
            await auth().signInWithEmailAndPassword(username, password).then(() => console.log("success"))
        } catch (e) {
            console.log("Error")
            setError(true)
            ToastAndroid.showWithGravity(
                'E-Mail oder Passwort sind falsch. Bitte versuche es nocheinmal',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
        }
    }

    useEffect(() => {
        requestLocationPermission();
        requestSettingsPermission();
    }, [])

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
                    />
                    <InputPassword
                        value={password}
                        onChangeText={password => setPassword(password)}
                        error={error}
                        placeholder="Password"
                    />

                    <Button
                        title="Login"
                        onPress={() => handleLogin()}
                        disabled={!username || !password}
                    />
                    <TextButton
                        title="Don't have an account yet? Sign up"
                        onPress={() => navigation.navigate('SignupScreen')}
                        disabled={false}
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

export default LoginScreen

