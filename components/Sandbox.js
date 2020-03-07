import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Sandbox = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.boxOne}>one</Text>
            <Text style={styles.boxTwo}>Tow</Text>
            <Text style={styles.boxThree}>three</Text>
            <Text style={styles.boxFour}>four</Text>
        </View>
    )
}

export default Sandbox

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        paddingTop: 40,
        backgroundColor: '#333'
    },
    boxOne: {
        backgroundColor: 'violet',
        padding: 10
    },
    boxTwo: {
        backgroundColor: 'gold',
        padding: 10
    },
    boxThree: {
        backgroundColor: 'coral',
        padding: 10
    },
    boxFour: {
        backgroundColor: 'skyblue',
        padding: 10
    },
})
