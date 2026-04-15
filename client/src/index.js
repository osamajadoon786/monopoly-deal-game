import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers'; // Make sure to create your reducers

// Create Redux store
const store = createStore(rootReducer);

// Entry point for React application
ReactDOM.render(
  <Provider store={store}>
    <h1>Welcome to Monopoly Deal Game</h1>
  </Provider>,
  document.getElementById('root')
);