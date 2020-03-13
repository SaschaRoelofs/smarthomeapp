import React, { useState, useEffect } from 'react'
import WifiManager from "react-native-wifi-reborn";
import axios from 'axios';
import { Alert, Modal, StyleSheet, Text, View, TextInput, Button } from 'react-native'


const SetupScreen1 = () => {

  const [SSID, setSSID] = useState('')
  const [PW, setPW] = useState('')
  const [devicekey, setDevicekey] = useState('')
  const [visibility, setVisibility] = useState(false)


  useEffect(() => {

    WifiManager.getCurrentWifiSSID()
      .then(ssid => {
        console.log("SSID: ", ssid)
        if (ssid == 'SMHome') {
          setVisibility(false)
        }
      });



  })

  const getDevicekey = () => {
    WifiManager.connectToProtectedSSID("SMHome", "12345678", false)
      .then(
        () => {
          console.log("Connected successfully!");
          WifiManager.forceWifiUsage(true)
        },
        () => {
          console.log("Connection failed!");
          getDevicekey()
        }
      );
  }

  const getDevicekey1 = () => {
    axios.post('http://192.168.1.1:80/body', {
      "SSID": SSID,
      "PW": PW
    }).then(function (response) {
      console.log("Devicekey:", response.data["devicekey"]);
      setDevicekey(response.data["deviceskey"])
      WifiManager.forceWifiUsage(false);
    })
      .catch((error) => {
        if (error == 'Error: Network error') {
          Alert.alert('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');
        }
      });
  }

  return (

    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visibility}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <Text>Bitte verbinde dich mit dem WLAN "SMHome"</Text>
      </Modal>
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
      <Button title="Submit" onPress={() => getDevicekey()} />
      <Button title="Submit" onPress={() => getDevicekey1()} />
    </View>

  )
}

export default SetupScreen1

const styles = StyleSheet.create({})
