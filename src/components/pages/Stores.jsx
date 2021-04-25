import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useQuery } from 'react-query';
import {
    Box,
    Image,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';

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
            { storesPage && stores ? (
                <VStack align="center" spacing={ 8 }>
                    <Heading
                        as="h2"
                        size="xl"
                        textAlign="center"
                    >
                        { RichText.asText(storesPage.page_title) }
                    </Heading>
                    <>
                        { stores.map(store => (
                            <>
                                { store.data.store_images.map(image => (
                                    <Box as="figure">
                                        <Image alt={ image.image.alt } src={ image.image.url } w={ ['100vw', '100vw', '70vw', '60vw'] } />
                                    </Box>
                                )) }
                                <Box key={ store.id } textAlign="center" w="100%">
                                    <Heading as="h3" size="sm">
                                        { RichText.asText(store.data.store_name) }
                                    </Heading>
                                    <Text>
                                        { RichText.asText(store.data.opening_hours_weekdays) }
                                    </Text>
                                    <Text>
                                        { RichText.asText(store.data.opening_hours_weekends) }
                                    </Text>
                                    {
                                        RichText.asText(store.data.opening_hours_additional)
                                            ? (
                                                <Text>
                                                    { RichText.asText(store.data.opening_hours_additional) }
                                                </Text>
                                            ) : null
                                    }
                                </Box>
                            </>
                        )) }
                    </>
                </VStack>
            ) : null }
        </>
    );
};

export default Stores;
