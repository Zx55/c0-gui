import React from 'react';
import { FormattedMessage } from 'react-intl';
import { configContainer } from '../../containers';

import Select from 'antd/lib/select';

const { Option } = Select;


export default () => {
    const { locale, switchLocale } = configContainer.useContainer();

    return (
        <div>
            <div>
                <span
                    style={{
                        width: '20%',
                        float: 'left',
                        fontSize: '14px',
                        lineHeight: '31px',
                    }}
                >
                    <FormattedMessage id='settings.language' tagName='span' />
                </span>
                <Select
                    defaultValue={locale}
                    onChange={switchLocale}
                    style={{
                        width: '25%',
                        float: 'left',
                    }}
                >
                    <Option value='zh'>
                        <FormattedMessage id='settings.language.zh' />
                    </Option>
                    <Option value='en'>
                        <FormattedMessage id='settings.language.en' />
                    </Option>
                </Select>
            </div>
        </div>
    );
};
