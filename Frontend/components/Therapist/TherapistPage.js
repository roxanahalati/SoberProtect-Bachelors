import React from "react";
import {View, TouchableOpacity, Text, FlatList, Image} from 'react-native';
import styles from "../../utils/styles";

const TherapistPage = ({navigation}) => {
    const therapistID = '62866efe383d371d0195b341';
    const therapistName = "Dr. Diana Andreea";
    const [clients, setClients] = React.useState();

    const getClients = () => {
        let dataToSend = {therapist: therapistID};
        let formBody = [];
        for (let key in dataToSend) {
          let encodedKey = encodeURIComponent(key);
          let encodedValue = encodeURIComponent(dataToSend[key]);
          formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        var clienti = [];
        fetch('http://10.0.2.2:5000/api/users/findClients', {
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
            responseJson.map(item => clienti.push(item))
            setClients(clienti);
            })
    }

    React.useEffect(() => {
        getClients();
      },[]);

    const getBulletColor = (index) => {

        if (index%3==0){
            return '#3ACADF';
        }
        else {
            if (index%3==1) {
                return '#729EFD';
            
            }
            else {
                if (index%3==2)
                    return '#8A64D6';
            }
        }
    }

        
    const renderBullet = (item, index) => {
        var color = getBulletColor(index);
        var initials = item.name.split(" ").map((n)=>n[0]).join("");
        return (
            <View style={styles.clientContainer}>
            <TouchableOpacity style={{flex:1, flexDirection:'row', alignItems:'center', alignContent:'center'}} onPress={() => navigation.navigate('ClientModal', {item: item, therapistID: therapistID, therapistName: therapistName})}>
                <View style={[styles.circle, {backgroundColor: color}]}>
                    <Text style={{fontSize:18, color:"#ffffff"}}>{initials}</Text>
                </View>
                <Text style={{fontSize:20, color:'#000000', padding:6}}>{item.name}</Text>
            </TouchableOpacity>
            </View>
            
        )
    }
    
        
    return (
        <View style={{flex:1}}>
            <View style={styles.clientContainer}>
                <Text style={styles.importantTitle}>Welcome Back</Text>
                <Text style={[styles.generalText, {marginBottom:8}]}>"Great acts are made of small deeds"</Text>
            </View>
            <FlatList
            data={clients}
            renderItem={({item, index}) => 
                renderBullet(item,index)
            }
            keyExtractor={item => {return item._id}}

            />
            <View style={{flex:1, justifyContent:'flex-end'}}>
             <Image
            style={{alignSelf: 'center', marginBottom:0, paddingBottom:0}}
            source={require('../../assets/client.png')}
            />
            <Image
            style={{alignSelf: 'center'}}
            source={require('../../assets/logo.png')}
            />
            </View>
        </View>
    )
}

export default TherapistPage;