// Import prompt sync to ask for player input
const prompt = require('prompt-sync')()

// -------------------------- Player ----------------------------------
// Current player
let currentPlayer = 'X'

// Winner of the game
let winner = null

// Switch the current player after each play
function switchPlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O'
    } else if (currentPlayer === 'O') {
        currentPlayer = 'X'
    }
}


// -------------------------- Board ----------------------------------
// Initialize the board
const board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' ',
}

// Get empty positions from the game board
function getEmptyPositions() {
    const boardEntries = Object.entries(board)
    const emptyEntries = boardEntries.filter(([_, marker]) => marker === '  ')
    const emptyPositions = emptyEntries.map(([position]) => position)

    return emptyPositions
}

// Validate the position input from player
function validatePosition(position) {
    if (position < 1 || position > 9 ) return false
    if (board[position] !== ' ') return false

    return true
}

// Display the game board
function displayBoard() {
    console.log(`
    ${board[1]} | ${board[2]} | ${board[3]}
    ----------
    ${board[4]} | ${board[5]} | ${board[6]}
    ----------
    ${board[7]} | ${board[8]} | ${board[9]}
    `)
}

// Mark the board with the current player's marker
function markBoard(boardPosition) {
    const position = parseInt(boardPosition)

    const isValidPosition = validatePosition(position)

    if(!isValidPosition) return console.log('Inavlid position')

    board[position] = currentPlayer
    switchPlayer()

    return true
}

// Check if there is a winner
function checkWin() {
    const winCombos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ]

    for (const combo of winCombos) {
        const [a, b, c] = combo

        if(board[a] !== ' ' && board[a] === board[b] && board[b] === board[c]) {
            winner = board[a]
            return true
        }
    }
    
    return false
}

// Check if there is a tie
function checkTie() {
    const hasWinner = checkWin()
    if (hasWinner) return false

    const emptyPositions = getEmptyPositions()
    if (emptyPositions.length > 0) return false

    return true
}


// -------------------------- Game ----------------------------------
// Play: Start the game if play is true, else stop the game
let isPlaying = false

// Ask the player if they want to play
function askToPlay() {
    const possibleResponses = ['y', 'n', 'Y', 'N']
    const playerResponse = prompt('Would you like to play the? (y/n) ')

    const validResponse = possibleResponses.includes(playerResponse)

    if (!validResponse) return askToPlay()

    isPlaying = ['y', 'Y'].includes(playerResponse)
}


// Start the game
function startGame() {
    askToPlay()

    if (!isPlaying) return

    displayBoard()

    while (isPlaying) {
        console.log(`It's ${currentPlayer}'s turn`)
        const position = prompt('Please choose 1 - 9 to place your marker: ')

        markBoard(position)
        displayBoard()

        const hasWinner = checkWin()
        if (hasWinner) {
            console.log(`${winner} has won!`)
            isPlaying = false
        }

/*         const isTie = checkTie()
        if (isTie) {
            console.log('It is a tie!')
            isPlaying = false
        } */
    }
}

startGame()