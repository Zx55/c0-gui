import { useState } from 'react';
import { createContainer } from 'unstated-next';

import config, { AppConfig } from '../config';

const useConfig = (initialConfig: AppConfig = config) => {
    const [locale, setLocale] = useState(initialConfig.locale);
    const [dark, setDark] = useState(initialConfig.darkMode);

    const switchLocale = () => {
        switch (locale) {
            case 'en':
                setLocale('zh');
                break;
            case 'zh':
                setLocale('en');
                break;
        }
    };

    const switchDark = () => setDark(dark => !dark);

    return { locale, switchLocale, dark, switchDark };
};

export default createContainer(useConfig);
