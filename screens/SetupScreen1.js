import React, { useState, useEffect, useContext } from 'react'
import WifiManager from "react-native-wifi-reborn";
import axios from 'axios';
import { Alert, StyleSheet, Text, View, TextInput, Button, PermissionsAndroid } from 'react-native'

import SplashScreen from '../screens/SplashScreen'

const SetupScreen1 = ({ navigation }) => {

  const [SSID, setSSID] = useState('')
  const [PW, setPW] = useState('')
  const [devicekey, setDevicekey] = useState()
  const [isLoading, setIsLoading] = useState()
const trys = 0
  const [key, setKey] = useState()

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission is required for scanning wifi networks',
          message:
            'This app needs location permission as this is required  ' +
            'to scan for wifi networks.',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  async function requestSettingsPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Settings permission is required for scanning wifi networks',
          message:
            'This app needs settingd permission as this is required  ' +
            'to scan for wifi networks.',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use Settings');
      } else {
        console.log('Settings permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

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
        otherFunction()
        trys++
      } else {
        console.log("Connection failed timeout")
        Alert.alert("No connection to Device")
      }
    }
  }

  switch (key) {
    case 0:
      otherFunction()
      break;

    case 1:
      WifiManager.isEnabled(isEnabled => {
        console.log("Wifi connetction: " + isEnabled)
        WifiManager.forceWifiUsage(true)
        setTimeout(() => {
          setKey(2)
        }, 2000);
      });
      break;

    case 2:
      axios.post('http://192.168.1.1:80/body', {
        "SSID": SSID,
        "PW": PW
      }).then(() => {
        WifiManager.getBSSID((call) => {
          console.log("Screen1 Devicekey: " + call)
          navigation.navigate("SetupScreen_2", {devkey: call})
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

  

  useEffect(() => {
    requestLocationPermission();
    requestSettingsPermission();
  }, [])

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

