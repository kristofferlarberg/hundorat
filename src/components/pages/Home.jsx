import React from 'react';
import { useQuery } from 'react-query';
import { RichText } from 'prismic-reactjs';
import {
    Box,
    Center,
    Container,
    Divider,
    Heading,
    Image,
    Text,
    VStack,
    Wrap,
} from '@chakra-ui/react';

import getHomepage from '../../fetching/getHomepage';
import getNewsPosts from '../../fetching/getNewsPosts';
import getStores from '../../fetching/getStores';
import fetchTextPosts from '../../fetching/getTextPosts';
import { linkResolver } from '../../prismic-configuration';
import NotFound from './NotFound';
import NewsPostCard from '../misc/NewsPostCard';
import TextPostCard from '../misc/TextPostCard';

const Home = () => {
    const homepageQuery = useQuery('homepage', getHomepage);
    const newsPostsQuery = useQuery('newsPosts', getNewsPosts);
    const storesQuery = useQuery('stores', getStores);
    const textPostsQuery = useQuery('textPosts', fetchTextPosts);

    if (
        homepageQuery.isLoading
        || newsPostsQuery.isLoading
        || storesQuery.isLoading
        || textPostsQuery.isLoading
    ) {
        return <span>Loading...</span>;
    }

    if (homepageQuery.isError || storesQuery.isError) {
        return <NotFound />;
    }

    const homepage = homepageQuery.data.data;
    const stores = storesQuery.data.results;
    const newsPost = newsPostsQuery.data.results;
    const textPosts = textPostsQuery.data.results;

    return (
        <>
            <VStack
                align="center"
                spacing={ 12 }
            >
                <Image alt={ homepage.image.alt } src={ homepage.image.url } />
                <Box w="100%">
                    <Container>
                        <RichText
                            render={ homepage.presentation }
                            linkResolver={ linkResolver }
                        />
                    </Container>
                </Box>
                <Divider />
                <VStack
                    divider={ <Text mt={ 2 }>***</Text> }
                    spacing={ 2 }
                >
                    { stores ? stores.map(item => (
                        <Box key={ item.id } textAlign="center" w="100%">
                            <Heading as="h3" size="sm">
                                { RichText.asText(item.data.store_name) }
                            </Heading>
                            <Text>
                                { RichText.asText(item.data.opening_hours_weekdays) }
                            </Text>
                            <Text>
                                { RichText.asText(item.data.opening_hours_weekends) }
                            </Text>
                            {
                                RichText.asText(item.data.opening_hours_additional)
                                    ? (
                                        <Text>
                                            { RichText.asText(item.data.opening_hours_additional) }
                                        </Text>
                                    ) : null
                            }
                        </Box>
                    )) : null }
                </VStack>
                <Divider />
                <Center>
                    { newsPost.length > 0 ? (
                        <NewsPostCard
                            alt={ newsPost[0].data.image.alt }
                            heading={ RichText.asText(newsPost[0].data.title) }
                            key={ newsPost[0].id }
                            link={ linkResolver(newsPost[0]) }
                            src={ newsPost[0].data.image.url }
                            date={ newsPost[0].first_publication_date }
                            type="news"
                        />
                    ) : null }
                </Center>
                <Divider />
                <Wrap justify="center" spacing={ 6 }>
                    { textPosts.length > 0 ? textPosts.map(post => (
                        <TextPostCard
                            heading={ RichText.asText(post.data.title) }
                            link={ linkResolver(post) }
                            type="text"
                        />
                    )) : null }
                </Wrap>
                <Divider />
            </VStack>
        </>
    );
};

export default Home;
