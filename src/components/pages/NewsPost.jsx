import React, { useEffect, useState } from 'react';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';

import { apiEndpoint, linkResolver } from '../../prismic-configuration';

const client = Prismic.client(apiEndpoint);

const NewsPost = ({ match }) => {
    const [prismicData, setPrismicData] = useState({ newsPost: null });

    const { uid } = match.params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newsPost = await client.getByUID('news_post', uid);

                if (newsPost) {
                    return setPrismicData(newsPost);
                }
                return console.warn('Page document not found.');
            }
            catch (error) {
                return console.log('error');
            }
        };
        fetchData();
    }, [uid]);

    if (prismicData) {
        const newsPost = prismicData;

        return (
            <>
                { newsPost.data ? (
                    <div>
                        { newsPost.data.image ? (
                            <>
                                <img
                                    alt={ newsPost.data.image.alt }
                                    src={ newsPost.data.image.url }
                                />
                                <RichText render={ newsPost.data.image_caption } />
                            </>
                        ) : null }
                        <RichText render={ newsPost.data.title } />
                        <p>{ newsPost.first_publication_date }</p>
                        <RichText render={ newsPost.data.text } linkResolver={ linkResolver } />
                    </div>
                ) : <div>Not found</div> }
            </>
        );
    }
    return null;
};

export default NewsPost;
