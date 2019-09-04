import * as React from 'react';
import cx from 'classnames'
import { ipcRenderer } from 'electron';

import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import Tooltip from 'antd/lib/tooltip';

import './Panel.css';

export default () => {
    const [loading, setLoading] = React.useState(false);
    const [fileName, setFileName] = React.useState('');

    React.useEffect(() => {
        ipcRenderer.on('after-open-file-chooser', (event, arg) => {
            setFileName(arg as string);
            message.destroy();
            message.success('文件添加成功');
        });

        ipcRenderer.on('after-read-file', (event, arg) => {
            // Todo: compile the c file.
            setLoading(false);
        });
    }, []);

    const handleDelete = () => {
        if (!loading) {
            setFileName('');
        }
    };

    const handleClick = () => {
        if (fileName === '') {
            message.destroy();
            message.error('请先添加文件');
        } else {
            setLoading(true);
            ipcRenderer.send('read-file', fileName);
        }
    };

    return (
        <div
            style={{
                textAlign: 'center',
            }}
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
            >
                <Icon
                    type='plus'
                    style={{
                        fontSize: 36,
                    }}
                />
            </Button>
            <div
                style={{
                    marginTop: 12,
                }}
            >
                {
                    fileName === '' ? '点击添加文件' :
                    <div>
                        <Icon
                            type='paper-clip'
                            style={{
                                marginRight: 8,
                            }}
                        />
                        <Tooltip title={fileName}>
                            <span>
                                {fileName.split('\\')[fileName.split('\\').length - 1]}
                            </span>
                        </Tooltip>
                        <Tooltip title='删除'>
                            <Icon
                                className={cx(
                                    loading
                                        ? 'delete-file-button-loading'
                                        : 'delete-file-button'
                                )}
                                type='delete'
                                style={{
                                    marginLeft: 8,
                                }}
                                onClick={handleDelete}
                            />
                        </Tooltip>
                    </div>
                }
            </div>
            <div>
                <Button
                    type='primary'
                    loading={loading}
                    onClick={handleClick}
                    style={{
                        width: '25%',
                        marginTop: '15%',
                    }}
                >
                    编译
                </Button>
            </div>
        </div>
    );
};
