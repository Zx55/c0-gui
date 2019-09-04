import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import Layout from 'antd/lib/layout';
import Icon from 'antd/lib/icon';
import Menu, { ClickParam } from 'antd/lib/menu';

import './Sider.css';


export interface SiderProps extends RouteComponentProps {
    collapsed: boolean;
    handleCollapse: (collapsed: boolean) => void;
};

export default withRouter((props: SiderProps) => {
    const [menuKey, setKey] = React.useState('compile');

    const handleClick = (e: ClickParam) => {
        if (e.key !== 'logo' && e.key !== 'exit') {
            setKey(e.key);
        }
    };

    const handleSelect = (e: ClickParam) => {
        switch (e.key) {
            case 'compile':
                props.history.push('/compile');
                break;
            case 'settings':
                props.history.push('/settings');
                break;
            case 'exit':
                ipcRenderer.send('exit');
                break;
        }
    };

    return (
        <Layout.Sider
            collapsible
            collapsed={props.collapsed}
            onCollapse={props.handleCollapse}
        >
            <div className='sider-top-drag' />
            <Menu
                theme='dark'
                mode='inline'
                selectedKeys={[menuKey]}
                onClick={(e) => handleClick(e)}
                onSelect={(e) => handleSelect(e)}
                inlineCollapsed={props.collapsed}
            >
                <Menu.Item key='logo' id='logo'>
                    <Icon type='block' />
                    <span>C0 Compiler</span>
                </Menu.Item>
                <Menu.Item key='compile'>
                    <Icon type='build' />
                    <span>编译</span>
                </Menu.Item>
                <Menu.Item key='settings'>
                    <Icon type='setting' />
                    <span>设置</span>
                </Menu.Item>
                <Menu.Item key='about'>
                    <Icon type='home' />
                    <span>关于</span>
                </Menu.Item>
                <Menu.Item key='manual'>
                    <Icon type='read' />
                    <span>用户手册</span>
                </Menu.Item>
                <Menu.Item key='exit'>
                    <Icon type='export' rotate={180} />
                    <span>退出</span>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
});
