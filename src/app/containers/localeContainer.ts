import { useState } from 'react';
import { createContainer } from 'unstated-next';


const useLocale = (initialLocale = 'zh') => {
    const [locale, setLocale] = useState(initialLocale);

    const switchLocale = () => {
        switch (locale) {
            case 'en':
                setLocale('zh');
                break;
            case 'zh':
                setLocale('en');
                break;
        }
    }

    return { locale, switchLocale };
};

export default createContainer(useLocale);
