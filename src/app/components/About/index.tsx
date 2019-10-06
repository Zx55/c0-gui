import React from 'react';
import { ipcRenderer } from 'electron';
import { configContainer } from '../../containers';

import Markdown from 'react-markdown';
import Icon from 'antd/lib/icon';

import about from './content';


export default () => {
    const { locale } = configContainer.useContainer();

    return (
        <div>
            <div
                style={{
                    padding: '0 4%',
                    paddingTop: '30%',
                }}
            >
                <Markdown
                    source={
                        locale === 'zh' ? about['zh'] : about['en']
                    }
                />
            </div>
            <div
                style={{
                    textAlign: 'center',
                    fontSize: '200%',
                }}
            >
                <Icon
                    type='github'
                    onClick={
                        () => ipcRenderer.send('open-repo')
                    }
                />
            </div>
        </div>
    );
};
