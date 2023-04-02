//Board Generation
var board = []

//Holds information on all ships
var game = {
    guessesMade: 0,
    isActive: true,
    word: "",
    guess: ["", "", "", "", ""],
    guessedWord: ""
}

var stats = {
    wins: 0,
    losses: 0,
    guessesRequired: [0, 0, 0, 0, 0, 0]
}

const generateBoard = () => {
    for (i = 0; i < 30; i++) {
        const letter = (i % 5);
        const word = parseInt(i / 5, 10);
        var boardID = word + '.' + letter
        board[boardID] = {
            "wordPos": word,
            "letterPos": letter,
            "letter": ""
        }
        document.getElementById('boards').innerHTML +=
            `<div class="board" id="b-${boardID}">
            <input type="text" id="${boardID}" class="wordLetter" name="username" maxlength="1" autocomplete="off">
         </div>`
    }
}

// Actions when dom is loaded
document.addEventListener('DOMContentLoaded', function () {
    generateBoard();

    //Event listeners for each letter entered
    document.querySelectorAll('.wordLetter').forEach(
        board => {
            board.onkeyup = (e) => {
                processKey(e, board.id)
            }
        }
    )

    document.querySelectorAll('.wordLetter').forEach(
        board => {
            board.ontouchend = (e) => {
                processTouch(e, board.id)
            }
        }
    )

    //Event listener to reset the game
    document.getElementById("restart").onclick = () => { newGame() }
    document.getElementById("debug").onclick = () => { debugMode() }

    newGame();

});


//Retrieves word for user to guess
const getWord = async () => {
    //const url = "https://random-words5.p.rapidapi.com/getMultipleRandom?count=1&wordLength=5";
    const url = "https://random-word-api.herokuapp.com/word?length=5"
    // const config = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': 'cc15021543msh4f1f720c4802207p1dee0ejsnea57365bbe43',
    //         'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
    //     }
    // };
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const result = data[0];
            console.log("Word Fetch Res: ", result);
            game.word = result
            return result;
        })
        .catch((error) => {
            console.log(error);
        });
}

const processTouch = async (e, boardID) => {
    document.getElementById("logInfo").innerHTML = e.changedTouches;
}


const processKey = async (e, boardID) => {
    var x = e.keyCode;
    var input = document.getElementById(boardID).value;

    // Alphabet upper case
    if (x >= 65 && x <= 90) {
        if (input != "") {
            const wordPos = board[boardID].wordPos
            const letterPos = board[boardID].letterPos
            console.log("This is: ", input)
            board[boardID].letter = input.toLowerCase();
            game.guess[letterPos] = input.toLowerCase();
            if (letterPos < 4) {
                const nextId = wordPos + '.' + (letterPos + 1)
                document.getElementById(nextId).focus();
            }
        }

    }
    //Backspace pressed
    else if (x == 8) {
        const wordPos = board[boardID].wordPos
        const letterPos = board[boardID].letterPos
        console.log("Letter Position: ", letterPos)
        if (letterPos > 0 && board[boardID].letter == "") {
            const prevId = wordPos + '.' + (letterPos - 1)
            console.log("Previous: ", prevId)
            board[prevId].letter = ""
            document.getElementById(prevId).value = "";
            document.getElementById(prevId).focus();
        }
        board[boardID].letter = ""
        game.guess[letterPos] = ""
        // Alphabet lower case
    }
    // Enter pressed
    else if (x == 13) {
        const wordPos = board[boardID].wordPos
        const letterPos = board[boardID].letterPos
        if (wordPos <= 5 && letterPos == 4) {
            //document.getElementById(letter + '.' + word)

            game.guessedWord = game.guess.join("")
            if (checkEqual(wordPos) == false) {
                checkWord((isValidWord) => {
                    //Valid Word
                    if (isValidWord == true) {
                        game.guessesMade++
                        console.log("It is Valid")
                        if (wordPos < 5) {
                            const nextId = (wordPos + 1) + '.0'
                            for (i = 0; i < 5; i++) {
                                document.getElementById(`${wordPos}.${i}`).setAttribute('readonly', true);
                            }
                            for (i = 0; i < 5; i++) {
                                document.getElementById(`${wordPos + 1}.${i}`).removeAttribute('readonly');
                            }
                            document.getElementById(nextId).focus();
                        }
                        checkMatch(wordPos)
                    } else {
                        //Invalid Word
                        for (i = 0; i < 5; i++) {
                            document.getElementById(`${wordPos}.${i}`).value = "";
                        }
                        document.getElementById(`${wordPos}.0`).focus();
                        document.getElementById("notification").innerHTML = 'Word does not exist </br> Try Again';
                        document.getElementById("notification").style.color = 'rgb(183, 77, 89)';
                        showNotification()

                        console.log("invalid Word")
                    }
                })
            }
        }
        console.log("This is: ", x)
        //checkMatch()
        // Alphabet lower case
    } else {
        if (x != 16)
            document.getElementById(boardID).value = "";
    }
}

