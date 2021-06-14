import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useQuery } from 'react-query';
import {
    Box,
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react';

import getStores from '../../fetching/getStores';
import getStoresPage from '../../fetching/getStoresPage';
import NotFound from './NotFound';
import Slider from '../misc/Slider';
import { useHandleLoadImages } from '../../hooks';

const Stores = () => {
    const storesPageQuery = useQuery('storesPage', getStoresPage);
    const storesQuery = useQuery('stores', getStores);

    const { handleLoad, pageContentStyle } = useHandleLoadImages();

    if (storesPageQuery.isLoading || storesQuery.isLoading) {
        return null;
    }

    if (storesPageQuery.isError || storesQuery.isError) {
        return <NotFound />;
    }

    const storesPage = storesPageQuery.data.data;
    const stores = storesQuery.data;

    return (
        <>
            { storesPage && stores ? (
                <Flex align="center" direction="column" opacity={ pageContentStyle.opacity }>
                    <Heading
                        as="h2"
                        mb={ 12 }
                        size="lg"
                        textAlign="center"
                    >
                        { RichText.asText(storesPage.page_title) }
                    </Heading>
                    <>
                        { stores.results.map(store => (
                            <>
                                <Slider key={ store.id } handleLoad={ () => handleLoad(stores.images_amount) } store={ store } />
                                <Box mb={ 12 } mt={ 6 } textAlign="center" w={ ['100%', '100%', '60%', '30%'] }>
                                    <Heading as="h3" m="0" size="md">
                                        { RichText.asText(store.data.store_name) }
                                    </Heading>
                                    <Box mt={ 4 }>
                                        <Text m="0">
                                            { RichText.asText(store.data.address_1) }
                                        </Text>
                                        <Text m="0">
                                            { RichText.asText(store.data.address_2) }
                                        </Text>
                                    </Box>
                                    <Box mt={ 4 }>
                                        { store.data.opening_hours.map(period => (
                                            <Text m="0">
                                                { period.start_day !== period.end_day
                                                    ? `${period.start_day}–${period.end_day} ${period.start_time}–${period.end_time}`
                                                    : `${period.start_day} ${period.start_time}–${period.end_time}` }
                                            </Text>
                                        )) }
                                    </Box>
                                    { store.data.additional_information.length > 0 ? (
                                        <Box border="1px solid" borderColor="gray.800" mt={ 4 } p={ 4 }>
                                            <Text fontSize="sm" my={ 0 }>
                                                { RichText.asText(store.data.additional_information) }
                                            </Text>
                                        </Box>
                                    ) : null }
                                </Box>
                            </>
                        )) }
                    </>
                </Flex>
            ) : null }
        </>
    );
};

export default Stores;
