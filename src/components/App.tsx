import * as React from 'react';
import './App.css';


export interface AppProps {
    name: string;
};

export default (props: AppProps) => {
    return (
        <div>
            <div className='greeting'>
                Hello {props.name}
            </div>
        </div>
    );
};
