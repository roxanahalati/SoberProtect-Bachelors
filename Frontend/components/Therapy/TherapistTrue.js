import React from "react";
import {View, Text, TouchableOpacity, Image} from 'react-native';
import moment from "moment";
import styles from "../../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TherapistTrue = ({navigation, therapistID, therapistName}) => {

    const [username, setUsername] = React.useState();
    const [userID, setUserID] = React.useState();
    const [assignedHomework, setAssignedHomework] = React.useState();
    const tID = therapistID;
    const tName= therapistName; 
    const [assignedSession, setAssignedSession] = React.useState();

    const getUserInfo = async () => {
        setUsername(await AsyncStorage.getItem("username"));
        setUserID(await AsyncStorage.getItem("userID"));
        setAssignedHomework(await AsyncStorage.getItem("homework"));
        setAssignedSession(await AsyncStorage.getItem("session"));
    }
    
    getUserInfo();


        
    const turnDateToReadable = () => {
        var t = moment.utc(assignedSession).format("DD MMM HH:mm")
        return t;
    }
    return(
        <View style={styles.topicContainer}>
            <View>
                <Text style={styles.importantTitle}>{tName} </Text>
            </View>

            <View style={{flexDirection:'row'}}>
            <Text style={styles.generalTextColored}>Date of next session:</Text>
            {
              assignedSession == "1970-01-01T00:00:00.000Z"
              ? <Text style={[styles.generalText, {marginLeft:0}]}>None scheduled </Text>
              : <Text style={[styles.generalText, {marginLeft:0}]}>{turnDateToReadable()} </Text>
            }
            </View>

            <View style={{height:'76%',justifyContent:'flex-end'}}>
                <Image
                    style={{alignSelf: 'center', width: 300, height: 220}}
                    source={require('../../assets/therapy.png')}
                    />
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat', {senderID: userID, senderName: username, receiverID: tID, receiverName: tName})}>
                    <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeworkMainPage', {isUser: true, userID: userID, assignedHomework: assignedHomework, senderName: username})}>
                    <Text style={styles.buttonText}>Homework</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TherapistTrue