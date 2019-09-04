import * as React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom'
import { ipcRenderer } from 'electron';

import Layout from 'antd/lib/layout';
import Sider from './Sider';
import Routes from './Routes';

import './App.css';


export default () => {
    const [collapsed, setCollapsed] = React.useState(false);

    const handleCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    };

    return (
        <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsed={collapsed}
                    handleCollapse={handleCollapse}
                />
                <Layout>
                    <Layout.Content
                        style={{
                            margin: 32,
                            padding: 24,
                            background: 'white',
                            minHeight: '85vh',
                        }}
                    >
                        <Redirect exact from='/' to='/compile' />
                        <Routes />
                    </Layout.Content>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
};
