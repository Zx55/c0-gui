import React, { useState, useEffect } from 'react';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { loadingContainer } from '../../containers';

import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Progress from 'antd/lib/progress';
import message from 'antd/lib/message';
import FileNameBar from './FileNameBar';
import QueueAnim from 'rc-queue-anim';

import './Panel.css';

// TODO: add progress bar, see https://ant.design/components/progress-cn/

export default () => {
    const { loading, changeLoading } = loadingContainer.useContainer();
    const [fileName, setFileName] = useState('');
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const listener = (event: IpcRendererEvent, fileName: string) => {
            setFileName(fileName);
            message.destroy();
            message.success('文件添加成功');
        };

        ipcRenderer.on('after-open-file-chooser', listener);

        return () => ipcRenderer.removeListener('after-open-file-chooser', listener);
    }, []);

    useEffect(() => {
        const listener = (event: IpcRendererEvent, state: boolean, value: string) => {
            if (!loading) {
                return;
            }

            if (state) {
                // Fixme: see #2
                const timer = setInterval(() => setPercent(percent => percent + 1), 100);
                setTimeout(() => {
                    console.log('compile success');
                    changeLoading(false);
                    clearInterval(timer);
                }, 10300);
            } else {
                message.destroy();
                message.error(value);
            }
        };

        ipcRenderer.on('after-read-file', listener);

        return () => ipcRenderer.removeListener('after-read-file', listener);
    }, [loading]);

    const onDelete = () => {
        if (!loading) {
            setFileName('');
        }
    };

    const onCompile = () => {
        if (fileName === '') {
            message.destroy();
            message.error('请先添加文件');
        } else {
            changeLoading(true);
            setPercent(0);
            ipcRenderer.send('read-file', fileName);
        }
    };

    const onCancel = () => {
        // Todo: stop compiling, set cc: Compiler = null; or cc.stop()
        changeLoading(false);
    };

    return (
        <QueueAnim
            type='alpha'
            component='div'
            style={{
                textAlign: 'center',
            }}
            duration={600}
            ease={['easeOutQuart', 'easeInOutQuart']}
        >
            <Button
                className='upload-button'
                type='dashed'
                style={{
                    marginTop: 112,
                    width: 120,
                    height: 120,
                }}
                onClick={() => ipcRenderer.send('open-file-chooser')}
                disabled={loading}
                key='upload-button'
            >
                <Icon
                    type='plus'
                    style={{
                        fontSize: 36,
                    }}
                />
            </Button>
            <FileNameBar
                fileName={fileName}
                onDelete={onDelete}
                key='filename-bar'
            />
            <div key='compile-button'>
                <Button
                    type={loading ? 'danger' : 'primary'}
                    onClick={loading ? onCancel : onCompile}
                    style={{
                        width: '25%',
                        marginTop: 45,
                    }}
                >
                    {loading ? '停止' : '编译'}
                </Button>
            </div>
            {
                loading &&
                <div
                    key='progress-bar'
                    style={{
                        margin: '0 auto',
                        paddingTop: 16,
                        width: '60%',
                    }}
                >
                    <Progress percent={percent} />
                </div>
            }
        </QueueAnim>
    );
};
