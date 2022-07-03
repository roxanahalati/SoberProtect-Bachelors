import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, FlatList} from 'react-native';
import {createFormBody} from '../../utils/utils';
import { saveHomeworkHomework, saveHomeworkUser } from '../../utils/Requests';
import styles from '../../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeworkMainPage = ({route, navigation}) => {
    const isUser = route.params.isUser;
    const userID = route.params.userID;
    const [assignedHomeworkID, setAssignedHomeworkID] = React.useState(route.params.assignedHomework);
    const [oldHomework, setOldHomework] = React.useState();
    const [assignedHomework, setAssignedHomework] = React.useState('');
    const senderName = route.params.senderName;
    const [solved, setSolved] = React.useState('');

    const getOldHomework = () => {
        var oldHomework = [];
        let dataToSend = {assignedTo: userID}
        let formBody = createFormBody(dataToSend);
        fetch('http://10.0.2.2:5000/api/homework/findAll', {
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
            responseJson.map(item => {oldHomework.push(item)})
            setOldHomework(oldHomework);
            })
        console.log(oldHomework);
    }

    const getCurrentHomework = () => {
        if(assignedHomeworkID != undefined && assignedHomeworkID !="N/A")
            {
            let dataToSend = {homeworkID: assignedHomeworkID}
            let formBody = createFormBody(dataToSend);
            fetch('http://10.0.2.2:5000/api/homework/findOne', {
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
                    responseJson.map(homework=> {setAssignedHomework(homework.title)})
                })
            }
    }

    const solveHomework = () => {
        saveHomeworkUser(assignedHomeworkID,solved);
        saveHomeworkHomework(userID); 
        setAssignedHomeworkID("N/A");
        AsyncStorage.setItem("homework", "N/A");
        getOldHomework();
    }

    const renderHomework = (item) => {
        return(
        <View>
            <TouchableOpacity style={styles.homeworkContainer} onPress={() => {navigation.navigate('HomeworkItem', {title: item.title, homeworkBody: item.homeworkBody, homeworkID: item._id, senderName: senderName})}}>
                <Text style={styles.titleStyleSmall}>{item.title}</Text>
            </TouchableOpacity>
        </View> 
        );
    }

    React.useEffect(() => {
        getOldHomework();
        getCurrentHomework();

      },[]);

    return (
        <View>
             {
                isUser
                ? null
                : <TouchableOpacity style={[styles.blankButtonWithIcon, {backgroundColor: "#ffffff"}]} onPress={() => {navigation.navigate('Assign', {clientID: userID})}}>
                    <Image
                    source={require('../../assets/create.png')}
                    />
                    <Text style={styles.blankButtonText}>Assign New Homework</Text>
                </TouchableOpacity>

            }
            {
                isUser

                ?  assignedHomeworkID !="N/A" 
                    ?  <View>
                            <Text style={[styles.generalTextBiggerColored, {marginTop:12}]}>{assignedHomework}</Text>
                            <TextInput
                            style={[styles.longTextInput, {backgroundColor: "#ffffff"}]}
                            onChangeText={newText => setSolved(newText)}
                            multiline={true}
                            />
                            <TouchableOpacity style={styles.sendButton} onPress={solveHomework}>
                            <Image
                            style={{alignSelf:'center'}}
                            source={require('../../assets/send_white.png')}
                            />
                            </TouchableOpacity>
                        </View>
                    : null

                :  assignedHomework
                ? <View>
                    <Text style={styles.importantTitleSmall}>The Assigned Homework:</Text>
                    <Text style={styles.generalTextBigger}>{assignedHomework}</Text>
                    </View>
                : null
            }
           
            <Text style={styles.importantTitleSmall}>Past Homework</Text>
            <FlatList
            data = {oldHomework}
            renderItem={({ item }) => renderHomework(item)}
            keyExtractor={item => item._id}
            />
    
        </View>
    )
}

export default HomeworkMainPage;