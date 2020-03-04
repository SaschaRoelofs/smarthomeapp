import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, ScrollView } from 'react-native'
import Firebase from '../components/Firebase';
import { TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler';

const DashboardScreen = ({ navigation }) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        // const currentUser = Firebase.auth().currentUser
        // console.log(currentUser.email);
        axios.get('http://5.181.50.205:4000/data-handler?users=sascha@web.de') //+ currentUser.email)
            .then((response) => {
                setItems(response.data)
            })
            .catch((error) => {
                console.error(error);
            })
        
        console.log(items)
    } )

     const onPressHandler = (devicekey, state) =>  {
        axios.patch("http://5.181.50.205:4000/data-handler", {
            "devicekey": devicekey,
            "state": (state == 0) ? 1 : 0
        })
        .then((response) => {
               console.log(response.data);
        });
     }

    return (
        <View>
            <ScrollView>
                {items.map(item => (
                    <View key={item.devicekey}>
                        <TouchableNativeFeedback onPress={() => onPressHandler(item.devicekey, item.state)}>
                        <Text style={styles.item}>{item.state}</Text>
                        </TouchableNativeFeedback>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default DashboardScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: 10,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
