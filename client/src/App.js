import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Adjust the URL as needed

function App() {
    useEffect(() => {
        // Listen for events from the server
        socket.on('message', (message) => {
            console.log('New message:', message);
        });

        // Clean up the effect
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Monopoly Deal Game</h1>
            {/* Add your game components and logic here */}
        </div>
    );
}

export default App;