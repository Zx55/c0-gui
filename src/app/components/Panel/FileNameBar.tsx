import React from 'react';
import cx from 'classnames';
import { loadingContainer } from '../../containers';

import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';


export interface FileNameBarProps {
    fileName: string;
    onDelete: () => void;
    key?: string;
};

export default (props: FileNameBarProps) => {
    const { loading } = loadingContainer.useContainer();

    const getFileNameSplits = () => props.fileName.split('\\');
    const getFileName = () => getFileNameSplits().pop();
    const getAbsoluteFileName = () => {
        const splits = getFileNameSplits();

        if (splits.length >= 7) {
            return new Array<string>(
                splits[0], splits[1],
                ' ...', splits[splits.length - 2],
                splits[splits.length - 1],
            ).join('\\');
        }

        return props.fileName;
    };

    return (
        <div
            style={{
                margin: '12px auto',
                width: '80%',
                paddingRight: props.fileName !== '' && 25,
            }}
        >
            {
                props.fileName === '' ? '点击添加文件' :
                <div>
                    <Icon
                        type='paper-clip'
                        style={{
                            marginRight: 8,
                        }}
                    />
                    <Tooltip
                        title={
                            <span>
                                <span>{getAbsoluteFileName()}</span>
                                <span
                                    className={cx(
                                        loading
                                            ? 'delete-file-button-loading'
                                            : 'delete-file-button'
                                    )}
                                    onClick={props.onDelete}
                                    style={{
                                        color: loading ? '#f5222d' : '#40a9ff',
                                        marginLeft: 8,
                                    }}
                                >
                                    移除
                                </span>
                            </span>
                        }
                    >
                        <span>{getFileName()}</span>
                    </Tooltip>
                </div>
            }
        </div>
    )
};
