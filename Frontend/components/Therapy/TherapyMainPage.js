import React from 'react';
import {View} from 'react-native';
import TherapistFalse from './TherapistFalse';
import TherapistTrue from './TherapistTrue';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createFormBody } from '../../utils/utils';
const TherapyMainPage = ({navigation}) => {

    const [hasTherapist, setHasTherapist] = React.useState();
    const [therapistName, setTherapistName] = React.useState();
    const getUserInfo = async () => {
        setHasTherapist(await AsyncStorage.getItem("hasTherapist"));

        if (hasTherapist != '0' && hasTherapist !=undefined)
        {
            let dataToSend = {therapistID: hasTherapist}
            let formBody = createFormBody(dataToSend);
            fetch('http://10.0.2.2:5000/api/therapist/findNameByID', {
            method: 'POST',
            body: formBody,
            headers: {
                //Header Defination
                'Content-Type':
                'application/x-www-form-urlencoded;charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((responseJson) => setTherapistName(responseJson.name))
        }
    }
    getUserInfo();


    return (
        <View>
            {
                hasTherapist == '0'
                ? <TherapistFalse navigation={navigation} /> 
                : <TherapistTrue navigation={navigation} therapistID={hasTherapist} therapistName={therapistName}/>
            }
        </View>
        

    );
}

export default TherapyMainPage;