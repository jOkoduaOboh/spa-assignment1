var boards = []
var keyboard1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
var keyboard2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
var keyboard3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

for (i = 0; i < 30; i++) {
    const letter = (i % 5);
    const word = parseInt(i / 5, 10);
    var boardID = word + '.' + letter
    boards[boardID] = {
        "wordPos": word,
        "letterPos": letter,
        "letter": ""
    }
}


var header =
    React.createElement("div",
        { className: "header" },
        React.createElement("h2",
            { id: "titleHeader" },
            "Wordle"
        ),
        React.createElement("div",
            { className: "header side" },
            ""
        ),
        React.createElement("div",
            { className: "header middle" },
            React.createElement("div",
                { id: "answer" },
                ""
            )
        ),
        React.createElement("div",
            { className: "header side" },
            React.createElement("button",
                { id: "debug" },
                "Debug Mode"
            )
        )
    )

var player_stats =
    React.createElement("div",
        { className: "column side" },
        React.createElement("div",
            { className: "player info" },
            React.createElement("strong",
                null,
                "Guess"
            ),
            React.createElement("div",
                { id: "notification" },
                "Your Turn"
            ),
        ),
        React.createElement("div",
            { className: "playerStats" },
            React.createElement("strong",
                null,
                "Player Stats:"
            ),
            React.createElement("div",
                { id: "playerStats" },
                ""
            ),
        )
    )

function letter_board({ boardID }) {
    return React.createElement("div",
        {
            id: `b-${boardID}`,
            className: "board",
        },
        React.createElement("input",
            {
                type: "text",
                id: boardID,
                className: "wordLetter",
                name: "username",
                maxLength: "1",
                autoComplete: "off"
            },
            null
        ),
    )
}

function key_board({ boardVal }) {
    return React.createElement("div",
        {
            id: boardVal,
            className: "keyboard",
        },
        React.createElement("input",
            {
                type: "text",
                id: boardVal,
                className: "keyLetter",
                name: "username",
                value: boardVal,
                maxLength: "1",
                autoComplete: "off",
                readOnly: true
            },
            null
        ),
    )
}

var on_screen_board =
    React.createElement("div",
        { className: "column side2" },
        React.createElement("div",
            { className: "boardwrapper" },
            keyboard1.map(keyVal => {
                return React.createElement(
                    key_board,
                    {
                        boardVal: keyVal,
                        key: keyVal
                    },
                    null
                )
            }),
        ),
        React.createElement("div",
            { className: "boardwrapper" },
            keyboard2.map(keyVal => {
                return React.createElement(
                    key_board,
                    {
                        boardVal: keyVal,
                        key: keyVal
                    },
                    null
                )
            }),
        ),
        React.createElement("div",
            { className: "boardwrapper" },
            keyboard3.map(keyVal => {
                return React.createElement(
                    key_board,
                    {
                        boardVal: keyVal,
                        key: keyVal
                    },
                    null
                )
            }),
        )
    )

var wordle_board =
    React.createElement("div",
        { className: "column middle" },
        React.createElement("div",
            { id: "boards" },
            Object.keys(boards).map(board => {
                return React.createElement(letter_board,
                    {
                        boardID: board,
                        key: board
                    },
                    null
                )
            })
        ),
    )

var complete =
    React.createElement("div",
        null,
        header,
        player_stats,
        wordle_board,
        on_screen_board
    )

document.addEventListener('DOMContentLoaded', function () {
    var wordleapp = document.getElementById("wordleapp");
    ReactDOM.render(complete, wordleapp);
    //ReactDOM.render(wordle_board, wordleapp);
});

