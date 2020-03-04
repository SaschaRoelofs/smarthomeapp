import React, { useState } from 'react'
import axios from 'axios';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, ScrollView } from 'react-native'
import Firebase from '../components/Firebase';

const DashboardScreen = ({ navigation }) => {


    const [items, setItems] = useState([]);

    function Item({ title }) {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    }

    handleAction = () => {
        //const currentUser = Firebase.auth().currentUser
        //console.log(currentUser.email);
        axios.get('http://5.181.50.205:4000/data-handler?users=sascha@web.de') //+ currentUser.email)
            .then((response) => {
                setItems([
                    ...items,
                    {
                        id: response.data.devicekey,
                        value: response.data.state
                    }
                ]);

            })
            .catch((error) => {
                console.error(error);
            })
    }


    return (
        <View>
            <Button title="Garagentor" onPress={() => handleAction()} />
            <ScrollView>
                {items.map(item => (
                    <View key={item.id}>
                        <Text style={styles.item}>{item.value}</Text>
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
