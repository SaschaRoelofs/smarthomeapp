import React, { useState, useEffect, Component } from 'react'
import axios from 'axios';
import { Image, StyleSheet, Text, View, Button, FlatList, SafeAreaView, ScrollView } from 'react-native'
import Firebase from '../components/Firebase';
import { TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler';
import DeviceButton from '../components/DeviceButton';
import Sandbox from '../components/Sandbox';


const DashboardScreen = ({ navigation }) => {

    const [items, setItems] = useState([]);

    const auth = Firebase.auth()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                axios.get('http://5.181.50.205:4000/data-handler?users=' + auth.currentUser.email)
                    .then((response) => {
                        setItems(response.data)
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            } else {
                console.log("Fehler Dashboard")
            }
        });

    })

    const onPressHandler = (devicekey, state) => {
        let stateLap = (state) ? 0 : 1
        axios.patch("http://5.181.50.205:4000/data-handler", {
            "devicekey": devicekey,
            "state": stateLap
        })
            .then((response) => {
                console.log(response.data);
            });
    }

    const signOutHandler = () => {
        auth.signOut()
        navigation.navigate('LoginScreen')
    }



    return (
        <View style={styles.MainContainer}>
            {/* <Button title="Ausloggen" onPress={() => signOutHandler()} /> */}
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <TouchableNativeFeedback  onPress={() => onPressHandler(item.devicekey, item.state)}>
                            <DeviceButton state={item.state} devicename={item.devicename} />
                        </TouchableNativeFeedback>
                    </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={item => item.devicekey}
            />
        </View>
    );
}

export default DashboardScreen

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        flexDirection: "column"
    },
    row: {
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "space-evenly", 
        alignItems: "center" 
    }

});
