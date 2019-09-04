import * as React from 'react';
import { Link } from 'react-router-dom';

import Layout from 'antd/es/Layout';
import Menu from 'antd/es/Menu';


export interface SiderProps {
    collapsed: boolean;
};

export default (props: SiderProps) => (
    <Layout.Sider
        trigger={null}
        collapsible
        collapsed={props.collapsed}
    >
        <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['compile']}
        >
            <Menu.Item key='compile'>
                <Link to='/'>编译</Link>
            </Menu.Item>
            <Menu.Item key='settings'>
                <Link to='/settings'>设置</Link>
            </Menu.Item>
        </Menu>
    </Layout.Sider>
);
