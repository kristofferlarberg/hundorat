import React from 'react';
import { useQuery } from 'react-query';
import { RichText } from 'prismic-reactjs';

import { linkResolver } from '../../prismic-configuration';
import getNewsPost from '../../fetching/getNewsPost';
import NotFound from './NotFound';
import ArticleLayout from '../layout/ArticleLayout';
import { useHandleLoadImages } from '../../hooks';

const NewsPost = ({ match }) => {
    const { uid } = match.params;

    const newsPostQuery = useQuery(['newsPost', uid], () => getNewsPost(uid));

    const { handleLoad, pageContentStyle } = useHandleLoadImages();

    if (newsPostQuery.isLoading) {
        return null;
    }

    if (newsPostQuery.isError) {
        return <NotFound />;
    }

    const newsPost = newsPostQuery.data;
    const date = newsPost.first_publication_date;
    const formattedDate = new Date(date).toLocaleDateString('sv-SV');

    return (
        <>
            { newsPost ? (
                <ArticleLayout
                    alt={ newsPost.data.image.alt }
                    src={ newsPost.data.image.url }
                    date={ formattedDate }
                    caption={ RichText.asText(newsPost.data.image_caption) }
                    handleLoad={ () => handleLoad(newsPost.images_amount) }
                    heading={ RichText.asText(newsPost.data.title) }
                    body={
                        <RichText render={ newsPost.data.text } linkResolver={ linkResolver } />
                    }
                    opacity={ pageContentStyle.opacity }
                />
            ) : null }
        </>
    );
};

export default NewsPost;
