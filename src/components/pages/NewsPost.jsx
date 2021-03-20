import React from 'react';
import { useQuery } from 'react-query';
import { RichText } from 'prismic-reactjs';

import { linkResolver } from '../../prismic-configuration';
import getNewsPost from '../../fetching/getNewsPost';
import NotFound from './NotFound';

const NewsPost = ({ match }) => {
    const { uid } = match.params;

    const newsPostQuery = useQuery(['newsPost', uid], () => getNewsPost(uid));

    if (newsPostQuery.isLoading) {
        return <span>Loading...</span>;
    }

    if (newsPostQuery.isError) {
        return <NotFound />;
    }

    const newsPost = newsPostQuery.data.data;

    return (
        <>
            <div>
                { newsPost.image ? (
                    <>
                        <img
                            alt={ newsPost.image.alt }
                            src={ newsPost.image.url }
                        />
                        <RichText render={ newsPost.image_caption } />
                    </>
                ) : null }
                <RichText render={ newsPost.title } />
                <p>{ newsPost.first_publication_date }</p>
                <RichText render={ newsPost.text } linkResolver={ linkResolver } />
            </div>
        </>
    );
};

export default NewsPost;
