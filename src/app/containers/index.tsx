import { useState } from 'react';
import { createContainer } from 'unstated-next';


const useLoading = (initalLoading = false) => {
    const [loading, setLoading] = useState(initalLoading);
    const changeLoading = (loading: boolean) => {
        setLoading(loading);
    };

    return { loading, changeLoading };
};

export const loadingContainer = createContainer(useLoading);
