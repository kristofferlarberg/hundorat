import React from 'react';
import { useQuery } from 'react-query';
import { RichText } from 'prismic-reactjs';

import { linkResolver } from '../../prismic-configuration';
import getNewsPost from '../../fetching/getNewsPost';
import NotFound from './NotFound';
import ArticleLayout from '../layout/ArticleLayout';

const NewsPost = ({ match }) => {
    const { uid } = match.params;

    const newsPostQuery = useQuery(['newsPost', uid], () => getNewsPost(uid));

    if (newsPostQuery.isLoading) {
        return <span>Loading...</span>;
    }

    if (newsPostQuery.isError) {
        return <NotFound />;
    }

    const newsPost = newsPostQuery.data;
    console.log(newsPost.first_publication_date);
    return (
        <>
            { newsPost ? (
                <ArticleLayout
                    alt={ newsPost.data.image.alt }
                    src={ newsPost.data.image.url }
                    date={ newsPost.first_publication_date }
                    caption={ RichText.asText(newsPost.data.image_caption) }
                    heading={ RichText.asText(newsPost.data.title) }
                    body={
                        <RichText render={ newsPost.data.text } linkResolver={ linkResolver } />
                    }
                />
            ) : null }
        </>
    );
};

export default NewsPost;
