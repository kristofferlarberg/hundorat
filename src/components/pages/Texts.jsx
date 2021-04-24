import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useQuery } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Center,
    Heading,
    Link,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';

import getTextsPage from '../../fetching/getTextsPage';
import getTextPosts from '../../fetching/getTextPosts';
import NotFound from './NotFound';
import { linkResolver } from '../../prismic-configuration';

const Texts = () => {
    const textsPageQuery = useQuery('textsPage', getTextsPage);
    const textsPostsQuery = useQuery('textsPosts', getTextPosts);

    if (textsPageQuery.isLoading || textsPostsQuery.isLoading) {
        return <span>Loading...</span>;
    }

    if (textsPageQuery.isError) {
        return <NotFound />;
    }

    const textsPage = textsPageQuery.data.data;
    const textsPosts = textsPostsQuery.data.results;

    return (
        <Box mb={ 24 }>
            <Heading as="h2" size="xl" textAlign="center">{ RichText.asText(textsPage.page_title) }</Heading>
            <Wrap justify="center" mt={ 6 } spacing={ 6 }>
                { textsPosts.length > 0 ? textsPosts.map(post => (
                    <Link
                        as={ RouterLink }
                        key={ post.id }
                        to={ linkResolver(post) }
                        variant="subtle"
                    >
                        <WrapItem>
                            <Center border="1px" h={ 80 } borderColor="gray.800" key={ post.id } w={ 80 }>
                                <Heading as="h4" p={ 2 } size="md" textAlign="center">
                                    { RichText.asText(post.data.title) }
                                </Heading>
                            </Center>
                        </WrapItem>
                    </Link>
                )) : 'Det finns inga inlägg för tillfället.' }
            </Wrap>
        </Box>
    );
};

export default Texts;
