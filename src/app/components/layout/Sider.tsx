import * as React from 'react';

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
                编译
            </Menu.Item>
            <Menu.Item key='settings'>
                设置
            </Menu.Item>
        </Menu>
    </Layout.Sider>
);
