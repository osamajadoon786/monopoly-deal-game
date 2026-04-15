import React, { useState } from 'react';
import './LobbyScreen.css';

const LobbyScreen = () => {
    const [roomCode, setRoomCode] = useState('');
    const [message, setMessage] = useState('');

    const createRoom = () => {
        // Logic for creating a room
        setMessage(`Room created with code: ${Math.random().toString(36).slice(2, 8)}`);
    };

    const joinRoom = () => {
        // Logic for joining a room
        if (roomCode) {
            setMessage(`Joined room: ${roomCode}`);
        } else {
            setMessage('Please enter a room code.');
        }
    };

    return (
        <div className="lobby-screen">
            <h1>Game Lobby</h1>
            <button onClick={createRoom}>Create Room</button>
            <input 
                type="text" 
                placeholder="Enter Room Code" 
                value={roomCode} 
                onChange={(e) => setRoomCode(e.target.value)} 
            />
            <button onClick={joinRoom}>Join Room</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LobbyScreen;