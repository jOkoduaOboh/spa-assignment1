import styled from "@emotion/styled"

let statVals = {
    wins: 0,
    totalGuesses: 0,
    guessesPerWin: 0,
    guessTendency: 0
}

const getWins = () => {
    return statVals.wins
}

const getTotalGuesses = () => {
    return statVals.totalGuesses
}

const getGuessesPerWin = () => {
    return statVals.guessesPerWin
}

const getGuessTendency = () => {
    // returns higher numbers
    if(statVals.guessTendency > 0)
        return 'Higher Numbers'

    // returns balanced
    if(statVals.guessTendency === 0)
        return 'Balanced Numbers'

    // returns lower numbers
    return 'Lower Numbers'
}

const updateWins = () => {
    statVals.wins += 1;
}

const updateTotalGuesses = (val) => {
    statVals.totalGuesses += val;
}

const updateGuessesPerWin = () => {
    statVals.guessesPerWin = Math.floor(statVals.totalGuesses / statVals.wins)
}

const updateGuessTendency = (val) => {
    if (val === 1)
        statVals.guessTendency += 1;
    else if (val === -1)
        statVals.guessTendency -= 1; 
}

export default function Stat({ title, value }) {

    const BoxDiv = styled.div`
        @media (min-width: 700px){
            float: left;
            padding: 4% 3vw;
            font-size: 2.7vw;
        }
        display: block;
        font-size: 6vw;
    `;

    return (
        <BoxDiv>
            <div>
                <strong> {title} </strong>
            </div>
            <div>
                {value}
            </div>
        </BoxDiv>
    );
}

export { getGuessesPerWin, getTotalGuesses, getWins, getGuessTendency, updateGuessesPerWin, updateTotalGuesses, updateWins, updateGuessTendency }