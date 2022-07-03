import React from 'react';
import {View,Text,TouchableOpacity, TextInput} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { continueSignUpRequest } from '../../utils/Requests';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from '../../utils/styles';

export default AccountDetails = ({route, navigation}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    const {name, username, email, password} = route.params;
    const [selectedValue, setSelectedValue] = React.useState("Alcohol");
    const [pledge, setPledge] = React.useState('')
    const [selectedValueTime, setSelectedValueTime] = React.useState("now");
    const [soberMoment, setSoberMoment] = React.useState();
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
    const handleConfirm = (date) => {
        hideDatePicker();
        setSoberMoment(date);
      };
    const continueSignUp = () => {
        continueSignUpRequest(name,username,email,password, selectedValue,pledge,soberMoment);
        navigation.navigate('Login')
    }

    return (
        <View style={{flex:1}}>
            <Text style={styles.importantTitle}>Welcome! </Text>
            <Text style={styles.generalText}>We're glad you could join us! Every single step is one step closer to wellness.</Text>
            <Text style={styles.generalText3}>Tell us more about you so we can customize your journey!</Text>
            <Text style={[styles.generalText2, {marginTop:12}]}>What are you getting sober from? </Text>

            <View style={{borderWidth: 2, borderRadius: 10, margin: 8, borderColor: '#5C3A92'}}>
                <Picker
                    selectedValue={selectedValue}
                    style={{color: `#5C3A92`}}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                    <Picker.Item style={{fontSize:18}} label="Alcohol" value="alcohol" />
                    <Picker.Item style={{fontSize:18}} label="Drugs" value="drugs" />
                    <Picker.Item style={{fontSize:18}} label="Both" value="both" />
                    <Picker.Item style={{fontSize:18}} label="Other" value="other" />
                    <Picker.Item style={{fontSize:18}} label="Prefer not to say" value="NA" />
                </Picker>
            </View>

            <Text style={styles.generalText2}>Why do you want to stay sober? </Text> 
            <Text style={styles.generalText}>We'll use this pledge as a reminder when things get a little tough. </Text>

            <TextInput
                style={styles.longTextInput}
                onChangeText={setPledge}
                multiline={true}
                placeholder="I want to stay sober because..."

            />
            <Text style={styles.generalText2}>When did you become sober?</Text>
            <View style={{borderWidth: 2, borderRadius: 10, margin: 8, borderColor: '#5C3A92'}}>
                <Picker
                    selectedValue={selectedValueTime}
                    style={{color: `#5C3A92`}}
                    onValueChange={(itemValue, itemIndex) => setSelectedValueTime(itemValue)}>
                    <Picker.Item style={{fontSize:18}} label="Now" value="now" />
                    <Picker.Item style={{fontSize:18}} label="Another time" value="another" />

                </Picker>
            </View>

            {
                selectedValueTime=="another"
                ? <TouchableOpacity style={styles.button} onPress={showDatePicker}><Text style={styles.buttonText}>Select Sober Time</Text></TouchableOpacity>
                : null
            }

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

            <View style={{flex:1, justifyContent:'flex-end', marginBottom:12}}>
                <TouchableOpacity
                    style={[styles.button]}
                    activeOpacity={0.5}
                    onPress={continueSignUp}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    );
}
