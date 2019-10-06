import React from 'react';
import { FormattedMessage } from 'react-intl';
import { localeContainer } from '../../containers';

import Select from 'antd/lib/select';

const { Option } = Select;


export default () => {
    const { locale, switchLocale } = localeContainer.useContainer();

    return (
        <div>
            <div>settings</div>
            <Select
                defaultValue={locale}
                onChange={switchLocale}
            >
                <Option value='zh'>
                    <FormattedMessage id='app.settings.language.zh' />
                </Option>
                <Option value='en'>
                    <FormattedMessage id='app.settings.language.en' />
                </Option>
            </Select>
        </div>
    );
};
