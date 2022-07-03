import React from "react";
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import SingleCard from "./SingleCard";
import styles from "../../utils/styles";

const cardImages = [
    {"id":1,"src": require('../../assets/cardgame/bear.png'), matched: false},
    {"id":2,"src": require('../../assets/cardgame/bird.png'), matched: false},
    {"id":3,"src": require('../../assets/cardgame/bunny.png'), matched: false},
    {"id":4,"src": require('../../assets/cardgame/cat.png'), matched: false},
    {"id":5,"src": require('../../assets/cardgame/dog.png'), matched: false},
    {"id":6,"src": require('../../assets/cardgame/hedgehog.png'), matched: false}
];

const MemoryGame = () => {

    const [cards, setCards] = React.useState([]);
    const [turns, setTurns] = React.useState(0);
    const [firstChoice, setFirstChoice] = React.useState(null);
    const [secondChoice, setSecondChoice] = React.useState(null);

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: Math.random() }))

        setCards(shuffledCards);
        setFirstChoice(null);
        setSecondChoice(null);
        setTurns(0);
    }

    React.useEffect(() =>{
        shuffleCards();  
    },[])

   React.useEffect(() =>
   {
    if (secondChoice !==null && firstChoice)
         compare()
   }, [firstChoice, secondChoice])

    const handleChoice = (card) => {
        firstChoice === null
        ? setFirstChoice(card)
        : setSecondChoice(card)
    }

    const compare = () => {
        if (firstChoice.src == secondChoice.src)
            {
             setCards(prevCards => {
                 return prevCards.map(card => {
                     if (card.src === firstChoice.src)
                      return {...card, matched: true }                      
                     else 
                      return card
                     
                    })
             })
             resetTurn();
            }
        else
            {
                setTimeout(() => resetTurn(), 1000);
            }    
    }

    const resetTurn = () => {
        setFirstChoice(null);
        setSecondChoice(null);
        setTurns (turns + 1);
    }


    return (
        <ScrollView>
        <View>
            <Text style={styles.generalText2}>Feeling Triggered? Distract yourself!  </Text>
            <Text style={styles.generalTextBigger}>Match all the cards to complete the game.</Text>
            
            <View style={styles.cardGame}>
                {cards.map(card => (
                    <SingleCard 
                    key={card.id}
                    card={card} 
                    handleChoice={handleChoice} 
                    flipped={card === firstChoice || card === secondChoice || card.matched}
                 />
                ))}
                
            </View>
                <Text style={[styles.generalText, styles.centerElement]}> Turns: {turns} </Text>

                <TouchableOpacity style={styles.button} onPress={shuffleCards}>
                <Text style={styles.buttonText}> New Game </Text>
            </TouchableOpacity>
            
        </View>
        </ScrollView>
    );
}

export default MemoryGame;

