import React, { useState, useEffect } from 'react'
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import { useNetInfo } from "@react-native-community/netinfo";
import ModalDropdown from 'react-native-modal-dropdown';
import { Image, StyleSheet, Text, View, Button, FlatList } from 'react-native'
import Firebase from '../components/Firebase';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import DeviceButton from '../components/DeviceButton';

//const wifiPassword = require('wifi-password');

const DashboardScreen = ({ navigation }) => {

    const [items, setItems] = useState([]);
    const [picker, setPicker] = useState()


    const auth = Firebase.auth()
    const netInfo = useNetInfo();


    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         //console.log(netInfo.isConnected)
    //         auth.onAuthStateChanged((user) => {
    //             if (user) {
    //                 axios.get('http://5.181.50.205:4000/data-handler?users=' + auth.currentUser.email)
    //                     .then((response) => {
    //                         setItems(response.data)
    //                     })
    //                     .catch((error) => {
    //                         console.error(error);
    //                     })
    //             } else {
    //                 console.log("Fehler Dashboard")
    //             }
    //         });

    //     }, 1000)

    //     return () => clearInterval(intervalId);

    // }, [])

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
                <ModalDropdown
                    options={['Device', 'Routine']}
                    onSelect={(value) => _handleOnSelect(value)}
                >
                    <View style={styles.addButton}>
                        <Text>+</Text>
                    </View>
                </ModalDropdown>
            </View>



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

