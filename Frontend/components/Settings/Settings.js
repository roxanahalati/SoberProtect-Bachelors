import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {View, Text, TouchableOpacity} from 'react-native';
import { resetTimeInDB } from "../../utils/Requests";
import styles from "../../utils/styles";
const Settings = ({route, navigation}) => {
    const email = route.params.email;
    
    const resetTimer = async () => {
        resetTimeInDB(email);
    }

    return (
        <View style={styles.content}>
            <TouchableOpacity style={styles.button} onPress={() =>{AsyncStorage.clear(); navigation.navigate('Login')}}>
                 <Text style={styles.buttonText}> LOGOUT</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => {resetTimer(); navigation.goBack()}}>
                <Text style={styles.buttonText}> RESET TIME</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Settings