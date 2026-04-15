import React from 'react';
import './GameBoard.css';

const GameBoard = ({ players }) => {
    return (
        <div className="game-board">
            <h1>Monopoly Deal Game</h1>
            <div className="players-info">
                {players.map((player, index) => (
                    <div key={index} className="player">
                        <h2>{player.name}</h2>
                        <p>Cards: {player.cards.length}</p>
                        <p>Money: ${player.money}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameBoard;