import * as React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { ipcRenderer } from 'electron';

import Layout from 'antd/es/Layout';
import Sider from './layout/Sider';
import Header from './layout/Header';
import Routes from './Routes';

import './App.css';


export interface AppProps {
    name: string;
};

export default (props: AppProps) => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <BrowserRouter>
            <Layout>
                <Sider collapsed={collapsed} />
                <Layout>
                    <Header
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                    />
                    <Layout.Content>
                        <Routes />
                    </Layout.Content>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
};
