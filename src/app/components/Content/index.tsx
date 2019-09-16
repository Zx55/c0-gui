import React from 'react';
import { Redirect } from 'react-router-dom';

import Layout from 'antd/lib/layout';
import TitleBar from './TitleBar';
import Routes from '../Routes';

import './Content.css';


export default () => {
    return (
        <Layout.Content
            style={{
                margin: '48px 32px',
                padding: 24,
                minHeight: '80vh',
            }}
        >
            <TitleBar />
            <Redirect exact from='/' to='/compile' />
            <Routes />
        </Layout.Content>
    );
};
