import * as React from 'react';

import Button from 'antd/es/button';

import './App.css';
import { ipcRenderer } from 'electron';

export interface AppProps {
    name: string;
};

export default (props: AppProps) => {
    const handleClick = () => {
        ipcRenderer.send('test');
    };

    return (
        <div>
            <div className='greeting'>
                Hello {props.name}
            </div>
            <Button onClick={handleClick}>111</Button>
        </div>
    );
};
