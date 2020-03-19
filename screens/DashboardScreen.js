import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, Button, FlatList, Picker, Alert } from 'react-native'
import axios from 'axios';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { Notifications } from 'react-native-notifications';

import DeviceButton from '../components/DeviceButton';

const DashboardScreen = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [picker, setPicker] = useState(0)
    const [firstTime, setFirstTime] = useState(true)
    const [once, setOnce] = useState(true)

    useEffect(() => {
        const intervalId = setInterval(() => {
            const isFocused = navigation.isFocused();
            auth().onIdTokenChanged((user) => {
                //console.log(isFocused)
                if (user && isFocused) {
                    axios.get('http://5.181.50.205:4000/data-handler?users=' + auth().currentUser.email)
                        .then((response) => {
                            setItems(response.data)
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                }
            });
        }, 200)
        return () => clearInterval(intervalId);
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

    const _handleOnSelect = (value) => {
        if (value == 0) {
            navigation.navigate("SetupScreen1")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.title}>Deine Geräte</Text>
                <Picker
                    style={{ height: 50, width: 50 }}
                    selectedValue={picker}
                    onValueChange={(itemValue) => {
                        setPicker(itemValue)
                        _handleOnSelect(itemValue)
                    }}>
                    <Picker.Item label="Device" value="0" />
                    <Picker.Item label="Routine" value="1" />
                </Picker>

            </View>
            <Button title="Logout" onPress={() => auth().signOut()} />
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <TouchableNativeFeedback onPress={() => onPressHandler(item.devicekey, item.state)}>
                            <DeviceButton state={item.state} devicename={item.devicename} />
                        </TouchableNativeFeedback>
                    </View>
                )}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.devicekey}
            />
        </View>
    );
}

export default DashboardScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    title: {
        fontSize: 24,
        paddingHorizontal: 16,
        paddingTop: 12
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,


    },
    addButton: {
        width: 50,
        height: 50,
        padding: 18,
        backgroundColor: '#fab'
    },

});

