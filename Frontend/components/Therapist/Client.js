import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { createNextSession } from '../../utils/Requests';
import styles from '../../utils/styles';
import { getActionFromState } from '@react-navigation/native';

const ClientModal = ({route, navigation}) => {

    const therapistID = route.params.therapistID;
    const therapistName = route.params.therapistName;
    const name = route.params.item.name;
    const clientID = route.params.item._id;
    const addiction = route.params.item.addiction;
    const homework = route.params.item.homework;
    const [nextSession, setNextSession] = React.useState(route.params.item.nextTherapySession);
    const [assignment, setAssignment] = React.useState(route.params.item.assignment);
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        hideDatePicker();
        var data = new Date(date).toLocaleString();
        setNextSession(data);
        createNextSession(date, clientID);
      };

      const turnDateToReadable = () => {
        var t = moment.utc(nextSession).format("DD MMM HH:mm")
        return t;
    }

    const getInfo = () => {

    }
    
    React.useEffect(() => {
        getInfo();

      },[]);

    return (
        <View style={{flex:1}}>
            <Text style={[styles.importantTitle]}>{name}</Text>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.generalTextBiggerColored}>Client is recovering from:</Text> 
                <Text style={[styles.generalTextBigger, {marginLeft:0, paddingLeft:0}]}>{addiction}</Text>
            </View>
            {
                    nextSession != "1970-01-01T00:00:00.000Z" && nextSession != undefined
                    ? <View style={{flexDirection:'row'}}> 
                        <Text style={styles.generalTextBiggerColored}>Next Session is:</Text> 
                        <Text style={[styles.generalTextBigger, {marginLeft:0, paddingLeft:0}]}>{turnDateToReadable()}</Text> 
                    </View>
                    : <Text style={styles.generalTextBigger}>No session scheduled </Text>
            }
            {/* {
                    assignment
                    ? <View style={{flexDirection:'row'}}>
                        <Text style={styles.generalTextBiggerColored}>Assigned Homework:</Text>
                        <Text style={[styles.generalTextBigger, {marginLeft:0, paddingLeft:0}]}> {assignment} </Text> 
                      </View>
                    : <Text style={styles.generalTextBiggerColored}>No homework assigned</Text>
             } */}
               

            <Image
                    style={{alignSelf: 'center', width: 300, height: 220, marginTop:20}}
                    source={require('../../assets/therapy.png')}
                    />
            <View style={{flex:1,justifyContent:'flex-end'}}>
                <TouchableOpacity onPress={showDatePicker}>
                {
                    nextSession != "1970-01-01T00:00:00.000Z" && nextSession != "undefined"
                    ?  <View style={styles.button}><Text style={styles.buttonText}> Reschedule Next Session </Text></View>
                    : <View style={styles.button}><Text style={styles.buttonText}> Schedule Session </Text> </View>
                }
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeworkMainPage', {isUser: false, userID: clientID, assignedHomework: homework, senderName: therapistName })}>
                    <Text style={styles.buttonText}> Assign Homework </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Chat', {senderID: therapistID, senderName: therapistName, receiverID: clientID, receiverName: name})}}>
                    <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
            
            </View>

           
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
         
            />
        </View>
    )
}

export default ClientModal;