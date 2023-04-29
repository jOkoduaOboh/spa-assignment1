let minGuessVal = 1
let maxGuessVal = 100
let numOfGuesses = 5

const getNumOfGuesses = () => {
    return numOfGuesses
}

const getMaxGuessVal = () => {
    return maxGuessVal
}

const getMinGuessVal = () => {
    return minGuessVal
}

const setNumOfGuesses = (value) => {
    numOfGuesses = value
}

const setMaxGuessVal = (value) => {
    maxGuessVal = value
}

const setMinGuessVal = (value) => {
    minGuessVal = value
}

export {getMaxGuessVal, getMinGuessVal, getNumOfGuesses, setMaxGuessVal, setMinGuessVal, setNumOfGuesses}