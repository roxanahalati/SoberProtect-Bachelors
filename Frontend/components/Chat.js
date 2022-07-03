import React from 'react';
import {View,Text, TouchableOpacity, TextInput, FlatList, Image} from 'react-native';
import { addMessageToDB } from '../utils/Requests';
import {createFormBody} from '../utils/utils';
import styles from '../utils/styles';

const Chat = ({route, navigation}) => {
    const senderName = route.params.senderName;
    const senderID =  route.params.senderID;
    const receiverID =  route.params.receiverID;
    const receiverName = route.params.receiverName;
    const [message, setMessage] = React.useState();
    const [messages, setMessages] = React.useState('');

    const getMessages = () => {
        var currentMessages = [];
        let dataToSend = {sender: senderID, receiver: receiverID};
        let formBody = createFormBody(dataToSend);
        fetch('http://10.0.2.2:5000/api/messages/findAll', {
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
            responseJson.map(item => {currentMessages.push(item)})
            setMessages(currentMessages);
            })
    }

    React.useEffect(() => {
        getMessages();
      },[]);

    const sendMessage = () => {
        addMessageToDB(senderID,receiverID,message);
        setMessage();
        getMessages();
    }

    const renderMessage = (item) => {
        if (item.item.sender != senderID)
        {
            return (
                <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                <View style={styles.myMessage}>
                    <Text style={{color: '#ffffff'}}>{item.item.body}</Text>
                </View>
                </View>
            )
            
        }
        else {
            return (
                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                    <View style={styles.yourMessage}>
                        <Text style={{color: '#ffffff'}}>{item.item.body}</Text>
                    </View>
                </View>
            )
            
        }
    }
    
    return (
        <View style={{flex:1}}>
            <Text style={[styles.importantTitleSmall, {marginBottom: 8}]}>Your private chat with {receiverName} </Text>
       
        <FlatList
            data = {messages}
            renderItem={(item) => renderMessage(item)}  
            keyExtractor={item => item._id}
            />

        <View style={styles.alignBottom}>
                <View style={styles.inputWithIcon}>
                    <TextInput
                        style={{flex: 1}}
                        onChangeText={newText => setMessage(newText)}
                        multiline={true}
                        value={message}
                        placeholer="Type a message..."

                    />

                    {
                        message
                        ?  <TouchableOpacity style={{paddingRight:8}} onPress={sendMessage}>
                                <Image
                                style={{alignSelf:'center'}}
                                source={require('../assets/send.png')}
                                />
                            </TouchableOpacity>
                        :  <TouchableOpacity style={{paddingRight:8}}>
                                <Image
                                style={{alignSelf:'center'}}
                                source={require('../assets/send_grey.png')}
                                    />
                            </TouchableOpacity>
                    }
                   
                </View>
        </View>

         </View>
    );
}

export default Chat;