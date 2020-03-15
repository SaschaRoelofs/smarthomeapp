import React, { useState, useEffect } from 'react'
import WifiManager from "react-native-wifi-reborn";
import axios from 'axios';
import { Alert, StyleSheet, Text, View, TextInput, Button } from 'react-native'


const SetupScreen1 = () => {

  const [SSID, setSSID] = useState('')
  const [PW, setPW] = useState('')
  const [devicekey, setDevicekey] = useState()
  const [executed, setExecuted] = useState()

  useEffect(() => {

    WifiManager.getCurrentWifiSSID()
      .then(ssid => {
        console.log("SSID: ", ssid)
      });

  })

    const changeWifi = () => {
      WifiManager.connectToProtectedSSID("SMHome", "12345678", false)
        .then(
          () => {
            console.log("Connected to SMHome successfully!");
            WifiManager.forceWifiUsage(true)
            setTimeout(() => {
              console.log("Wait for one second")
              getDevicekey()
            }, 1000)
          },
          () => {
            console.log("Connection failed!");
            changeWifi()
          }
        );
    }

    const getDevicekey = () => {
      axios.post('http://192.168.1.1:80/body', {
        "SSID": SSID,
        "PW": PW
      }).then(function (response) {
        WifiManager.getBSSID((call) => {
          setDevicekey(call)
        })
        console.log(devicekey)
        WifiManager.forceWifiUsage(false);

      })
        .catch((error) => {
          if (error == 'Error: Network error') {
            Alert.alert('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');
          }
          WifiManager.forceWifiUsage(false);
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
      <Button title="Submit" onPress={() => changeWifi()} />
      <Text>{devicekey}</Text>
    </View>

  )
}

export default SetupScreen1

const styles = StyleSheet.create({})
