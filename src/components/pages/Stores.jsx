import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useQuery } from 'react-query';
import {
    Box,
    Image,
    Heading,
    Text,
    VStack,
    Flex,
} from '@chakra-ui/react';

import getStoresPage from '../../fetching/getStoresPage';
import getStores from '../../fetching/getStores';
import NotFound from './NotFound';
import Slider from '../misc/Slider';

const Stores = () => {
    const storesPageQuery = useQuery('stores', getStoresPage);
    const storesQuery = useQuery('store', getStores);

    if (storesPageQuery.isLoading || storesQuery.isLoading) {
        return null;
    }

    if (storesPageQuery.isError || storesQuery.isError) {
        return <NotFound />;
    }

    const storesPage = storesPageQuery.data.data;
    const stores = storesQuery.data.results;

    return (
        <>
            { storesPage && stores ? (
                <VStack align="center" spacing={ 12 }>
                    <Heading
                        as="h2"
                        size="lg"
                        textAlign="center"
                    >
                        { RichText.asText(storesPage.page_title) }
                    </Heading>
                    <>
                        { stores.map(store => (
                            <Box key={ store.id }>
                                <Slider>
                                    { store.data.store_images.map(image => (
                                        <Flex
                                            key={ image.image.url }
                                            basis="100%"
                                            grow="0"
                                            height="100%"
                                            position="relative"
                                            shrink="0"
                                        >
                                            <Image
                                                alt={ image.image.alt }
                                                src={ image.image.url }
                                                width="100%"
                                            />
                                        </Flex>
                                    )) }
                                </Slider>
                                <Box key={ store.id } textAlign="center" w="100%">
                                    <Heading as="h3" size="md" m="0">
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
                                        <Text m="0">
                                            { RichText.asText(store.data.opening_hours_weekends) }
                                        </Text>
                                        <Text m="0">
                                            { RichText.asText(store.data.opening_hours_weekdays) }
                                        </Text>
                                        <Text m="0">
                                            { RichText.asText(store.data.opening_hours_weekends) }
                                        </Text>
                                    </Box>
                                    {
                                        RichText.asText(store.data.opening_hours_additional)
                                            ? (
                                                <Text m="0">
                                                    { RichText.asText(store.data.opening_hours_additional) }
                                                </Text>
                                            ) : null
                                    }
                                </Box>
                            </Box>
                        )) }
                    </>
                </VStack>
            ) : null }
        </>
    );
};

export default Stores;
