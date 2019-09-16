import React from 'react';
import ReactDOM from 'react-dom';

import App from './components';


const startApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
};

startApp();
