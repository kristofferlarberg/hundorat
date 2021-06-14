import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useQuery } from 'react-query';

import ArticleLayout from '../layout/ArticleLayout';
import getNewsPost from '../../fetching/getNewsPost';
import { linkResolver } from '../../prismic-configuration';
import NotFound from './NotFound';
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
                    body={
                        <RichText linkResolver={ linkResolver } render={ newsPost.data.text } />
                    }
                    caption={ RichText.asText(newsPost.data.image_caption) }
                    date={ formattedDate }
                    handleLoad={ () => handleLoad(newsPost.images_amount) }
                    heading={ RichText.asText(newsPost.data.title) }
                    opacity={ pageContentStyle.opacity }
                    src={ newsPost.data.image.url }
                />
            ) : null }
        </>
    );
};

export default NewsPost;
