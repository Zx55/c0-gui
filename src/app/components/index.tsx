import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { loadingContainer } from '../containers';

import Layout from 'antd/lib/layout';
import Sider from './Sider';
import Content from './Content';
import './App.css';


export default () => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = () => {
        setCollapsed(collapsed => !collapsed);
    };

    return (
        <BrowserRouter>
            <loadingContainer.Provider initialState={false}>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsed={collapsed}
                        onCollapse={onCollapse}
                    />
                    <Layout>
                        <Content />
                    </Layout>
                </Layout>
            </loadingContainer.Provider>
        </BrowserRouter>
    );
};
