import { useEffect, useState } from "react"
import React from "react"
import '../stylesheet/rps.css'
import { useParams } from "react-router"
import axios from "axios"
import { UrlSubmittion, UrlUpdateScore } from "../endpoint"
import Star from "./Star"
import { Button } from "reactstrap"

const GameId = 2;

const RPSGame = () => {
    const [userChoice, setUserChoice] = useState<string>('rock')
    const [computerChoice, setComputerChoice] = useState<string>('rock')
    const [userPoints, setUserPoints] = useState(0)
    const [computerPoints, setComputerPoints] = useState(0)
    const [turnResult, setTurnResult] = useState<string>('')
    const [result, setResult] = useState<string>('Let\'s see who wins')
    const [gameOver, setGameOver] = useState(false)
    const choices = ['rock', 'paper', 'scissors'];
    const {name}:any = useParams();
    const [rating, setRating] = useState<number>(0);
    const [countRating, setCountRating] = useState<number>(0);

    const handleClick = (value : any) => {
      setUserChoice(value)    
      generateComputerChoice()
    }
  
    //Generate a random move
    const generateComputerChoice = () => {
      const randomChoice = choices[Math.floor(Math.random() * choices.length)]
      setComputerChoice(randomChoice)
    }
  
    const reset = () => {
        setUserChoice('rock');
        setComputerChoice('rock');
        setUserPoints(0);
        setComputerPoints(0);
        setTurnResult('');
        setResult('Let\'s see who wins');
        setGameOver(false);
    }
  
    useEffect(() => {
      const comboMoves = userChoice + computerChoice
      // Best of five
      if (userPoints <= 4 && computerPoints <= 4) {
        if (comboMoves === 'scissorspaper' || comboMoves === 'rockscissors' || comboMoves === 'paperrock') {
          // userPoints.current += 1
          const updatedUserPoints = userPoints + 1
          setUserPoints(updatedUserPoints)
          setTurnResult('User gets the point!')
          if (updatedUserPoints === 5){
            setResult(`${name} Wins`)
            const gameOff = true
            if (gameOff){
              axios.post(UrlUpdateScore, {
                name : name,
                rpsPoint : 50
              }).then (res => {
                setGameOver(gameOff)    
              }).catch(err => {
                console.error(err);
              })
            }
            
          }
        }
  
        if (comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper') {
          // computerPoints.current += 1
          const updatedComputerPoints = computerPoints + 1
          setComputerPoints(updatedComputerPoints)
          setTurnResult('Computer gets the point!')
          if (updatedComputerPoints === 5) {
            setResult('Computer Wins')
            const gameOff = true
            setGameOver(gameOff)
          }
        }
  
        if (comboMoves === 'paperpaper' || comboMoves === 'rockrock' || comboMoves === 'scissorsscissors') {
          setTurnResult('No one gets a point!')
        }
      }
    }, [computerChoice, userChoice])
  

    const HandleRating = () => {
      setCountRating(countRating + 1);
      console.log("Rating ", rating);
      console.log("Count ", countRating);
      axios.post(UrlSubmittion, {
        gameId : GameId,
        totalRate : rating
      }).then(res => {
        console.log("Submitted")
        setRating(0);
      }).catch(err => {
        console.error(err);
      })
    }

    return (
      <div className="rps-container">
        <h1 className='heading'>Rock-Paper-Scissors</h1>
        <div className='score'>
          <h1>User Points: {userPoints}</h1>
          <h1>Computer Points: {computerPoints}</h1>
        </div>
  
        <div className='choice'>
          <div className='choice-user'>
            <img className='user-hand' src={require(`../img/${userChoice}.png`)} alt={`${userChoice}`}></img>
          </div>
          <div className='choice-computer'>
            <img className='computer-hand' src={require(`../img/${computerChoice}.png`)} alt={`${computerChoice}`}></img>
          </div>
        </div>
        
        <div className='button-div'>
          {choices.map((choice, index) =>
            <button className='button' key={index} onClick={() => handleClick(choice)} disabled={gameOver}>
              {choice} 
            </button>
          )}
        </div>
        
        <div className='result'>
          <h1>Turn Result: {turnResult}</h1>
          <h1>Final Result: {result}</h1>
        </div>
        
        <div className='button-div'>
          {gameOver && 
            <button className='button' onClick={() => reset()}>Restart Game?</button>
          }
        </div>
        <div>
        <h2>Rate this Game</h2>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} selected={i <= rating} onClick={() => setRating(i)} />
        ))}
        <br></br>
        <Button onClick={HandleRating}>Submit</Button>
      </div>
      </div>
    )
}
 
export default RPSGame;