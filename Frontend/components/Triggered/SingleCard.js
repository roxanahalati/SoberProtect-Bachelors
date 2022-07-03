import React from "react";
import {View, Image, TouchableOpacity} from 'react-native';

const SingleCard = ({card, handleChoice, flipped}) => {
    
    const cardID = card.id;
    const cardSource = card.src;
    const handleClick = () => {
        handleChoice(card)   
    }

    return (
        <View key={cardID}>
            {flipped
            ? <Image  style={{alignSelf: 'center', width: 100, height: 120}} source={cardSource}/>
            : <TouchableOpacity onPress={handleClick}>
            <Image  style={{alignSelf: 'center', width: 100, height: 120}}  source={require('../../assets/cardgame/back.png')}/>
            </TouchableOpacity> }       
        </View>
    );
};

export default SingleCard