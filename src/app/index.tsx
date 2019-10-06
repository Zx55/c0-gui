import React from 'react';
import ReactDOM from 'react-dom';

import App from './components';
import { localeContainer } from './containers';


const startApp = () => {
    ReactDOM.render(
        <localeContainer.Provider>
            <App />
        </localeContainer.Provider>,
        document.getElementById('root')
    );
};

startApp();
