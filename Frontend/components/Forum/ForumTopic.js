import React from 'react';
import {View, Text, FlatList, TouchableOpacity, TextInput, Image} from 'react-native';
import { createNewComment, updateLastUpdateForum } from '../../utils/Requests';
import { createFormBody } from '../../utils/utils';
import styles from '../../utils/styles';

const ForumTopic = ({route}) => {
    const title = route.params.item.title;
    const body = route.params.item.body;
    const fid = route.params.item._id;
    const user = route.params.username;
    const [newComment, setNewComment] = React.useState('');
    const [comments, setComments] = React.useState([])

    React.useEffect(() => {
        getComments();

    },[]);

    const getComments = () => {
        var comments = [];
        let dataToSend = {fid: fid}
        let formBody = createFormBody(dataToSend)
        fetch('http://10.0.2.2:5000/api/comment/findAll', {
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

    const addNewComment = () => {
        const dataToSend = {username: user, body:newComment, fid: fid}
        var formBody = createFormBody(dataToSend);
        setNewComment('');
        setComments([...comments, dataToSend]);
        updateLastUpdateForum(formBody);
        createNewComment(dataToSend);
    }

    const renderComment = (item) => { 
        return(
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


    return(
        <View style={{flex: 1}}>
            <View style={styles.bodyText}>
                <Text style={styles.threadTitle}>{title}</Text>
                {
                    body
                    ? <Text style={styles.threadBody}>{body}</Text>
                    : null
                }
            </View>

            {
                comments.length > 0
                ? <FlatList
                    data = {comments}
                    renderItem={({item}) => renderComment(item)}
                    keyExtractor={item => item._id} />
                
                : <View><Text style={styles.smallAnnouncement}>There are no comments for this discussion yet. Be the first to leave one.</Text></View>
            }
            
           
            <View style={styles.alignBottom}>
                <View style={styles.inputWithIcon}>
                    <TextInput
                        style={{flex: 1}}
                        onChangeText={newText => setNewComment(newText)}
                        placeholer="Type a comment..."
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

export default ForumTopic;