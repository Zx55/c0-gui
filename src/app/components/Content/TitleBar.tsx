import React from 'react';
import { ipcRenderer } from 'electron';
import { useIntl } from 'react-intl';

import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';


export default () => {
    const intl = useIntl();

    return (
        <div
            className='title-bar'
            style={{
                position: 'fixed',
                top: 0,
                left: '22.8%',
                height: '7%',
                width: '100%',
            }}
        >
            <div
                className='drag-region'
                style={{
                    float: 'left',
                    height: '100%',
                    width: '69%',
                }}
            />
            <div
                className='title-button'
                style={{
                    float: 'left',
                    height: '100%',
                    width: '6%',
                }}
            >
                <Tooltip
                    placement='bottom'
                    title={intl.formatMessage({
                        id: 'titleBar.minimize'
                    })}
                >
                    <Icon
                        className='minimize-button'
                        type='minus'
                        style={{
                            margin: '35% 30% 0 0',
                        }}
                        onClick={() => ipcRenderer.send('minimize')}
                    />
                </Tooltip>
                <Tooltip
                    placement='bottom'
                    title={intl.formatMessage({
                        id: 'titleBar.close'
                    })}
                >
                    <Icon
                        className='close-button'
                        type='close'
                        onClick={() => ipcRenderer.send('exit')}
                    />
                </Tooltip>
            </div>
        </div>
    );
};
