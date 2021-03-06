import React, { useEffect, useState } from 'react';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';
import { apiEndpoint } from '../prismic-configuration';

const client = Prismic.client(apiEndpoint);

const Texts = () => {
    const [prismicData, setPrismicData] = useState({
        textsPage: null,
        textPosts: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const textsPage = await client.getSingle('texts');
                const textPosts = await client.query(
                    Prismic.Predicates.at('document.type', 'text_post'),
                    { fetch: 'text_post.title' },
                );

                if (textPosts) {
                    setPrismicData(
                        {
                            textsPage,
                            textPosts: textPosts.results,
                        },
                    );
                }
                else {
                    console.warn(
                        'Page document not found.',
                    );
                }
            }
            catch (error) {
                console.log('error');
            }
        };

        fetchData();
    }, []);

    if (prismicData.textPosts) {
        const textsPage = prismicData.textsPage.data;
        const { textPosts } = prismicData;

        return (
            <>
                { prismicData ? (
                    <>
                        <RichText
                            render={ textsPage.page_title }
                        />
                        { textPosts ? textPosts.map(item => (
                            <div key={ item.id }>
                                <RichText render={ item.data.title } />
                            </div>
                        )) : null }
                    </>
                ) : <div>Not found</div> }
            </>
        );
    }

    return null;
};

export default Texts;
