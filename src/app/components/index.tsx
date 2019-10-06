import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { loadingContainer, configContainer } from '../containers';
import zh_CH from '../locale/zh_CH';
import en_US from '../locale/en_US';

import Layout from 'antd/lib/layout';
import Sider from './Sider';
import Content from './Content';
import './App.css';


export default () => {
    const { locale } = configContainer.useContainer();
    const msgs = {
        'zh': zh_CH,
        'en': en_US,
    };

    return (
        <BrowserRouter>
            <loadingContainer.Provider initialState={false}>
                <IntlProvider
                    locale={locale}
                    messages={msgs[locale]}
                >
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider />
                        <Layout>
                            <Content />
                        </Layout>
                    </Layout>
                </IntlProvider>
            </loadingContainer.Provider>
        </BrowserRouter>
    );
};
