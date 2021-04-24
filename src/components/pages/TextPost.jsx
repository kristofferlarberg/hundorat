import React from 'react';
import { useQuery } from 'react-query';
import { RichText } from 'prismic-reactjs';

import { linkResolver } from '../../prismic-configuration';
import getTextPost from '../../fetching/getTextPost';
import NotFound from './NotFound';
import ArticleLayout from '../layout/ArticleLayout';

const TextPost = ({ match }) => {
    const { uid } = match.params;

    const textPostQuery = useQuery(['textPost', uid], () => getTextPost(uid));

    if (textPostQuery.isLoading) {
        return <span>Loading...</span>;
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
                    src={ textPost.image.url }
                    date={ null }
                    caption={ RichText.asText(textPost.image_caption) }
                    heading={ RichText.asText(textPost.title) }
                    body={ <RichText render={ textPost.text } linkResolver={ linkResolver } /> }
                />
            ) : null }
        </>
    );
};

export default TextPost;
