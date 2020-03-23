import React, { useState, useEffect } from 'react'
import { Image, View, StatusBar, StyleSheet, ToastAndroid, PermissionsAndroid, KeyboardAvoidingView } from 'react-native'
import auth from '@react-native-firebase/auth';

import DismissKeyboard from '../components/DismissKeyboard'
import { InputEmail, InputPassword } from '../components/Input'
import { Button, TextButton } from '../components/Button'
import {colors} from '../config/theme'
import imageLogo from '../assets/images/logo.png'



function LoginScreen({ navigation }) {
    const [nickname, setNickname] = useState('')
    const [error, setError] = useState(false)


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
                        value={nickname}
                        onChangeText={nickname => setNickname(nickname)}
                        error={error}
                        placeholder="Name"
                    />
                    <Button
                        title="Weiter"
                        onPress={() => navigation.navigate("SignupScreen", { nickname: nickname })}
                        disabled={!nickname}
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

