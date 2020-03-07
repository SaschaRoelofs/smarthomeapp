import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Card } from 'react-native-shadow-cards';

function DeviceButton({ state, devicename }) {
    return (
        <Card elevation={8} cornerRadius={10} style={styles.card}>
            <Text>{devicename}</Text>
            <Text>{state}</Text>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        justifyContent: "center",
        alignContent: "center",
        marginHorizontal:16,
        marginVertical: 16,
        padding: 8,
        width: 140,
        height: 180
    }
})
export default DeviceButton
