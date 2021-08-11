import React from 'react';
import GameBoard from './GameBoard';

const Table = (props) => {
    return (
        <div id="game-table">
            <h1>Noughts and Crosses</h1>

            <GameBoard />
            
            <button id="reset-btn" type="button">New Game</button>
        </div>
    );
}

export default Table;