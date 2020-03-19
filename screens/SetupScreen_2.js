import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Picker, TouchableOpacity, } from 'react-native'
import auth from '@react-native-firebase/auth';
import axios from 'axios'

const SetupScreen_2 = ({ navigation, route }) => {
    const [users, setUsers] = useState([])
    const [devicename, setDevicename] = useState('')
    const [deviceFunction, setDeviceFunction] = useState('garage')
    const [devicekey, setDevicekey] = useState(navigation)
    const username = auth().currentUser.email
    const {devkey} = route.params

    const handleNext = () => {
        console.log("Devicekey: " + JSON.stringify(devkey))
        console.log("Devicename: " + devicename)
        console.log("Function: " + deviceFunction)

        axios.post('http://5.181.50.205:4000/insert-device', {
            "devicekey": JSON.stringify(devkey),
            "devicename": devicename,
            "function": deviceFunction,
            "users": [username],

        }).then((res) => {
            //console.log(res)
        }).catch((error) => {
            if (error == 'Error: Network error') {
                Alert.alert('Something went wrong', 'Kindly check if the device is connected to stable cellular data plan or WiFi.');
            }
        });
        navigation.reset({
            index: 0,
            routes: [{ name: 'DashboardScreen' }],
        });
    }

    return (
        <View style={styles.container}>
            <Text>Devicename</Text>
            <TextInput
                style={styles.inputBox}
                value={devicename}
                onChangeText={(name) => setDevicename(name)}
                placeholder='Garage...'

            />
            <Text> Choose a Function</Text>
            <Picker
                style={{ height: 50, width: 300 }}
                selectedValue={deviceFunction}
                onValueChange={(itemValue, itemIndex) =>
                    setDeviceFunction(itemValue)
                }>
                <Picker.Item label="Garage" value="garage" />
                <Picker.Item label="Licht" value="light" />
            </Picker>
            <TouchableOpacity style={styles.button} onPress={() => handleNext()}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },

    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },

})

export default SetupScreen_2