import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import cx from 'classnames';
import { loadingContainer } from '../../containers';

import Layout from 'antd/lib/layout';
import Icon from 'antd/lib/icon';
import Menu, { ClickParam } from 'antd/lib/menu';

import './Sider.css';


export interface SiderProps extends RouteComponentProps {
    collapsed: boolean;
    onCollapse: () => void;
};

export default withRouter((props: SiderProps) => {
    const { loading } = loadingContainer.useContainer();
    const [menuKey, setKey] = useState('compile');

    const handleClick = (e: ClickParam) => {
        if (loading) {
            return;
        }

        if (e.key !== 'logo' && e.key !== 'exit') {
            setKey(e.key);
        }
    };

    const handleSelect = (e: ClickParam) => {
        if (loading) {
            return;
        }

        switch (e.key) {
            case 'compile':
                props.history.push('/compile');
                break;
            case 'settings':
                props.history.push('/settings');
                break;
            case 'manual':
                props.history.push('/manual');
                break;
            case 'about':
                props.history.push('/about');
                break;
        }
    };

    return (
        <Layout.Sider
            collapsible
            collapsed={props.collapsed}
            trigger={null}
        >
            <div
                style={{
                    height: '7%',
                    width: '100%',
                    WebkitUserSelect: 'none',
                }}
            />
            <Menu
                theme='dark'
                mode='inline'
                selectedKeys={[menuKey]}
                onClick={(e) => handleClick(e)}
                onSelect={(e) => handleSelect(e)}
            >
                <Menu.Item key='logo' disabled={loading}>
                    <Icon type='block' />
                    <span>C0 Compiler</span>
                </Menu.Item>
                <Menu.Item key='compile' disabled={loading}>
                    <Icon type='build' />
                    <span>编译</span>
                </Menu.Item>
                <Menu.Item key='settings' disabled={loading}>
                    <Icon type='setting' />
                    <span>设置</span>
                </Menu.Item>
                <Menu.Item key='manual' disabled={loading}>
                    <Icon type='read' />
                    <span>用户手册</span>
                </Menu.Item>
                <Menu.Item key='about' disabled={loading}>
                    <Icon type='home' />
                    <span>关于</span>
                </Menu.Item>
            </Menu>
            <div
                className={cx('trigger', props.collapsed && 'trigger-collapsed')}
                onClick={props.onCollapse}
            >
                <Icon
                    type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
                />
            </div>
        </Layout.Sider>
    );
});
