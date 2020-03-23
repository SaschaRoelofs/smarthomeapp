import React, { Children } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { Card } from 'react-native-shadow-cards';

import {colors} from '../config/theme'

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
        <Card elevation={3} cornerRadius={10} style={styles.card}>
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
        backgroundColor: colors.BLUE,
        marginBottom: 20,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.BLUE
    },
    card: {
        justifyContent: "flex-start",
        alignContent: "flex-start",
        width: 140,
        height: 180,
        backgroundColor: colors.MISCHKA
    },
    title: {
        fontSize: 20,
    },
    textbutton: {
        textAlign: 'center',
        marginBottom: 12,
        color: colors.BLUE
    }
})
export { DeviceButton, Button, TextButton }


