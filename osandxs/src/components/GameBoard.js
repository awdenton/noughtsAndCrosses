import React, { Fragment, useState } from 'react';
import _ from 'lodash';

const GameBoard = (props) => {

    const [board, setBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const [player, setPlayer] = useState('X');
    const [message, setMessage] = useState('');

    function toggle(n) {
        console.log("click");
        const r = Math.floor(n / 3);
        const c = n % 3;


        if (!board[r][c]) {
            let boardUpdate = board.slice();
            boardUpdate[r][c] = player;
            setBoard(boardUpdate);
            (player === 'X') ? setPlayer('O') : setPlayer('X');
            setMessage('');
            checkWin();
        } else {
            setMessage('Square already occupied, choose again!');
        }
    }

    function checkWin() {
        _.forEach(board, (row) => {
            let result = (row[0] === row[1]) && (row[1] === row[2]) && (row[1])
            console.log(result)
        });
    }

    return (
        <Fragment>
            <h2>Current Player: {player}</h2>
            <table id="game-board">
                <tbody>
                    <tr>
                        <td className="top left" onClick={() => toggle(0)}>{board[0][0]}</td>
                        <td className="top" onClick={() => toggle(1)}>{board[0][1]}</td>
                        <td className="top right" onClick={() => toggle(2)}>{board[0][2]}</td>
                    </tr>
                    <tr>
                        <td className="left" onClick={() => toggle(3)}>{board[1][0]}</td>
                        <td className="" onClick={() => toggle(4)}>{board[1][1]}</td>
                        <td className="right" onClick={() => toggle(5)}>{board[1][2]}</td>
                    </tr>
                    <tr>
                        <td className="bottom left" onClick={() => toggle(6)}>{board[2][0]}</td>
                        <td className="bottom" onClick={() => toggle(7)}>{board[2][1]}</td>
                        <td className="bottom right" onClick={() => toggle(8)}>{board[2][2]}</td>
                    </tr>
                </tbody>
            </table>
            <div id="message-area">
                <h2>{message}</h2>
            </div>
        </Fragment>
    );
}

export default GameBoard;