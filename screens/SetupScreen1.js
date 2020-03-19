import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View, TextInput, Button,  } from 'react-native'
import WifiManager from "react-native-wifi-reborn";
import axios from 'axios';

import SplashScreen from '../screens/SplashScreen'

const SetupScreen1 = ({ navigation }) => {
  const [SSID, setSSID] = useState('')
  const [PW, setPW] = useState('')
  const [devicekey, setDevicekey] = useState()
  const [isLoading, setIsLoading] = useState()
  const [key, setKey] = useState(-1)
  const trys = 0  

  const otherFunction = () => {
    try {
      WifiManager.connectToProtectedSSID(
        "SMHome",
        "12345678",
        false,
      ).then(() => {
        console.log('Connected successfully to SMHome!')
        setKey(1)
        WifiManager.forceWifiUsage(true)
      })
    } catch (error) {
      if (trys < 10) {
        console.log('Connection failed!');
        //otherFunction()
        trys++
      } else {
        console.log("Connection failed timeout")
        Alert.alert("No connection to Device")
      }
    }
  }

  switch (key) {
    case 0:
      console.log("Case 0")
      //setIsLoading(true)
      otherFunction()
      break;

    case 1:
      console.log("Case 1")
      WifiManager.isEnabled(isEnabled => {
        console.log("Wifi connetction: " + isEnabled)
        WifiManager.forceWifiUsage(true)
        setTimeout(() => {
          setKey(2)
        }, 2000);
      });
      break;

    case 2:
      console.log("Case 2")
      axios.post('http://192.168.1.1:80/body', {
        "SSID": SSID,
        "PW": PW
      }).then(() => {
        WifiManager.getBSSID((call) => {
          console.log("Screen1 Devicekey: " + call)
          navigation.navigate("SetupScreen_2", { devkey: call })
        })
        WifiManager.forceWifiUsage(false);
        WifiManager.disconnect()
      })
        .catch((error) => {
          if (error == 'Error: Network error') {
            Alert.alert('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');
          }
          WifiManager.forceWifiUsage(false);

        });
      break;
    default:
      break;
  }

  if (isLoading) {
    return <SplashScreen />;
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
      <Button title="Submit" onPress={() => setKey(0)} />
      <Text>{devicekey}</Text>
    </View>
  )
}

export default SetupScreen1

const styles = StyleSheet.create({})

