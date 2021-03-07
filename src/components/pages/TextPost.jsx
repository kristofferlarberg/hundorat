import React, { useEffect, useState } from 'react';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';

import { apiEndpoint, linkResolver } from '../../prismic-configuration';

const client = Prismic.client(apiEndpoint);

const TextPost = ({ match }) => {
    const [prismicData, setPrismicData] = useState({ textPost: null });

    const { uid } = match.params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const textPost = await client.getByUID('text_post', uid);

                if (textPost) {
                    return setPrismicData(textPost);
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
        const textPost = prismicData.data;

        return (
            <>
                { textPost ? (
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
                ) : <div>Not found</div> }
            </>
        );
    }
    return null;
};

export default TextPost;
