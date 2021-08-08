// Set up a 2D array to hold the board
let board = [[``,``,``],[``,``,``],[``,``,``]]
// A flag to indicate whether or not you can click on the board
let activeGame = true;
// A counter keeping track of turn #, increments after a player picks a square
let turnNumber = 0;
// Keep tracking of over all score
let xScore = 0;
let oScore = 0;

//parameter n represents the square number, starting from top left numbered 0-8
function toggle(n) {
    //make sure a game is going on
    if(activeGame) {
        // Math.floor of n divided by 3 gets the row number
        let r = Math.floor(n/3);
        // n mod 3 gets the column number
        let c = n % 3;
        // get the current player
        let currTurn = document.getElementById("current");
        
        // make sure the space isnt already occupied
        if(!board[r][c]) {
            // mark the space with the current players symbol
            board[r][c] = currTurn.innerHTML;

            // update array representing current state of game board
            document.getElementById(`sqr${n}`).innerHTML = currTurn.innerHTML;
            // adds a class to the table element to give it some styling
            document.getElementById(`sqr${n}`).classList.add(currTurn.innerHTML);

            // clear the alert banner just in case
            document.getElementById("alert-banner").innerHTML = ""; 

            //if no one won, set board ready for next player
            if(!checkWin()) {
                if(currTurn.innerHTML === "X") {
                    currTurn.innerHTML = "O";
                    currTurn.classList = "O";
                } else {
                    currTurn.innerHTML = "X";
                    currTurn.classList = "X";
                }
                //increment turn number
                turnNumber++;
            }
            // check to see there are any valid moves lefts
            if(turnNumber === 9) {
                // if not, end game
                draws();
            }
        // if space was taken tell player to choose another square
        } else {
            document.getElementById("alert-banner").innerHTML = "Space already taken!";
        }
    }
}

// function to see if every element on a row is equl
function rowEqual(arr) {
    let result = false;
    for (let i = 0; i < board.length; i++) {
        result = (arr[0] === arr[1]) && (arr[1] === arr[2]) && (!!arr[i]);
    }
    return result;
}

// function to check if every element in a column is equal
function colEqual(c) {
    let result = false;
    for(let r = 0; r < board[c].length; r++) {
        result = (board[0][c] === board[1][c]) && (board[1][c] === board[2][c]) && (!!board[r][c]);
    }
    return result;
}

// function to check the diagonals for equality
function dagEqual() {
    let result = ((board[0][0] === board[1][1]) && (board[1][1] === board[2][2])) || ((board[2][0] === board[1][1]) && (board[1][1] === board[0][2]));
    return result && (!!board[1][1]);
}

// checks the win conditions
function checkWin() {
    let resultAcross = false;
    //loop checks the three rows and three columns, the diagonals just get manually checked everytime
    for (let i = 0; i < 3; i++) {
        if(rowEqual(board[i]) || colEqual(i) || dagEqual()) {
            wins();
            return true;            
        }
    }
    return false;
}

//displays a win banner and makes the reset button appear
function wins() {
    let curr = document.getElementById("current");
    document.getElementById("alert-banner").innerHTML = curr.innerHTML + " WINS!";
    document.getElementById("reset-btn").style.display = "inline-block";
    //updates the score counter for whoever won
    if(curr.innerHTML === "X") {
        document.getElementById("xScore").innerHTML = ++xScore;
    } else {
        document.getElementById("oScore").innerHTML = ++oScore;
    }
    activeGame = false;
}

//displays a draw message and make the reset button appear
function draws() {
    document.getElementById("alert-banner").innerHTML = "IT'S A DRAW!";
    document.getElementById("reset-btn").style.display = "inline-block";
    activeGame = false;
}

// resets for next game
function resetIt() {
    // get variables back to their orignal state
    board = [[``,``,``],[``,``,``],[``,``,``]];
    activeGame = true;
    turnNumber = 0;

    // clear the game board, and strip the classing that was done
    for(let n = 0; n < 9; n++) {
        document.getElementById(`sqr${n}`).innerHTML = "";
        document.getElementById(`sqr${n}`).classList.remove("X", "O");
    }
    // reset the alert banner and hide the reset button
    document.getElementById("alert-banner").innerHTML = "";
    document.getElementById("reset-btn").style.display = "none";
}