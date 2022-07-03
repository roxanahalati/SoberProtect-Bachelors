import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import { createFormBody } from '../../utils/utils';
import styles from '../../utils/styles';

const Assign = ({route, navigation}) => {
    const clientID = route.params.clientID;
    const [homework, setHomework] = React.useState('');


    const createHomework = () => {
        let newHomeworkID = 0;
        let dataToSend = {title: homework, assignedTo: clientID};
        let formBody = createFormBody(dataToSend);
       
        fetch('http://10.0.2.2:5000/api/homework/createHomework', {
        method: 'POST',
        body: formBody,
        headers: {
            //Header Defination
            'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            newHomeworkID = responseJson._id;
            assignHomeworkInDB(newHomeworkID);

        })

        navigation.goBack(); 
    }

    const assignHomeworkInDB = (newHomeworkID) => {
        let dataToSend = {homeworkID: newHomeworkID, assignedTo: clientID};
        let formBody = createFormBody(dataToSend);
        fetch('http://10.0.2.2:5000/api/users/assignHomework', {
        method: 'POST',
        body: formBody,
        headers: {
            //Header Defination
            'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
        },
        })

    }

    return (
        <View>
            <Text style={styles.importantTitle}>Assign New Homework</Text>

                <TextInput
                style={styles.bodyInput}  
                onChangeText = {newText => setHomework(newText)}
                multiline={true}          
                /> 

                <TouchableOpacity style={styles.sendButton} onPress={createHomework}>
                    <Image
                    style={{alignSelf:'center'}}
                    source={require('../../assets/send.png')}
                    />
                </TouchableOpacity>
        </View>
    )
}

export default Assign;