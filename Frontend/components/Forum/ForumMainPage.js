import React from 'react';
import {View,Text, TouchableOpacity, FlatList, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import styles from '../../utils/styles';
const ForumMainPage = ({route, navigation}) => {  

    const [topics, setTopics] = React.useState([]);
    const username = route.params.username;
    const isFocused = useIsFocused();
 
    //EXEMPLU DE ASYNC CORECT
    const getThreads = async () => {
        var threads = await AsyncStorage.getItem('threads');
        // threads.sort((a,b) => (a.lastUpdate < b.lastUpdate) ? 1 : ((b.lastUpdate < a.lastUpdate) ? -1 : 0))
        setTopics(JSON.parse(threads));
    }
     
    React.useEffect(() => {
        let secTimer = setInterval( () => {
        getThreads()
        },100)

        return () => clearInterval(secTimer);
    }, []);


    const calculateTime = (sobertime) => {
        var date = new Date(sobertime);
        date = date.toISOString().substring(0, 10).toString();
        date = date.split("-");
        return date[2]+ "/" + date[1]+ "/" + date[0].substring(2);
    }
   
 
    return (
        <View style={{flex: 1}}>
         
            <View style={styles.topicContainer}>
                <Image  
                    style={{alignSelf:'center'}}
                    source={require('../../assets/logo.png')}
                />
            </View>
            <TouchableOpacity style={styles.buttonWithIcon} onPress={() => navigation.navigate('NewDiscussion', {username: username})}>
                    <Image
                        source={require('../../assets/create.png')}
                        />
                    <Text style={styles.blankButtonText}>Create a new discussion</Text>
            </TouchableOpacity>

            <FlatList
                data = {topics}
                renderItem={({ item }) => 
                    <TouchableOpacity style={styles.topicContainer} onPress={() => {navigation.navigate('ForumTopic', {item: item, username: username})}}>
                        <Text style={styles.complementaryDarkGrey}>{item.username}</Text>
                        <Text style={styles.titleStyle}>{item.title}</Text>
                        <Text style={styles.complementaryGrey}>{calculateTime(item.lastUpdate)}</Text>
                    </TouchableOpacity>}
                keyExtractor={item => item._id}
            />

        </View>

    );
}

export default ForumMainPage;