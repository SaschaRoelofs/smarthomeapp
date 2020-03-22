import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'

import colors from "../config/colors";

const InputEmail = ({ onChangeText, value, error }) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <View style={styles.container} >
            <TextInput
                //Style
                style={styles.textInput}
                selectionColor={
                    error
                        ? colors.TORCH_RED
                        : isFocused
                            ? colors.DODGER_BLUE
                            : colors.LIGHT_GRAY
                }
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                underlineColorAndroid={
                    error
                        ? colors.TORCH_RED
                        : isFocused
                            ? colors.DODGER_BLUE
                            : colors.LIGHT_GRAY
                }

                //Funktion
                placeholder="E-mail"
                onChangeText={onChangeText}
                value={value}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                v
            />
        </View>
    )
}

const InputPassword = ({ onChangeText, value, error, placeholder }) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <View style={styles.container}>
            <TextInput
                //Style
                style={styles.textInput}
                selectionColor={
                    error
                        ? colors.TORCH_RED
                        : isFocused
                            ? colors.DODGER_BLUE
                            : colors.LIGHT_GRAY
                }
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                underlineColorAndroid={
                    error
                        ? colors.TORCH_RED
                        : isFocused
                            ? colors.DODGER_BLUE
                            : colors.LIGHT_GRAY
                }
                //Funktion
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={true}
            />
        </View>
    )
}

export { InputEmail, InputPassword }


const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        paddingBottom: 5
    },
    textInput: {
        height: 60,
    },
});

