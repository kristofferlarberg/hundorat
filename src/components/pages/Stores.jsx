import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useQuery } from 'react-query';

import getStoresPage from '../../fetching/getStoresPage';
import getStores from '../../fetching/getStores';
import NotFound from './NotFound';

const Stores = () => {
    const storesPageQuery = useQuery('stores', getStoresPage);
    const storesQuery = useQuery('store', getStores);

    if (storesPageQuery.isLoading || storesQuery.isLoading) {
        return <span>Loading...</span>;
    }

    if (storesPageQuery.isError || storesQuery.isError) {
        return <NotFound />;
    }

    const storesPage = storesPageQuery.data.data;
    const stores = storesQuery.data.results;

    return (
        <>
            { storesPage
                ? <RichText render={ storesPage.page_title } />
                : null }
            { stores ? stores.map(item => (
                <div key={ item.id }>
                    <RichText render={ item.data.store_name } />
                </div>
            )) : null }
        </>
    );
};

export default Stores;
