import React from 'react';
import ReactDOM from 'react-dom';

import App from './components';
import { configContainer } from './containers';


const startApp = () => {
    ReactDOM.render(
        <configContainer.Provider>
            <App />
        </configContainer.Provider>,
        document.getElementById('root')
    );
};

startApp();
