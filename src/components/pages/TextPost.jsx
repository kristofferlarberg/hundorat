import React from 'react';
import { useQuery } from 'react-query';
import { RichText } from 'prismic-reactjs';

import { linkResolver } from '../../prismic-configuration';
import getTextPost from '../../fetching/getTextPost';
import NotFound from './NotFound';

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
            <div>
                { textPost.image ? (
                    <>
                        <img alt={ textPost.image.alt } src={ textPost.image.url } />
                        <RichText render={ textPost.image_caption } />
                    </>
                ) : null }
                <RichText render={ textPost.title } />
                <RichText render={ textPost.text } linkResolver={ linkResolver } />
            </div>
        </>
    );
};

export default TextPost;
