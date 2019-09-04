import * as React from 'react';
import { ipcRenderer } from 'electron';

import Layout from 'antd/es/Layout';
import Sider from './layout/Sider';
import Header from './layout/Header';
import Content from './layout/Content';

import './App.css';


export interface AppProps {
    name: string;
};

export default (props: AppProps) => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <Layout>
            <Sider collapsed={collapsed} />
            <Layout>
                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
                <Content />
            </Layout>
        </Layout>
    );
};
