import React from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Image, Alert, Text} from "react-native";
import styles from '../../utils/styles';

const SignUp = ({navigation}) => {
    const [email, setEmail] = React.useState('roxana@gmail.com');
    const [name, setName] = React.useState('Roxana');
    const [password, setPassword] = React.useState('parola123');
    const [passwordRewritten, setPasswordRewritten] = React.useState('parola123');
    const [username, setUsername] = React.useState('roxana18');

    const signup = () => {
        if(!name) {
          Alert.alert('Whoops','Please fill in your name');
        }
        if (!email) {
            Alert.alert('Whoops', 'Please fill in your email');
            return;
          }
        if (!password) {
          Alert.alert('Whoops','Please fill in your password');
            return;
          }
        if(!username) {
          Alert.alert('Whoops','Please fill in your username');
        }
        if (!passwordRewritten) {
          Alert.alert('Whoops','Please fill in your password');
        }
        if (password != passwordRewritten) {
          Alert.alert('Whoops','Passwords do not match');
        }
        
        navigation.navigate('AccountDetails', {name, username, email, password});
    }

    return (
      <SafeAreaView style={styles.content}>
            <Image
              style={{alignSelf: 'center'}}
              source={require('../../assets/Log.png')}
            />
            <TextInput 
              value={name}
              style={styles.input}
              placeholder="Name"
              onChangeText={newText => setName(newText)} 
            />
            <TextInput 
              value={username}
              style={styles.input}
              placeholder="Username"
              onChangeText={newText => setUsername(newText)} 
            />
            <TextInput 
              value={email}
              style={styles.input}
              placeholder="Email"
              onChangeText={newText => setEmail(newText)} 
            />
            <TextInput 
              value={password}
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={newText => setPassword(newText)} 
            />
            <TextInput 
              value={passwordRewritten}
              style={styles.input}
              placeholder="Retype password"
              secureTextEntry={true}
              onChangeText={newText => setPasswordRewritten(newText)} 
            />
            <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.5}
                  onPress={signup}>
                  <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            </SafeAreaView>
        );
}

export default SignUp;