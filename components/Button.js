import React, { Children } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { Card } from 'react-native-shadow-cards';

import colors from '../config/colors'

const Button = ({ title, onPress, disabled }) => {

    return (
        <TouchableHighlight
            style={disabled ? [styles.container, { opacity: 0.3 }] : [styles.container, { opacity: 1 }]}
            onPress={onPress}
            disabled={disabled} >
            <Text>{title}</Text>
        </TouchableHighlight >
    )
}
const TextButton = ({ title, onPress }) => {

    return (
        <TouchableHighlight onPress={onPress}>
            <Text style={styles.textbutton} >{title}</Text>
        </TouchableHighlight >
    )
}

const DeviceButton = ({ state, devicename }) => {
    return (
        <Card elevation={8} cornerRadius={10} style={styles.card}>
            <Text style={styles.title}>{devicename}</Text>
            <Text>{state}</Text>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.DODGER_BLUE,
        marginBottom: 20,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.DODGER_BLUE
    },
    card: {
        justifyContent: "flex-start",
        alignContent: "flex-start",
        marginHorizontal: 16,
        marginVertical: 16,
        padding: 16,
        width: 140,
        height: 180,
        backgroundColor: "#fab"
    },
    title: {
        fontSize: 20,
    },
    textbutton: {
        textAlign: 'center',
        marginBottom: 12,
        color: colors.DODGER_BLUE
    }
})
export { DeviceButton, Button, TextButton }


