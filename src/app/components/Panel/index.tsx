import * as React from 'react';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { loadingContainer } from '../../containers';

import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import FileNameBar from './FileNameBar';
import QueueAnim from 'rc-queue-anim';

import './Panel.css';


// TODO: add progress bar, see https://ant.design/components/progress-cn/

export default () => {
    const { loading, changeLoading } = loadingContainer.useContainer();
    const [fileName, setFileName] = React.useState('');

    React.useEffect(() => {
        const listener = (event: IpcRendererEvent, arg: any) => {
            setFileName(arg as string);
            message.destroy();
            message.success('文件添加成功');
        };

        ipcRenderer.on('after-open-file-chooser', listener);

        return () => ipcRenderer.removeListener('after-open-file-chooser', listener);
    }, []);

    React.useEffect(() => {
        const listener = (event: IpcRendererEvent, arg: any) => {
            if (loading) {
                changeLoading(false);
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
            ipcRenderer.send('read-file', fileName);
        }
    };

    const onCancel = () => {
        // Todo: stop compiling, set cc: Compiler = null; or cc.stop()
        changeLoading(false);
    };

    React.useEffect(() => console.log(loading), [loading]);

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
                    marginTop: 96,
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
                    type='primary'
                    loading={loading}
                    onClick={onCompile}
                    style={{
                        width: '25%',
                        marginTop: 60,
                    }}
                >
                    编译
                </Button>
            </div>
            {
                loading &&
                <div key='cancel-button'>
                    <Button
                        type='danger'
                        onClick={onCancel}
                        style={{
                            width: '25%',
                            marginTop: 10,
                        }}
                    >
                        停止
                    </Button>
                </div>
            }
        </QueueAnim>
    );
};
