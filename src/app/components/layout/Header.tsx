import * as React from 'react';

import Layout from 'antd/es/Layout';
import Icon from 'antd/es/Icon';


export interface HeaderProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
};

export default (props: HeaderProps) => (
    <Layout.Header
        style={{
            background: '#fff',
            padding: 0,
        }}
    >
        <Icon
            type={props.collapsed ? 'menu-unfold': 'menu-fold'}
            onClick={() => props.setCollapsed(!props.collapsed)}
        />
    </Layout.Header>
);
