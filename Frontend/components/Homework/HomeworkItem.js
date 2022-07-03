import React from 'react';
import {View, Text, FlatList, TouchableOpacity, TextInput, Image} from 'react-native';
import styles from '../../utils/styles';
import { createFormBody } from '../../utils/utils';

const HomeworkItem = ({route}) => {
    const title = route.params.title;
    const [body, setBody] = React.useState('');
    const homeworkID = route.params.homeworkID;
    const senderName = route.params.senderName;
    const [newComment, setNewComment] = React.useState();
    const [comments, setComments] = React.useState([])

    const addNewComment = () => {
        const dataToSend = {body:newComment, homeworkID: homeworkID, username: senderName}
        setComments([...comments, dataToSend]);
        setNewComment('');
        let formBody = createFormBody(dataToSend);
        fetch('http://10.0.2.2:5000/api/homeworkComment/createComment', {
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
        })
    }

    const getBody = () => {
        const dataToSend = {title: title}
        let formBody = createFormBody(dataToSend);
        fetch('http://10.0.2.2:5000/api/homework/getHomeworkBody', {
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
            setBody(responseJson[0].homeworkBody);
        })
    }
    const getComments = () => {
            var comments = [];
            let dataToSend = {homeworkID: homeworkID}
            let formBody = [];
            for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
            }
            formBody = formBody.join('&');
            fetch('http://10.0.2.2:5000/api/homeworkComment/findAll', {
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
                responseJson.map(item => {comments.push(item)})
                setComments(comments);
                })
    
        }
    
    React.useEffect(() => {
            getBody();
            getComments();
          },[]);

    const renderComment = (item) => { 
        return (
            <View style={styles.commentContainer}>
                <Text style={{fontSize:12}}>
                    {item.username}
                </Text>
                <Text style={{fontSize:16, color: "#000000"}}>
                    {item.body}
                </Text>
            </View>
        )
    }
    
return (
    <View style={{flex:1}}>
        <View style={styles.topicContainer}>
        <Text style={styles.importantTitleSmall}>{title} </Text>
        {
            body !=""
            ? <Text style={styles.generalText}>{body}</Text>
            : null
        }
        </View>
        <FlatList
            data = {comments}
            renderItem={({item}) => renderComment(item)} 
            keyExtractor={item => item._id}
            />
        <View style={styles.alignBottom}>
            <View style={styles.inputWithIcon}>
                <TextInput
                    style={{flex: 1}}
                    onChangeText={newText => setNewComment(newText)}
                    placeholder='Type Comment...'
                    multiline={true}
                    value={newComment}
                            
                />
                 {
                        newComment
                        ?  <TouchableOpacity style={{paddingRight:8}} onPress={addNewComment}>
                                <Image
                                style={{alignSelf:'center'}}
                                source={require('../../assets/send.png')}
                                    />
                            </TouchableOpacity>
                        :  <TouchableOpacity style={{paddingRight:8}}>
                                <Image
                                style={{alignSelf:'center'}}
                                source={require('../../assets/send_grey.png')}
                                    />
                            </TouchableOpacity>
                    }
            </View>
        </View>
    </View>
)
}


export default HomeworkItem;