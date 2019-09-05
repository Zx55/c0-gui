import * as React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { ipcRenderer } from 'electron';
import { loadingContainer } from '../containers';

import Layout from 'antd/lib/layout';
import Sider from './Sider';
import Content from './Content';

import './App.css';


export default () => {
    const [collapsed, setCollapsed] = React.useState(false);

    const handleCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    };

    return (
        <BrowserRouter>
            <loadingContainer.Provider initialState={false}>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsed={collapsed}
                        handleCollapse={handleCollapse}
                    />
                    <Layout>
                        <Content />
                    </Layout>
                </Layout>
            </loadingContainer.Provider>
        </BrowserRouter>
    );
};
