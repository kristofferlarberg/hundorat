import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useQuery } from 'react-query';
import {
    Box,
    Center,
    Container,
    Divider,
    Flex,
    Heading,
    Image,
    Text,
    VStack,
    Wrap,
} from '@chakra-ui/react';

import fetchTextPosts from '../../fetching/getTextPosts';
import getHomepage from '../../fetching/getHomepage';
import getNewsPosts from '../../fetching/getNewsPosts';
import getStores from '../../fetching/getStores';
import { linkResolver } from '../../prismic-configuration';
import NewsPostCard from '../misc/NewsPostCard';
import NotFound from './NotFound';
import TextPostCard from '../misc/TextPostCard';
import { useHandleLoadImages } from '../../hooks';

const Home = () => {
    const homepageQuery = useQuery('homepage', getHomepage);
    const newsPostsQuery = useQuery('newsPosts', getNewsPosts);
    const storesQuery = useQuery('stores', getStores);
    const textPostsQuery = useQuery('textPosts', fetchTextPosts);

    const { handleLoad, pageContentStyle } = useHandleLoadImages();

    if (
        homepageQuery.isLoading
        || newsPostsQuery.isLoading
        || storesQuery.isLoading
        || textPostsQuery.isLoading
    ) {
        return null;
    }

    if (
        homepageQuery.isError
        || newsPostsQuery.isError
        || storesQuery.isError
        || textPostsQuery.isError
    ) {
        return <NotFound />;
    }

    const homepage = homepageQuery.data.data;
    const stores = storesQuery.data.results;
    const newsPost = newsPostsQuery.data.results;
    const textPosts = textPostsQuery.data.results.slice(0, 2);

    return (
        <>
            <VStack
                align="center"
                opacity={ pageContentStyle.opacity }
                spacing={ 12 }
            >
                <Flex align="center" direction="column" w="100%">
                    <Flex
                        align="center"
                        maxH="25rem"
                        mb={ 4 }
                        overflow="hidden"
                        w={ ['100%', '100%', '90%', '70%', '60%', '60%'] }
                    >
                        <Image
                            alt={ homepage.image.alt }
                            onLoad={ () => handleLoad(1) }
                            src={ homepage.image.url }
                            w="100%"
                        />
                    </Flex>
                    <Container maxW="container.sm" mb={ 12 }>
                        <RichText
                            linkResolver={ linkResolver }
                            render={ homepage.presentation }
                        />
                    </Container>
                    <Image
                        alt="Hundlogotyp"
                        h="150px"
                        src="/images/hund.png"
                    />
                </Flex>
                <Divider />
                <VStack
                    divider={ <Text mb={ 2 } mt={ 2.5 }>***</Text> }
                >
                    { stores ? stores.map(store => (
                        <Box key={ store.id } textAlign="center" w="100%">
                            <Heading as="h3" my={ 0 } size="md">
                                { RichText.asText(store.data.store_name) }
                            </Heading>
                            { store.data.opening_hours.map(period => (
                                <Text key={ period.start_day } m="0">
                                    { period.start_day !== period.end_day
                                        ? `${period.start_day}–${period.end_day} ${period.start_time}.00–${period.end_time}.00`
                                        : `${period.start_day} ${period.start_time}.00–${period.end_time}.00` }
                                </Text>
                            )) }
                        </Box>
                    )) : null }
                </VStack>
                <Divider />
                { newsPost.length > 0 ? (
                    <>
                        <Center w="100%">
                            <NewsPostCard
                                key={ newsPost[0].id }
                                alt={ newsPost[0].data.image.alt }
                                date={ newsPost[0].first_publication_date }
                                heading={ RichText.asText(newsPost[0].data.title) }
                                link={ linkResolver(newsPost[0]) }
                                src={ newsPost[0].data.image.url }
                                type="news"
                            />
                        </Center>
                        <Divider />
                    </>
                ) : null }
                <Wrap justify="center" spacing={ 6 }>
                    { textPosts.length > 0 ? textPosts.map(post => (
                        <TextPostCard
                            key={ post.id }
                            heading={ RichText.asText(post.data.title) }
                            link={ linkResolver(post) }
                            type="text"
                        />
                    )) : null }
                </Wrap>
            </VStack>
        </>
    );
};

export default Home;
