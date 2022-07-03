import AsyncStorage from '@react-native-async-storage/async-storage';
import createFormBody from './utils'

export const getThreadsFromDB = async () => {
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

}

export const updateThreadsInDB = (title, body, username) => { 
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

export const setUserInformation = (responseJson) => {
    AsyncStorage.setItem("soberTime", responseJson.soberTime);
    AsyncStorage.setItem("username", responseJson.username);
    AsyncStorage.setItem("name", responseJson.name);
    AsyncStorage.setItem("userID", responseJson.userID);
    AsyncStorage.setItem("pledge", responseJson.pledge);
    AsyncStorage.setItem("homework", responseJson.homework);
    AsyncStorage.setItem("email", responseJson.email);
    AsyncStorage.setItem("hasTherapist", responseJson.assignedTherapist);
    AsyncStorage.setItem("session", responseJson.nextTherapySession);
}

export const getTherapistsFromDB = async () =>{
    var therapist = [];
    fetch('http://10.0.2.2:5000/api/therapist/findAll', {
            method: 'GET',
            headers: {
                //Header Defination
                'Content-Type':
                'application/x-www-form-urlencoded;charset=UTF-8',
            },
            })
        .then((response) => response.json())
        .then((responseJson) => {
        responseJson.map(item => {therapist.push(item)})
        AsyncStorage.setItem('therapists', JSON.stringify(therapist));

    })
}
export const setLogin = (token) => {
    AsyncStorage.setItem("token", token);
}

export const getTherapistName = (therapistID) => {
    let dataToSend = {therapistID: therapistID}
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
        .then((responseJson) => AsyncStorage.setItem('therapistName', JSON.stringify(responseJson.name)))
}
