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
            // update array representing current state of game board
            board[r][c] = currTurn.innerHTML;
            
            // mark the space with the current players symbol
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
                // check to see there are any valid moves lefts
                if(turnNumber === 9) {
                    // if not, end game
                    draws();
                }
            }
        // if space was taken tell player to choose another square
        } else {
            document.getElementById("alert-banner").innerHTML = "Space already taken!";
        }
    }
}

//checks the x/y axes to see if a player has won
function xyEqual(n) {
    // initially check to see if all items in row/col equal eachother
    let xResult = (board[n][0] === board[n][1]) && (board[n][1] === board[n][2]);
    let yResult = (board[0][n] === board[1][n]) && (board[1][n] === board[2][n]);
    // the big trick here is making sure the fields are populated. a row/col that is empty is technically
    // all equal to itself, so the !!board[a][b] flips it to false if the square has not been marked yet
    for(let i = 0; i < 3; i++) {
        // check horizontal
        xResult = xResult && (!!board[n][i]);
        // check vertical
        yResult = yResult && (!!board[i][n]);
    }
    // if either is true, will return true
    return xResult || yResult;
}

// function to check the diagonals for equality
function dagEqual() {
    // not a great way to iterate over this, so i just manually check the two diagonals for equality
    let result = ((board[0][0] === board[1][1]) && (board[1][1] === board[2][2])) || ((board[2][0] === board[1][1]) && (board[1][1] === board[0][2]));
    // if everything equals each other and the center sqaure is occupied, you win baby!
    return result && (!!board[1][1]);
}

// checks the win conditions
function checkWin() {
    // check the diagonals first
    if(dagEqual()){
        wins();
        return true;
    }
    //loop then checks the rows and cols for potential wins
    for (let i = 0; i < 3; i++) {
        if(xyEqual(i)) {
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