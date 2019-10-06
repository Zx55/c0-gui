import React, { useState } from 'react';
import useRouter from 'use-react-router';
import cx from 'classnames';
import { FormattedMessage  } from 'react-intl';
import { loadingContainer } from '../../containers';

import Layout from 'antd/lib/layout';
import Icon from 'antd/lib/icon';
import Menu, { ClickParam } from 'antd/lib/menu';

import './Sider.css';


export default () => {
    const { loading } = loadingContainer.useContainer();
    const { history } = useRouter();
    const [menuKey, setKey] = useState('compile');
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = () => {
        setCollapsed(collapsed => !collapsed);
    }

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
                history.push('/compile');
                break;
            case 'settings':
                history.push('/settings');
                break;
            case 'manual':
                history.push('/manual');
                break;
            case 'about':
                history.push('/about');
                break;
        }
    };

    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
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
                    <FormattedMessage
                        id='app.sider.title'
                        tagName='span'
                    />
                </Menu.Item>
                <Menu.Item key='compile' disabled={loading}>
                    <Icon type='build' />
                    <FormattedMessage
                        id='app.sider.compiling'
                        tagName='span'
                    />
                </Menu.Item>
                <Menu.Item key='settings' disabled={loading}>
                    <Icon type='setting' />
                    <FormattedMessage
                        id='app.sider.settings'
                        tagName='span'
                    />
                </Menu.Item>
                <Menu.Item key='manual' disabled={loading}>
                    <Icon type='read' />
                    <FormattedMessage
                        id='app.sider.manual'
                        tagName='span'
                    />
                </Menu.Item>
                <Menu.Item key='about' disabled={loading}>
                    <Icon type='home' />
                    <FormattedMessage
                        id='app.sider.about'
                        tagName='span'
                    />
                </Menu.Item>
            </Menu>
            <div
                className={cx('trigger', collapsed && 'trigger-collapsed')}
                onClick={onCollapse}
            >
                <Icon
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                />
            </div>
        </Layout.Sider>
    );
};
