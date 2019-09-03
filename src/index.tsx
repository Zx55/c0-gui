import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';


const startApp = () => {
    ReactDOM.render(<App name='Typescript' />, document.getElementById('root'));
};

startApp();
