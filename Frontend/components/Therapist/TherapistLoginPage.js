import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Image, Alert  } from "react-native";
import { TextInput } from 'react-native';
import styles from '../../utils/styles';
import { createFormBody } from '../../utils/utils';

const TherapistLoginPage = ({navigation}) => {
    const [email, setEmail] = React.useState('diana@therapy.com');
    const [password, setPassword] = React.useState('parola123');
    const [errortext, setErrortext] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState('sd');

    const login = async () => {
    if (!email) {
      Alert.alert('Whoops :(', 'Please fill in your email');
      return;
    }
    if (!password) {
      Alert.alert('Whoops :(', 'Please fill in your password');
      return;
    }
    setLoading(true);
    let dataToSend = {email: email, password: password};
    let formBody = createFormBody(dataToSend);
    fetch('http://10.0.2.2:5000/api/therapist/login', {
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
        if (responseJson.success == true) {
          setData('true');
          navigation.navigate('TherapistPage');
        } else {
            setData('false');
            Alert.alert('Whoops :(', 'Wrong username or password. Please try again.')
        }
      })
    }
    
    return (
        <SafeAreaView style={styles.content}>
        <Image
          style={{alignSelf: 'center'}}
          source={require('../../assets/Log.png')}
        />
        <TextInput value={email}
        placeholder="Email"
        style={styles.input}
    onChangeText={newText => setEmail(newText)} 
        />
        <TextInput value={password}
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
    onChangeText={newText => setPassword(newText)} 
        />
        <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={login}>
              <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}

export default TherapistLoginPage;

