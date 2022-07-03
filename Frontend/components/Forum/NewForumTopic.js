import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Image, Alert} from 'react-native';
import { createFormBody } from '../../utils/utils';
import styles from '../../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewForumTopic = ({route, navigation}) => {
    const username = route.params.username;
    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');

    const addNewDiscussion = () => {
        if (title == '')
        {   Alert.alert('Whoops', 'Please fill in the title of the post');
            return;
        }
        else {
            updateThreadsInDB(title, body, username);
            getThreadsFromDB();
        }
        navigation.goBack();
    }

    const getThreadsFromDB = async () => {
        var threads = [];
        await AsyncStorage.removeItem("threads");
        fetch('http://10.0.2.2:5000/api/forum/findAll', {
            method: 'GET',
            headers: {
                //Header Defination
                'Content-Type':
                'application/x-www-form-urlencoded;charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.map((item) => {
                    threads.push(item);
                    AsyncStorage.setItem("threads", JSON.stringify(threads));
                })
            })
        console.log(threads);
    }
    
    const updateThreadsInDB = (title, body, username) => { 
        let dataToSend = {title: title, body: body, username: username};
        let formBody = createFormBody(dataToSend);
        fetch('http://10.0.2.2:5000/api/forum/createTopic', {
            method: 'POST',
            body: formBody,
            headers: {
                //Header Defination
                'Content-Type':
                'application/x-www-form-urlencoded;charset=UTF-8',
            },
            })
    }


    return(
        <View>
            <Text style={styles.importantTitle}>Start a new discussion </Text>
            <Text style={styles.highlightedText}>Title </Text>
            <TextInput
                style={styles.titleInput}
                multiline={true}
                onChangeText={newText => setTitle(newText)} 
            />

            <Text style={styles.highlightedText}>Body </Text>
            <TextInput
                style={styles.bodyInput}  
                multiline={true}          
                onChangeText={newText => setBody(newText)} 
            />

            

            <View style={styles.arrange}>
                <TouchableOpacity style={styles.sendButton} onPress={addNewDiscussion}>
                    <Image
                    style={{alignSelf:'center'}}
                    source={require('../../assets/send_white.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.smallAnnouncement}>Please remember to be polite, kind and do not include details that could trigger other users.  </Text>
            </View>
        </View>
    )
}

export default NewForumTopic;