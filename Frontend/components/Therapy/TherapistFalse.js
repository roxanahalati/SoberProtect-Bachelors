import React from "react";
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../utils/styles";

const TherapistFalse = ({navigation}) => {
    const [selectedId, setSelectedId] = React.useState(null);
    const [therapists, setTherapists] = React.useState([]);
    const [username, setUsername] = React.useState();
    const getTherapists = async () => {
        var therapists = await AsyncStorage.getItem('therapists');
        setTherapists(JSON.parse(therapists));
        setUsername(await AsyncStorage.getItem("username"));
    }


    React.useEffect(() => {
        getTherapists();
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

    const renderItem = ({ item , index}) => {
        var color = getBulletColor(index);
        var initials = item.name.split(" ").map((n)=>n[0]).join("");
        return (

            <View style={styles.topicContainer}>
            <TouchableOpacity style={{flex:1, flexDirection:'column', justifyContent:'center', alignContent:'center'}} onPress={() => navigation.navigate('Therapist', {item: item, username: username})}>
                    <View style={{flexDirection:'row'}}>
                        <View style={[styles.circle, {backgroundColor: color, alignSelf:'center', marginTop:10}]}>
                            <Text style={{fontSize:14, color:"#ffffff"}}>{initials}</Text>
                        </View>
                        <Text style={{fontSize:18, color:'#000000', alignSelf:'center'}}> {item.name} </Text>
                    </View>



                <View style={{flexDirection:'row'}}>
                    <Text style={{marginLeft:12, color:'#000000', fontSize:16}}>Experience:</Text>
                    <Text style={{fontSize:16}}> {item.experience} </Text>
                </View>


                <View style={{flexDirection:'row'}}>
                    <Text style={{marginLeft:12, color:'#000000', fontSize:16}}>Price: </Text>
                    <Text style={{fontSize:16}}>{item.price} lei</Text>
                </View>
            </TouchableOpacity>
            </View>

        );
      };


    return(
        <View>
            <View style={styles.topicContainer}>
            <Text style={styles.importantTitleSmall}>Looking for help?</Text>
            <Text style={[styles.generalText,{paddingTop: 8}]}>We're here for you! Browse our list of specialized professionals, all ready to help you along your journey. </Text>
            </View>
            <FlatList
                data={therapists}
                renderItem={(item, index) => renderItem(item, index)}
                keyExtractor={item => item._id}
                extraData={selectedId}
            />
        </View>
    )
}

export default TherapistFalse