import React, { useState, useEffect } from 'react'
import { StatusBar, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, DeviceEventEmitter, Dimensions } from 'react-native'
import axios from 'axios';
import auth from '@react-native-firebase/auth';
//import Modal, { ModalContent } from 'react-native-modals';
import PushNotification from "react-native-push-notification"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-shadow-cards';

import { Button, DeviceButton } from '../components/Button';
import { colors, fonts } from '../config/theme'
import garageOffen from '../assets/images/garageOffen.png'


const DashboardScreen = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [picker, setPicker] = useState(0)
    const [visible, setVisible] = useState(false)
    const [shareUser, setShareUser] = useState()
    const [devicekey, setDevicekey] = useState()
    const [askFor, setAskFor] = useState('')
    const [nickname, setNickname] = useState('')

    // Send local Push Notification
    const localPushNotification = (title, message) => {
        PushNotification.localNotification({
            id: '1',
            title: title,
            message: message,
            actions: '["Akzeptieren", "Ablehnen"]',
            autoCancel: true,

        });
        setAskFor(null)
        console.log("AskFor empty!" + askFor)
    }

    // Share a device
    const shareDevice = (visible, devicekey) => {
        setVisible(visible);
        setDevicekey(devicekey)
        console.log("shareDevice -> Devicekey: " + devicekey)

    }

    const onShareDevice = () => {
        axios.post('http://5.181.50.205:4000/share-device-sending', {
            "devicekey": devicekey,
            "shareUser": shareUser,
            "askFor": "newDevice"
        }).then((success) => {
            //console.log(success)
            setVisible(false)
        })
            .catch((error) => {
                console.log(error)
            });
    }

    // Buttpn handlers
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

    // State request from Server //NormalGET
    useEffect(() => {
        const intervalId = setInterval(() => {
            const isFocused = navigation.isFocused();
            auth().onIdTokenChanged((user) => {
                //console.log(isFocused)
                if (user && isFocused) {

                    axios.get('http://5.181.50.205:4000/data-handler?users=' + auth().currentUser.email)
                        .then((response) => {
                            const res = response.data[response.data.length - 1]
                            setAskFor(res['askFor'])
                            response.data.pop()
                            setNickname(res['nickname'])
                            //console.log(askFor)
                            response.data.pop()
                            setItems(response.data)
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                }
            });
        }, 100)

        return () => clearInterval(intervalId);
    })

    useEffect(() => {
        if (askFor == "newDevice") {
            console.log("Ask Fro otification")
            axios.get('http://5.181.50.205:4000/notification?user=' + auth().currentUser.email)
                .then((response) => {
                    //console.log(response.data)
                    localPushNotification(response.data.title, response.data.message)
                })
                .catch((error) => {
                    console.error(error);
                })
            setAskFor()
        }

        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
                //console.log("NOTIFICATION:", notification);
                if (notification.action == "Akzeptieren") {
                    console.log("accepted")
                    axios.get('http://5.181.50.205:4000/share-device-recieving')
                    PushNotification.cancelLocalNotifications({ id: '1' });
                } else if (notification.action == 'Ablehnen') {
                    console.log("rejected")
                }
                //notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            senderID: "YOUR GCM (OR FCM) SENDER ID",
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true,
            requestPermissions: true
        });

        PushNotification.registerNotificationActions(['Akzeptieren', 'Ablehnen']);
        DeviceEventEmitter.addListener('notificationActionReceived', function (action) {

        });
    })

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#FFFFFF"
                barStyle="dark-content"
            />
            <View>
                <Button
                    title="Logout"
                    onPress={() => auth().signOut()}

                />
                <View style={styles.topBar}>
                    <Text style={fonts.hello}>Wilkommen</Text>
                    <Text >{nickname}</Text>
                </View>
                <View style={styles.mainDevice}>
                    <View style={styles.column}>
                        {/* <Text>{items[0].devicename}</Text> */}
                        {/* <Image source={garageOffen} style={{ width: 150, height: 150 }} /> */}
                    </View>
                    <View style={styles.mainDeviceData}>
                        {/* <Text>Status: {items[0].state ? "offen" : "geschlossen"}</Text> */}
                        <Text>Letzte Aktivität: </Text>
                        <Text>Benutzer: </Text>
                        {/* <Icon name="garage" size={50} color={colors.LIGHT_GRAY} /> */}
                    </View>
                </View>
            </View>
            <View style={styles.flatlist}>
                <FlatList
                    data={items}
                    columnWrapperStyle
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => onPressHandler(item.devicekey, item.state)} onLongPress={() => { shareDevice(true, item.devicekey) }}>
                                <DeviceButton state={item.state} devicename={item.devicename} />
                            </TouchableOpacity>
                        </View>
                    )}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.devicekey}
                />
            </View>
        </View>
    );
}

export default DashboardScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.WHITE,
    },
    row: {
        flex: 1,
        alignContent: "center",
        paddingBottom: 15,
        paddingHorizontal: 15,
    },
    column: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    title: {
        fontSize: 24,
        paddingHorizontal: 16,
        paddingTop: 12
    },
    topBarCard: {
        height: Dimensions.get('window').height / 3,
        width: "90%",
        alignSelf: "center",
        padding: 12
    },
    topBar: {
        flexDirection: "column",
    },
    mainDevice: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    flatlist: {
        width: "90%",
        justifyContent: "space-between"
    }

});

