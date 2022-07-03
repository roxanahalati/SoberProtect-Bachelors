import AsyncStorage from "@react-native-async-storage/async-storage";
import { createFormBody } from "./utils";

export const continueSignUpRequest = (name, username, email, password, selectedValue, pledge, soberMoment) => {
    let dataToSend = {};
    if(soberMoment){
        dataToSend = {name: name, username: username, email: email, password: password, addiction: selectedValue, pledge: pledge, soberMoment: soberMoment};
    }
    else{
        dataToSend = {name: name, username: username, email: email, password: password, addiction: selectedValue, pledge: pledge};
    }
    let formBody = createFormBody(dataToSend);
    fetch('http://10.0.2.2:5000/api/users/register', {
        method: 'POST',
        body: formBody,
        headers: {
            //Header Defination
            'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
        },
    })
}

export const createNewComment = (dataToSend) => {
    let formBody = createFormBody(dataToSend);
    fetch('http://10.0.2.2:5000/api/comment/createComment', {
        method: 'POST',
        body: formBody,
        headers: {
            //Header Defination
            'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
        },
    })
}

export const updateLastUpdateForum = (formBody) => {
    
    fetch('http://10.0.2.2:5000/api/forum/updateDate', {
            method: 'POST',
            body: formBody,
            headers: {
                //Header Defination
                'Content-Type':
                'application/x-www-form-urlencoded;charset=UTF-8',
            },
    })
}

export const resetTimeInDB = (email) => {
    const encodedValue = encodeURIComponent(email);
    const datetime= new Date();
    fetch(`http://10.0.2.2:5000/api/users/resetTimer?email=${encodedValue}`, {
            method: 'POST',
            headers: {
                'Content-Type':
                'application/x-www-form-urlencoded;charset=UTF-8',
            },
            })   
    AsyncStorage.setItem("soberTime", datetime.toISOString());
}

export const createNextSession = (date, clientID) =>{
    let dataToSend = {date: date.toISOString(), userID: clientID}
    let formBody = createFormBody(dataToSend);
        
    fetch('http://10.0.2.2:5000/api/users/updateSession', {
                method: 'POST',
                body: formBody,
                headers: {
                    //Header Defination
                    'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
                },
                })
}

export const requestTherapistInDB = (username, therapistID) => {
    let dataToSend = {username: username, therapistID: therapistID};
    let formBody = createFormBody(dataToSend);
        

    fetch('http://10.0.2.2:5000/api/users/addTherapist', {
        method: 'POST',
        body: formBody,
        headers: {
            //Header Defination
            'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
        },
        })
}

export const saveHomeworkUser = (assignedH, solved) => {
    let dataToSend = {homeworkID: assignedH, homeworkBody: solved}
    let formBody = createFormBody(dataToSend);
    fetch('http://10.0.2.2:5000/api/homework/solveHomework', {
                method: 'POST',
                body: formBody,
                headers: {
                    //Header Defination
                    'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
                },
                })
}

export const saveHomeworkHomework = (userID) => {
    let dataToSend = {userID: userID}
    let formBody = createFormBody(dataToSend);
    fetch('http://10.0.2.2:5000/api/users/solveHomework', {
        method: 'POST',
        body: formBody,
        headers: {
            //Header Defination
            'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
        },
        })
}

export const addMessageToDB = (senderID, receiverID, message) =>{
    let dataToSend = {sender: senderID, receiver: receiverID, body: message};
        let formBody = createFormBody(dataToSend);
        fetch('http://10.0.2.2:5000/api/messages/createMessage', {
        method: 'POST',
        body: formBody,
        headers: {
            //Header Defination
            'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
        },
        })
}