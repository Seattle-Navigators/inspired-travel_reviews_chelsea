import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const getAttractionId = (ref) => {
    const url = new URL(ref);
    const path = url.pathname;
    const idSearch = /(\d{3})/;
    const [attractionId] = path.match(idSearch);
    return attractionId;
};

const attractionId = getAttractionId(window.location.href);

ReactDOM.render(<App attractionId={attractionId} />, document.getElementById('app'));