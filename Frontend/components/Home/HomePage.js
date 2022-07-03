import React from 'react';
import {View,Text, TouchableOpacity, Image} from 'react-native';
import { getThreadsFromDB } from '../../utils/GetInformation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SobrietyClock from '../Clock/SobrietyClock';
import styles from '../../utils/styles';

const HomePage = ({navigation}) => {
    const [name, setName] = React.useState();
    const [userID, setUserID] = React.useState();
    const [username, setUsername] = React.useState();
    const [email, setEmail] = React.useState();
    const [pledge, setPledge] = React.useState();
    const [hasTherapist, setHasTherapist] = React.useState();
    const [homework, setHomework] = React.useState();
    const [session, setSession] = React.useState();
  
    const getUserInfo = async () => {
        setName(await AsyncStorage.getItem("name"));
        setUsername(await AsyncStorage.getItem("username"));
        setUserID(await AsyncStorage.getItem("userID"));
        setEmail(await AsyncStorage.getItem("email"));
        setPledge(await AsyncStorage.getItem("pledge"));
        setHasTherapist(await AsyncStorage.getItem("hasTherapist"));
        setEmail(await AsyncStorage.getItem("email"));
        setHomework(await AsyncStorage.getItem("homework"));
        setSession(await AsyncStorage.getItem("session"));
        getThreadsFromDB();
    }
    getUserInfo();



    return (
        <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                <SobrietyClock navigation={navigation} />
            
                <TouchableOpacity onPress={() => {navigation.navigate('Therapy', {userID: userID, username: username, hasTherapist: hasTherapist, homework: homework, session: session})}}>
                <View style={styles.therapyFeature}>
                    <Text style={styles.featureText}> Therapy Zone </Text>
                </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => {navigation.navigate('MemoryGame', {pledge: pledge})}}>
                <View style={styles.triggeredFeature}>
                    <Text style={styles.featureText}> Feeling Triggered?  </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {navigation.navigate('Forum', {username: username})}}>
                <View style={styles.forumFeature}>
                    <Text style={styles.featureText}> Forum </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {navigation.navigate('Settings', {email: email})}}>
                    <Image
                    style={{alignSelf: 'center'}}
                    source={require('../../assets/settings.png')}
                    />
                </TouchableOpacity>
            
        </View>
    );
}

export default HomePage;