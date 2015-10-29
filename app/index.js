import OnePiece from 'one-piece';
import React    from 'react';
import ReactDOM from 'react-dom';
import App      from './OnePiece';

// set OnePiece as Global variable
window.OnePiece = OnePiece;

// Start React
ReactDOM.render(<App />, document.getElementById('root'));
