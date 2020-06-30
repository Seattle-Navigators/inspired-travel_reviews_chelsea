import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import getAttractionId from './urlParser';

const attractionId = getAttractionId(window.location.href);

ReactDOM.render(<App attractionId={attractionId} />, document.getElementById('reviews'));
