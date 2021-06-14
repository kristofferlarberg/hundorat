import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useQuery } from 'react-query';
import { WrapItem } from '@chakra-ui/react';

import BlogLayout from '../layout/BlogLayout';
import getTextPosts from '../../fetching/getTextPosts';
import getTextsPage from '../../fetching/getTextsPage';
import { linkResolver } from '../../prismic-configuration';
import NotFound from './NotFound';
import TextPostCard from '../misc/TextPostCard';

const Texts = () => {
    const textsPageQuery = useQuery('textsPage', getTextsPage);
    const textsPostsQuery = useQuery('textsPosts', getTextPosts);

    if (textsPageQuery.isLoading || textsPostsQuery.isLoading) {
        return null;
    }

    if (textsPageQuery.isError) {
        return <NotFound />;
    }

    const textsPage = textsPageQuery.data.data;
    const textsPosts = textsPostsQuery.data.results;

    return (
        <BlogLayout heading={ RichText.asText(textsPage.page_title) }>
            { textsPosts.length > 0 ? textsPosts.map(post => (
                <WrapItem key={ post.id }>
                    <TextPostCard
                        heading={ RichText.asText(post.data.title) }
                        link={ linkResolver(post) }
                        type="text"
                    />
                </WrapItem>
            )) : 'Det finns inga inlägg för tillfället.' }
        </BlogLayout>
    );
};

export default Texts;
