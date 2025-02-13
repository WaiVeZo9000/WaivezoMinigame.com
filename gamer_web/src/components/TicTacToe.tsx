import { Button } from "reactstrap";
import '../stylesheet/TicTacToe.css';
import { useState } from "react";
import Star from "./Star";
import { UrlSubmittion } from "../endpoint";
import axios from "axios";

const cross_icon = require("../img/cross.png");
const circle_icon = require("../img/circle.png");
const GameId = 3;

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    const [count, setCount] = useState<number>(0);
    const [lock, setLock] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>("Tic Tac Toe Game");
    const [rating, setRating] = useState<number>(0);
    const [countRating, setCountRating] = useState<number>(0);

    const toggle = (e: any, num: number) => {
        if (lock || data[num] !== "") {
            return;
        }

        if (count % 2 === 0) {
            e.target.innerHTML = `<img src=${cross_icon} className="icon cross">`;
            data[num] = "x";
        } else {
            e.target.innerHTML = `<img src=${circle_icon} className="icon circle">`;
            data[num] = "o";
        }
        setCount(count + 1);
        CheckWin();
    }

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

    const CheckWin = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                Won(data[a]);
                return;
            }
        }

        if (count === 8) {
            setWinner("It's a draw!");
            setLock(true);
        }
    }

    const Won = (winner: string) => {
        setLock(true);
        setWinner(`${winner.toUpperCase()} wins`);
    }

    const resetGame = () => {
        data = ["", "", "", "", "", "", "", "", ""];
        setCount(0);
        setLock(false);
        setWinner("Tic Tac Toe Game");
        const boxes = document.querySelectorAll('.boxes');
        boxes.forEach(box => box.innerHTML = '');
    }

    return (
        <div className="container dark-theme">
            <h2 className="title">{winner}</h2>
            <div className="board">
                <div className="box">
                    <div className="row">
                        <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
                        <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
                        <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
                    </div>
                    <div className="row">
                        <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
                        <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
                        <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
                    </div>
                    <div className="row">
                        <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
                        <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
                        <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
                    </div>
                </div>
            </div>
            <Button onClick={resetGame} color="secondary">Reset</Button>
            <div>
            <h2>Rate this Game</h2>
            {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} selected={i <= rating} onClick={() => setRating(i)} />
            ))}
            <br></br>
            <Button onClick={HandleRating}>Submit</Button>
        </div>
        </div>
    );
}

export default TicTacToe;
