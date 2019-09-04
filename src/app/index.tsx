import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components';


const startApp = () => {
    ReactDOM.render(<App name='Typescript' />, document.getElementById('root'));
};

startApp();
