import { useState } from "react";
import { getMaxGuessVal, getMinGuessVal, getNumOfGuesses } from "../components/SettingValues";
import { updateGuessTendency, updateGuessesPerWin, updateTotalGuesses, updateWins } from "../components/Stat";
import styled from "@emotion/styled";

const Home = () => {
    const [firstRender, setFirstRender] = useState(true)
    const [guessesLeft, setGuessesLeft] = useState(getNumOfGuesses());

    const [valueToGuess, setValueToGuess] = useState(0);

    const [closestLowerGuess, setClosestLowerGuess] = useState(getMinGuessVal());
    const [closestHigherGuess, setClosestHigherGuess] = useState(getMaxGuessVal());

    const [notified, setNotified] = useState(true)
    const [gameOver, setGameOver] = useState(false);
    const [resultdisplay, setResultDisplay] = useState(false);
    const [isDebug, setIsDebug] = useState(false);

    const [notificationMsg, setNotificationMsg] = useState("Too High");
    const [resultMsg, setResultMsg] = useState("Too High");

    if (firstRender) {
        setFirstRender(false)
        setValueToGuess(Math.floor(Math.random() * (getMaxGuessVal() - getMinGuessVal() + 1)) + getMinGuessVal());
    }

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            const guessedVal = Number(e.target.value)
            console.log('Guessed Val: ', guessedVal)
            setGuessesLeft(guessesLeft - 1);

            if (guessedVal === valueToGuess) {
                setResultMsg("You Win!");
                setResultDisplay(true)
                updateWins()
                updateTotalGuesses(getNumOfGuesses() - (guessesLeft - 1))
                updateGuessesPerWin()
                e.target.disabled = true;
                setGameOver(true);
            } else if (guessesLeft > 0) {
                if (guessedVal > valueToGuess) {
                    updateGuessTendency(1);
                    if (guessedVal < closestHigherGuess)
                        setClosestHigherGuess(guessedVal)
                    console.log("Too High")
                    setNotificationMsg("Too High");
                }
                else {
                    updateGuessTendency(-1);
                    if (guessedVal > closestLowerGuess)
                        setClosestLowerGuess(guessedVal)
                    console.log("Too Low")
                    setNotificationMsg("Too Low");
                }
                e.target.value = "";
                setNotified(false)

                setTimeout(() => {
                    setNotified(true)
                }, 1500);
            }
            if (guessesLeft === 1 && gameOver == false) {
                updateTotalGuesses(getNumOfGuesses() - (guessesLeft - 1))
                updateGuessesPerWin()
                e.target.disabled = true;
                setResultMsg("You Lose!");
                setResultDisplay(true)
                setGameOver(true)
            }
        }
    }

    const handlePlayAgain = () => {
        setGuessesLeft(getNumOfGuesses())
        setClosestHigherGuess(getMaxGuessVal())
        setClosestLowerGuess(getMinGuessVal())
        setValueToGuess(Math.floor(Math.random() * (getMaxGuessVal() - getMinGuessVal() + 1)) + getMinGuessVal());
        setResultDisplay(false)
        setGameOver(false)
        document.getElementById("numInput").value = "";
        document.getElementById("numInput").disabled = false;
        console.log("Play again")
    }

    const handleDebug = () => {
        setIsDebug(!isDebug);
    }

    const Space = styled.span`
        display:inline-block; 
        width: 6vw;
    `

    const Arrow = styled.h1`
        margin: 0;
        display:inline-block; 
    `
    const Range = styled.h2`
    margin: 0;
    display:inline-block; 
    font-weight:normal;
    `

    return (
        <div>
            <button onClick={handleDebug}>Debug</button>
            {isDebug === true &&
                <div>Number to guess: {valueToGuess}</div>}

            <div>
                <p></p>
                <strong>Guess the Number</strong>
            </div>
            <div>Guesses Left: {guessesLeft}
                <p></p>
            </div>

            <input id="numInput" type="number" onKeyUp={handleKeyUp} />

            <div>
                <Range> {closestLowerGuess} </Range> &nbsp; <Arrow> &#8594; </Arrow>
                <Space /> <Range><strong>Between</strong></Range> <Space />
                <Arrow> &#8592; </Arrow> &nbsp; <Range> {closestHigherGuess} </Range>
                <div></div>
            </div>

            {notified === false &&
                <div>{notificationMsg}</div>}
            {resultdisplay === true &&
                <div>{resultMsg}</div>}
            {gameOver === true && <>
                <button onClick={handlePlayAgain}>Play Again</button>
            </>}
        </div>
    )
}

export default Home;