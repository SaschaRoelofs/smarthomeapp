import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, Button, FlatList, Picker, Alert, TouchableHighlight, DeviceEventEmitter } from 'react-native'
import axios from 'axios';
import { TouchableNativeFeedback, TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import Modal, { ModalContent } from 'react-native-modals';
import PushNotification from "react-native-push-notification"

import DeviceButton from '../components/DeviceButton';

const DashboardScreen = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [picker, setPicker] = useState(0)
    const [visible, setVisible] = useState(false)
    const [shareUser, setShareUser] = useState('')
    const [devicekey, setDevicekey] = useState('')
    const [askFor, setAskFor] = useState('')
    const [entry, setEntry] = useState('no')

    // Send local Push Notification
    const localPushNotification = (title, message) => {
        PushNotification.localNotification({

            title: title,
            message: message,
            actions: '["Akzeptieren", "Ablehnen"]'

        });
        setAskFor(null)
        console.log("AskFor empty!" + askFor)
    }
    // Share a device
    const shareDevice = (visible, devicekey) => {
        setVisible(visible);
        setDevicekey(devicekey)
    }

    const onShareDevice = () => {
        // console.log("onShareDevice")
        // console.log(entry)
        // console.log(devicekey)
        // console.log(shareUser)

        axios.post('http://5.181.50.205:4000/share-device', {
            "entry": entry,
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
                            //console.log(askFor)
                            response.data.pop()
                            setItems(response.data)
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                }
            });

            if (askFor == "newDevice") {
                console.log("Ask Fro otification")
                axios.get('http://5.181.50.205:4000/notification?user=' + auth().currentUser.email)
                    .then((response) => {
                        console.log(response.data)
                        localPushNotification(response.data.title, response.data.message)
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }

            PushNotification.configure({
                onRegister: function (token) {
                    console.log("TOKEN:", token);
                },
                onNotification: function (notification) {
                    console.log("NOTIFICATION:", notification);
                    if (notification.action == "Akzeptieren") {
                        console.log("accepted")
                        setEntry('yes')
                        console.log(entry)
                        onShareDevice()
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

            // console.log("entry " + entry)
            // console.log("devicekey " + devicekey)
            // console.log("shareUser " + shareUser)

        }, 1000)

        return () => clearInterval(intervalId);
    })

    return (
        <View style={styles.container}>

            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onTouchOutside={() => {
                    setVisible(false)
                }}>
                <ModalContent>
                    <View style={{ width: 260 }}>

                        <Text style={{ paddingHorizontal: 8, fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Gerät teilen</Text>
                        <TextInput
                            placeholder="E-mailadresse"
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => setShareUser(text)}
                            value={shareUser}
                        />

                        <TouchableHighlight
                            style={{
                                marginTop: 12,
                                paddingVertical: 5,
                                alignItems: 'center',
                                backgroundColor: '#F6820D',
                                borderColor: '#F6820D',
                                borderWidth: 1,
                                borderRadius: 5,
                                width: '100%'
                            }}
                            onPress={() => {
                                onShareDevice();
                            }}>
                            <Text>Gerät teilen</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={{
                                marginTop: 12,
                                paddingVertical: 5,
                                alignItems: 'center',
                                backgroundColor: '#F6820D',
                                borderColor: '#F6820D',
                                borderWidth: 1,
                                borderRadius: 5,
                                width: '100%'
                            }}
                            onPress={() => {
                                setVisible(false);
                            }}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>

                    </View>
                </ModalContent>
            </Modal>

            <View style={styles.topBar}>
                <Text style={styles.title}>{auth().currentUser.email}</Text>
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
                        <TouchableNativeFeedback onPress={() => onPressHandler(item.devicekey, item.state)} onLongPress={() => { shareDevice(true, item.devicekey) }}>
                            <DeviceButton state={item.state} devicename={item.devicename} />
                        </TouchableNativeFeedback>
                    </View>
                )}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.devicekey}
            />
            <Button title="Test" onPress={() => localPushNotification("title", "message")} />
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

