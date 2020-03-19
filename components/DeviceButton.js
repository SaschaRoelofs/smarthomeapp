import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Card } from 'react-native-shadow-cards';

function DeviceButton({ state, devicename }) {
    return (
        <Card elevation={8} cornerRadius={10} style={styles.card}>
            <Text style={styles.title}>{devicename}</Text>
            <Text>{state}</Text>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        justifyContent: "flex-start",
        alignContent: "flex-start",
        marginHorizontal:16,
        marginVertical: 16,
        padding: 16,
        width: 140,
        height: 180,
        backgroundColor: "#fab"
    },
    title: {
        fontSize: 20,
    }
})
export default DeviceButton
