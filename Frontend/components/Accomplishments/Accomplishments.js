import React from 'react';
import {View,Text, Image} from 'react-native';
import styles
 from '../../utils/styles';
const Accomplishments = ({route}) => {

    const numberOfAccomplishments = route.params.accomplishments;

    if (numberOfAccomplishments>=1)
            link1 = require('../../assets/trophies/1hour.png');
        else
            link1 = require('../../assets/trophies/1hourno.png')

    if (numberOfAccomplishments>=2)
            link2 = require('../../assets/trophies/1day.png');
        else
            link2 = require('../../assets/trophies/1dayno.png')

    if (numberOfAccomplishments>=3)
            link3 = require('../../assets/trophies/1week.png');
        else
            link3 = require('../../assets/trophies/1weekno.png');

    if (numberOfAccomplishments>=4)
            link4 = require('../../assets/trophies/1month.png');
        else
            link4 = require('../../assets/trophies/1monthno.png');

    if (numberOfAccomplishments>=5)
            link5 = require('../../assets/trophies/3months.png');
        else
            link5 = require('../../assets/trophies/3monthsno.png');

    if (numberOfAccomplishments>=6)
            link6 = require('../../assets/trophies/6months.png');
        else
            link6 = require('../../assets/trophies/6monthsno.png');

    if (numberOfAccomplishments>=7)
            link7 = require('../../assets/trophies/1year.png');
        else
            link7 = require('../../assets/trophies/1yearno.png');

    if (numberOfAccomplishments>=8)
            link8 = require('../../assets/trophies/3years.png');
        else
            link8 = require('../../assets/trophies/3yearsno.png');

    if (numberOfAccomplishments>=9)
            link9 = require('../../assets/trophies/5years.png');
        else
            link9 = require('../../assets/trophies/5yearsno.png');

    return (
        <View>
            <Text style={styles.headerText}>You are doing great! </Text>
            <Text style={styles.generalText}>Keep going to earn all the awards! </Text>
            
          
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' , marginRight:15, marginLeft:15, marginTop:15, flexWrap: 'wrap'}}>
                
                    <Image
                        style={{alignSelf: 'center', width: 110, height: 115, margin:6}}
                        source={link1}
                    />
                    <Image
                        style={{alignSelf: 'center', width: 110, height: 120, margin: 6}}
                        source={link2}
                    />
                    <Image
                        style={{alignSelf: 'center', width: 110, height: 110}}
                        source={link3}
                    />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' , marginRight:35, marginLeft:35}}>
                        <Text style={styles.generalText}>   1 hour</Text>
                        <Text style={styles.generalText}>1 day</Text>
                        <Text style={styles.generalText}>1 week </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' , marginRight:15, marginLeft:15, marginTop:5, flexWrap: 'wrap'}}>
                    <Image
                        style={{alignSelf: 'center', width: 110, height: 110, marginTop: 30}}
                        source={link4}
                    />
                    <Image
                        style={{alignSelf: 'center', width: 110, height: 110}}
                        source={link5}
                    />
                    <Image
                        style={{alignSelf: 'center', width: 110, height: 110}}
                        source={link6}
                    />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' , marginRight:35, marginLeft:35}}>
                        <Text style={styles.generalText}>1 month</Text>
                        <Text style={styles.generalText}>3 months</Text>
                        <Text style={styles.generalText}>6 months</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' , marginRight:12, marginLeft:12, marginTop:5, flexWrap: 'wrap'}}>
                    <Image
                        style={{alignSelf: 'center', width: 120, height: 135, marginTop: 30}}
                        source={link7}
                    />
                    <Image
                        style={{alignSelf: 'center', width: 120, height: 135}}
                        source={link8}
                    />
                    <Image
                        style={{alignSelf: 'center', width: 120, height: 135}}
                        source={link9}
                    />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' , marginRight:35, marginLeft:15}}>
                        <Text style={styles.generalText}>      1 year</Text>
                        <Text style={styles.generalText}>3 years</Text>
                        <Text style={styles.generalText}>5 years</Text>
                    </View>
                
                <View style={{height:'10%',justifyContent:'flex-end'}}>
                <Text style={styles.smallAnnouncement}>  "The two most powerful warriors are patience and time"</Text>
                </View>
                
        </View>
    );
}

export default Accomplishments;