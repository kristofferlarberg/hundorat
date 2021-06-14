import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useQuery } from 'react-query';

import ArticleLayout from '../layout/ArticleLayout';
import getTextPost from '../../fetching/getTextPost';
import { linkResolver } from '../../prismic-configuration';
import NotFound from './NotFound';
import { useHandleLoadImages } from '../../hooks';

const TextPost = ({ match }) => {
    const { uid } = match.params;

    const textPostQuery = useQuery(['textPost', uid], () => getTextPost(uid));

    const { handleLoad, pageContentStyle } = useHandleLoadImages();

    if (textPostQuery.isLoading) {
        return null;
    }

    if (textPostQuery.isError) {
        return <NotFound />;
    }

    const textPost = textPostQuery.data.data;

    return (
        <>
            { textPost ? (
                <ArticleLayout
                    alt={ textPost.image.alt }
                    body={ <RichText linkResolver={ linkResolver } render={ textPost.text } /> }
                    caption={ RichText.asText(textPost.image_caption) }
                    date={ null }
                    handleLoad={ () => handleLoad(textPost.images_amount) }
                    heading={ RichText.asText(textPost.title) }
                    opacity={ pageContentStyle.opacity }
                    src={ textPost.image.url }
                />
            ) : null }
        </>
    );
};

export default TextPost;
