import React, { useEffect, useState } from 'react';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';
import { apiEndpoint } from '../../prismic-configuration';

const client = Prismic.client(apiEndpoint);

const News = () => {
    const [prismicData, setPrismicData] = useState({
        newsPage: null,
        newsPosts: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newsPage = await client.getSingle('news');
                const newsPosts = await client.query(
                    Prismic.Predicates.at('document.type', 'news_post'),
                    { fetch: 'news_post.title' },
                );

                if (newsPosts) {
                    setPrismicData(
                        {
                            newsPage,
                            newsPosts: newsPosts.results,
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

    if (prismicData.newsPosts) {
        const newsPage = prismicData.newsPage.data;
        const { newsPosts } = prismicData;

        return (
            <>
                { prismicData ? (
                    <>
                        <RichText
                            render={ newsPage.page_title }
                        />
                        { newsPosts ? newsPosts.map(item => (
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

export default News;
