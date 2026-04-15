import { createStore } from 'redux';

// Define initial state
const initialState = {
    players: [],
    currentTurn: 0,
    gameDeck: [],
    gameInProgress: false,
};

// Define reducer
const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PLAYER':
            return { ...state, players: [...state.players, action.payload] };
        case 'NEXT_TURN':
            return { ...state, currentTurn: (state.currentTurn + 1) % state.players.length };
        case 'START_GAME':
            return { ...state, gameInProgress: true };
        case 'END_GAME':
            return { ...state, gameInProgress: false };
        // Add more cases as needed
        default:
            return state;
    }
};

// Create store
const store = createStore(gameReducer);

export default store;