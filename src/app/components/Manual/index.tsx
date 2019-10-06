import React from 'react';
import { configContainer } from '../../containers';

import Markdown from 'react-markdown';

import manual from './content';


export default () => {
    const { locale } = configContainer.useContainer();

    return (
        <Markdown
            source={
                locale === 'zh' ? manual['zh'] : manual['en']
            }
        />
    );
};
