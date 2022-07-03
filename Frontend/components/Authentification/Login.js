import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Image, Alert, TextInput } from "react-native";
import { createFormBody } from '../../utils/utils';
import { getTherapistsFromDB, setLogin, setUserInformation } from '../../utils/GetInformation';
import styles from '../../utils/styles';

const LoginPage = ({navigation}) => {
    const [email, setEmail] = React.useState('user1@gmail.com');
    const [password, setPassword] = React.useState('parola123');

    const login = () => {
      if (!email) {
        Alert.alert('Whoops :(', 'Please fill in your email');
        return;
      }
      if (!password) {
        Alert.alert('Whoops :(', 'Please fill in your password');
        return;
      }

      const dataToSend = {email: email, password: password};
      const formBody = createFormBody(dataToSend);

      fetch('http://10.0.2.2:5000/api/users/login', {
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
              setUserInformation(responseJson);
              getTherapistsFromDB();
              setLogin(responseJson.token);
              navigation.navigate('Home');
          } else {
              Alert.alert('Whoops :(', 'Wrong username or password. Please try again.')
          }
        })
    };

    return (
        <SafeAreaView style={styles.content}>
        <Image
          style={{alignSelf: 'center'}}
          source={require('../../assets/Log4.png')}
        />
        <TextInput text={email}
          value={email}
          placeholder="Email"
          style={styles.input}
          onChangeText={newText => {setEmail(newText)}} 
        />
        <TextInput text={password}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          style={styles.input}
          onChangeText={newText => setPassword(newText)} 
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={login}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => {navigation.navigate('SignUp')}}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {navigation.navigate('TherapistLogin')}}>
          <Text style={styles.Therapy}> I am a therapist </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}

export default LoginPage;