import React from 'react';
import {View,Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import styles from '../../utils/styles';

const SobrietyClock = ({navigation}) => {

    const [soberTime, setSoberTime] = React.useState();
    const [years, setYears] = React.useState(0);
    const [months, setMonths] = React.useState(0);
    const [days, setdays] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [accomplishments, setAccomplishments] = React.useState(0);

    React.useEffect(() => {
        getSober();
        getTime();
        calculateAccomplishments();
    })

    React.useEffect(() => {
        let secTimer = setInterval( () => {
            getSober();
            getTime();
            calculateAccomplishments();
        },1000)
        return () => clearInterval(secTimer);
  
    }, [])
    
    const calculateAccomplishments = () => {
        var acc = 0;
        if (years>=5)
            acc = 9;
        else if (years>=3)
            acc = 8;
        else if (years>=1)
            acc = 7;
        else if (months>=6)
            acc = 6;
        else if(months>=3)
            acc = 5;
        else if(months>=1)
            acc = 4;
        else if(days>=7)
            acc = 3;
        else if (days >= 1)
            acc = 2;
        else if (hours>=1)
            acc = 1;
        setAccomplishments(acc);
    }

    const getSober = async () => {
        var time = await AsyncStorage.getItem("soberTime");
        setSoberTime(time);     
    }

    const getTime = () => {
        var first = new Date(Date.now());
        var second = new Date(soberTime);
        var firstDateInSeconds = first.getTime() / 1000;
        var secondDateInSeconds = second.getTime() / 1000;
        var difference = Math.abs(firstDateInSeconds - secondDateInSeconds);
        const years_diff = Math.floor(difference / 31536000);
        const months_diff = Math.floor((difference % 31536000) / 2628000);
        const days_diff = Math.floor(((difference % 31536000) % 2628000) / 86400);
        const hours_diff = Math.floor((((difference % 31536000) % 2628000) % 86400) / 3600);
        const minutes_diff = Math.floor(((((difference % 31536000) % 2628000) % 86400) % 3600) / 60);

        setYears(years_diff);
        setMonths(months_diff);
        setdays(days_diff);
        setHours(hours_diff);
        setMinutes(minutes_diff);
    
    }


    return (
        <View>
            <Text style={[styles.importantTitle, {alignSelf:'center', margin:0, padding:0}]}>You have been sober for </Text>
            <View style={[styles.clock,{flexDirection: 'row',  flexWrap: 'wrap', justifyContent:'center'}]}>

                    {
                        years>0
                        ? years == 1
                            ?  <Text style={styles.clockText}>{years} year,  </Text>
                            :  <Text style={styles.clockText}>{years} years,  </Text>
                        
                        : null
                        
                    }
                    {
                        months>0
                        ? months == 1
                            ? <Text style={styles.clockText}>{months} month,  </Text>
                            : <Text style={styles.clockText}>{months} months,  </Text>
                        : null
                    }
                    {
                        days>0
                        ?  days == 1
                            ? <Text style={styles.clockText}>{days} day,  </Text>
                            : <Text style={styles.clockText}>{days} days,  </Text>
                        : null
                    }
                    {
                        hours>0
                        ? hours == 1
                            ? <Text style={styles.clockText}>{hours} hour,  </Text>
                            : <Text style={styles.clockText}>{hours} hours,  </Text>
                        : null
                    }
                    {
                        minutes>0
                        ? minutes == 1
                            ? <Text style={styles.clockText}>{minutes} minute,  </Text>
                            : <Text style={styles.clockText}>{minutes} minutes,  </Text>
                        : null 
                    }
                    <Text style={styles.clockText}>a few seconds</Text>
            </View>
            <View style={{marginBottom:40}}></View>
            <TouchableOpacity onPress={() => {navigation.navigate('Accomplishments', {accomplishments})}}>
                <View style={styles.accomFeature}>
               
                    <Text style={styles.featureText}> Accomplishments </Text>
               
                </View>
            </TouchableOpacity>
      </View>
    );
}

export default SobrietyClock;