async function checkWord(callback) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${game.guessedWord}`
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            var isValid = true
            const result = data[0];
            console.log("Check Word Fetch Res: ", result);
            if (result === undefined)
                isValid = false
            callback(isValid)
        })
        .catch((error) => {
            console.log(error);
        });
}

function checkEqual(wordPos) {
    if (game.guessedWord == game.word) {
        game.guessesMade++
        for (i = 0; i < 5; i++) {
            setCorrect(`${wordPos}.${i}`);
            document.getElementById(`${wordPos + 1}.${i}`).setAttribute('readonly', true);
        }
        processWin()
        return true
    }
    return false
}

function checkMatch(wordPos) {
    if (game.guessedWord == game.word) {
        for (i = 0; i < 5; i++) {
            setCorrect(`${wordPos}.${i}`);
            document.getElementById(`${wordPos + 1}.${i}`).setAttribute('readonly', true);
        }
        processWin()
    } else {
        console.log("Finally Here")
        for (i = 0; i < 5; i++) {
            if (game.word.charAt(i) == game.guess[i]) {
                setCorrect(`${wordPos}.${i}`)
            } else if (game.word.indexOf(game.guess[i]) > -1) {
                setExists(`${wordPos}.${i}`)
            } else {
                setIncorrect(`${wordPos}.${i}`)
            }
        }
        if (wordPos == 5) {
            console.log("Entered Here Too")
            for (i = 0; i < 5; i++) {
                document.getElementById(`${wordPos}.${i}`).setAttribute('readonly', true);
            }
            processLoss()
        }
    }
}

function debugMode() {
    if (document.getElementById("answer").innerHTML == "") {
        document.getElementById("answer").innerHTML = "Word: " + game.word
    } else {
        document.getElementById("answer").innerHTML = ""
    }
}

//Shows Item Added Notification
function showNotification() {
    document.getElementById("notification").style.display = '';
    setTimeout(hideNotification, 2000);
}

//Hides Item Added Notification
function hideNotification() {
    document.getElementById("notification").style.display = 'none';
}

function setIncorrect(element) {
    document.getElementById(element).style.backgroundColor = 'rgb(183, 77, 89)';
}

function setExists(element) {
    document.getElementById(element).style.backgroundColor = 'rgb(191, 191, 80)';
}
function setCorrect(element) {
    document.getElementById(element).style.backgroundColor = 'rgb(104, 176, 123)';
}

//Notifies Players of Win
function processWin() {
    document.getElementById("notification").innerHTML = 'You Win </br> Great Job';
    document.getElementById("notification").style.color = 'rgb(104, 176, 123)';
    document.getElementById("notification").style.display = '';
    document.getElementById("restart").style.display = '';
    stats.wins++
    stats.guessesRequired[game.guessesMade - 1]++
}

function processLoss() {
    document.getElementById("notification").innerHTML = 'You Lose </br> Try Again';
    document.getElementById("notification").style.color = 'rgb(183, 77, 89)';
    document.getElementById("notification").style.display = '';
    document.getElementById("restart").style.display = '';
    stats.losses++
}


function updateStats() {
    document.getElementById("playerStats").innerHTML =
        ` 
    <div>Wins: ${stats.wins}</div>
    <div>Losses: ${stats.losses}</div>
    <div>
        <strong>Guesses Needed:</strong>
        <div>One: ${stats.guessesRequired[0]}</div>
        <div>Two: ${stats.guessesRequired[1]}</div>
        <div>Three: ${stats.guessesRequired[2]}</div>
        <div>Four: ${stats.guessesRequired[3]}</div>
        <div>Five: ${stats.guessesRequired[4]}</div>
        <div>Six: ${stats.guessesRequired[5]}</div>
    </div>
    `;
}


//Resets the game to the beginning state
function newGame() {
    game = {
        guessesMade: 0,
        isActive: true,
        word: "",
        guess: ["", "", "", "", ""],
        guessedWord: ""
    }

    // Hide All Unnecessary Info Elements
    document.getElementById("notification").style.display = 'none';
    document.getElementById("restart").style.display = 'none';

    //Get word to guess
    getWord();

    document.getElementById("answer").innerHTML = "";

    updateStats();

    //Test Check Word
    //checkWord("loca")

    // // Make only the first guess editable
    for (i = 0; i < 5; i++) {
        document.getElementById(`${0}.${i}`).removeAttribute('readonly');
    }

    for (i = 1; i < 6; i++) {
        for (j = 0; j < 5; j++) {
            document.getElementById(`${i}.${j}`).setAttribute('readonly', true);
        }
    }
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 5; j++) {
            document.getElementById(`${i}.${j}`).value = "";
            document.getElementById(`${i}.${j}`).style.backgroundColor = 'white';
        }
    }
}