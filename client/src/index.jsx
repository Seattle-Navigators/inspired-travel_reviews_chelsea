import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const url = new URL(window.location.href);
const path = url.pathname;
const idSearch = /(\d{3})/;
const [attractionId] = path.match(idSearch);

ReactDOM.render(<App attractionId={attractionId} />, document.getElementById('app'));
