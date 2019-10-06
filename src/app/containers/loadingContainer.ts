import { useState } from 'react';
import { createContainer } from 'unstated-next';


const useLoading = (initialLoading = false) => {
    const [loading, setLoading] = useState(initialLoading);
    const changeLoading = (loading: boolean) => {
        setLoading(loading);
    };

    return { loading, changeLoading };
};

export default createContainer(useLoading);
