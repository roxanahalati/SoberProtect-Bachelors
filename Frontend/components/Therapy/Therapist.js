import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { requestTherapistInDB } from '../../utils/Requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../utils/styles';

const Therapist = ({route, navigation}) => {

    const therapistName = route.params.item.name;
    const therapistID = route.params.item._id;
    const price = route.params.item.price;
    const description = route.params.item.description;
    const experience = route.params.item.experience;
    const username = route.params.username;

    const requestTherapist = async () => {
        requestTherapistInDB(username, therapistID);
        AsyncStorage.setItem("hasTherapist", therapistID)
        navigation.navigate("Therapy");

    }
    return (
        <View style={{flex:1}}>
            
            <View style={styles.topicContainer}>
            <Text style={styles.importantTitle}>{therapistName} </Text>
            <Text style={styles.generalText2}>Experience: {experience} </Text>
            <Text style={styles.generalText2}>Session Price: {price} lei </Text>
            </View>
            <View style={styles.topicContainer}>
            <Text style={styles.generalText2}>About me: </Text>
            <Text style={styles.generalText}>{description}</Text>
            </View>
            <View style={[styles.topicContainer, {height:'52%'}]}>
            <Image
                style={{alignSelf: 'center', width: 300, height: 220}}
                source={require('../../assets/therapy.png')}
                />
             <View style={{flex:1, justifyContent:'space-around'}}>
            <TouchableOpacity style={styles.button} onPress={requestTherapist}>
                <Text style={styles.buttonText}> Request meeting with therapist </Text>
            </TouchableOpacity>
            </View>
            </View>
            </View>
           
    )
}

export default Therapist;