import './style.css';
import App from './components/App.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

// testing css loader
const element = document.createElement('div');
element.innerHTML = 'Hi';
document.body.appendChild(element);

// testing a component
ReactDOM.render(<App />, document.getElementById('app'));
