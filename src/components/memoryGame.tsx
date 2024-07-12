import { useEffect, useState } from 'react';
import '../stylesheet/memGame.css';
import SingleCard from './SingleCard';
import axios from 'axios';
import { UrlSubmittion, UrlUpdateScore } from '../endpoint';
import { useParams } from 'react-router';
import Star from './Star';
import { Button, ButtonToolbar } from 'reactstrap';
import { count } from 'console';
//import Rating from 'react-rating-stars-component';


const cardBack = require('../img/cover.png');
const GameId = 1;

const cardImages: any = [
  {"src": require('../img/helmet-1.png'), match: false},
  {"src": require('../img/potion-1.png'), match: false},
  {"src": require('../img/ring-1.png'), match: false},
  {"src": require('../img/scroll-1.png'), match: false},
  {"src": require('../img/shield-1.png'), match: false},
  {"src": require('../img/sword-1.png'), match: false},
];

const MemoryGame = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [turn, setTurn] = useState<number>(0);
  const [disable, setDisable] = useState<boolean>(false);
  const [choice1, setChoice1] = useState<any>(null);
  const [choice2, setChoice2] = useState<any>(null);
  const [score, setScore] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const {name}: any = useParams();

  const [countRating, setCountRating] = useState<number>(0);
  // console.log("Name", name)

  const shuffleCards = () => {
    const cards = [...cardImages, ...cardImages]; // duplicate the cards
    const shuffle = cards.sort(() => Math.random() - 0.5); // shuffle the cards
    // Assign the shuffled cards with random id
    const shuffleCards = shuffle.map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffleCards);
    setTurn(0);
    setScore(0); // Reset score
    setChoice1(null);
    setChoice2(null);
  };

  useEffect(() => {
    if (choice1 && choice2) {
      setDisable(true);
      if (choice1.src === choice2.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choice1.src) {
              return { ...card, match: true };
            } else {
              return card;
            }
          });
        });
        setTimeout(() => {
          ResetCard();
          //CheckGameFinished();
        }, 1000);
      } else {
        setTimeout(() => ResetCard(), 1000);
      }
    }
  }, [choice2, choice1]);

  const handleChoice = (card: any) => {
    if (!disable) {
      choice1 ? setChoice2(card) : setChoice1(card);
    }
  };

  useEffect(() => {
    CheckGameFinished();
  }, [cards])

  const ResetCard = () => {
    setChoice1(null);
    setChoice2(null);
    setTurn((prevTurn) => prevTurn + 1);
    setDisable(false);
  };

  const CalculateScore = () => {
    if (turn <= 6){
      return 100;
    } else if (turn > 6 && turn <= 12){
      return 75;
    } else if (turn > 12 && turn <= 15){
      return 50;
    } else if (turn > 15 && turn <= 20){
      return 30;
    } else {
      return 0;
    }
  }

  const CheckGameFinished = () => {
    if (cards.length > 0 && cards.every((card) => card.match)){
      const finalScore = CalculateScore();
      setScore(finalScore);
      axios.post(UrlUpdateScore, {
        memPoint : finalScore,
        name : name
      }).then(res => {
        alert(`Congratulations! You've matched all cards! Your score is ${finalScore}`);
      })
      console.log("Updated");
    }
  }

  const HandleRating = () => {
    setCountRating(countRating + 1);
    console.log("Rating ", rating);
    console.log("Count ", countRating);
    axios.post(UrlSubmittion, {
      gameId : GameId,
      totalRate : rating
    }).then(res => {
      console.log("Submitted");
      setRating(0);
    }).catch(err => {
      console.error(err);
    })
  }

  return (
    <>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="grid-container">
        {cards.map((card: any) => (
          <SingleCard
            HandleChoice={handleChoice}
            key={card.id}
            card={card}
            cardBack={cardBack}
            flipped={card === choice1 || card === choice2 || card.match}
            disable={disable}
          />
        ))}
      </div>
      <p>Turn: {turn}</p>
      <p>Score: {score}</p>
      <div>
        <h2>Rate this Game</h2>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} selected={i <= rating} onClick={() => setRating(i)} />
        ))}
        <br></br>
        <Button onClick={HandleRating}>Submit</Button>
      </div>
    </>
  );
};

export default MemoryGame;
