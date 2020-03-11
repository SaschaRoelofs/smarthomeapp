import React, { useState } from 'react'
import WifiManager from "react-native-wifi-reborn";
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

const SetupScreen1 = () => {

    const [SSID, setSSID] = useState('')
    const [PW, setPW] = useState('')

    const onSubmitHandler = () => {
        console.log("onSubmitHandler")
        WifiManager.connectToProtectedSSID("SMHome", "12345678", false)
            .then(
                () => {
                    console.log("Connected successfully!");
                },
                () => {
                    console.log("Connection failed!");
                    getDevicekey()
                }
            );
    }

    const getDevicekey = () => {
        axios.post('http://192.168.1.1/body', {
            "SSID": "Penis",
            "PW": "Hallo"
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <View>
            <Text>SSID und Password</Text>
            <TextInput
                placeholder="SSID"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setSSID(text)}
                value={SSID}
            />
            <TextInput
                placeholder="Password"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setPW(text)}
                value={PW}
            />
            <Button title="Submit" onPress={() => onSubmitHandler()} />
            <Text></Text>
        </View>
    )
}

export default SetupScreen1

const styles = StyleSheet.create({})
