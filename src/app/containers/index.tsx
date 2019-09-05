import * as React from 'react';
import { createContainer } from 'unstated-next';


const useLoading = (initalLoading = false) => {
    const [loading, setLoading] = React.useState(initalLoading);
    const changeLoading = (loading?: boolean) => {
        if (loading) {
            setLoading(loading);
        } else {
            setLoading(loading => !loading);
        }
    };

    return { loading, changeLoading };
};

export const loadingContainer = createContainer(useLoading);
