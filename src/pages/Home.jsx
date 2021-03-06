import React, { useEffect, useState } from 'react';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';
import { apiEndpoint, linkResolver } from '../prismic-configuration';

const client = Prismic.client(apiEndpoint);

const Home = () => {
    const [prismicData, setPrismicData] = useState({
        home: null,
        newsPost: null,
        textPosts: null,
        stores: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const home = await client.getSingle('homepage');
                const newsPost = await client.query(
                    Prismic.Predicates.at('document.type', 'news_post'),
                    {
                        fetch: ['news_post.title', 'news_post.image', 'news_post.uid'],
                        pageSize: 1,
                    },
                );
                const textPosts = await client.query(
                    Prismic.Predicates.at('document.type', 'text_post'),
                    { fetch: 'text_post.title', pageSize: 2 },
                );
                const stores = await client.query(
                    Prismic.Predicates.at('document.type', 'store'),
                    {
                        fetch: [
                            'store.store_name',
                            'store.opening_hours_weekdays',
                            'store.opening_hours_weekends',
                            'store.opening_hours_additional',
                        ],
                    },
                );

                if (stores) {
                    setPrismicData(
                        {
                            home,
                            newsPost: newsPost.results,
                            stores: stores.results,
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

    if (prismicData.stores) {
        const home = prismicData.home.data;
        const newsPost = prismicData.newsPost[0];
        const { stores } = prismicData;
        const { textPosts } = prismicData;

        return (
            <>
                { prismicData ? (
                    <>
                        <div>
                            <img alt="" src={ home.image.url } />
                            <RichText
                                render={ home.presentation }
                                linkResolver={ linkResolver }
                            />
                        </div>
                        <hr />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            { stores ? stores.map(item => (
                                <div key={ item.id }>
                                    { RichText.render(item.data.store_name) }
                                    { RichText.render(item.data.opening_hours_weekdays) }
                                    { RichText.render(item.data.opening_hours_weekends) }
                                    {
                                        RichText.render(item.data.opening_hours_additional)
                                            ? RichText.render(item.data.opening_hours_additional)
                                            : null
                                    }
                                </div>
                            )) : null }
                        </div>
                        <hr />
                        <div>
                            { newsPost ? (
                                <div>
                                    <img alt="" src={ newsPost.data.image.url } />
                                    { RichText.render(newsPost.data.title) }
                                    <p>{ newsPost.first_publication_date }</p>
                                </div>
                            ) : null }
                        </div>
                        <hr />
                        <div style={{ display: 'flex' }}>
                            { textPosts ? textPosts.map(item => (
                                <div
                                    key={ item.id }
                                    style={{
                                        alignContent: 'center',
                                        border: 'solid 1px black',
                                        display: 'flex',
                                        heigh: '200px',
                                        margin: '2rem',
                                        width: '100px',
                                        textAlign: 'center',
                                    }}
                                >
                                    { RichText.render(item.data.title) }
                                </div>
                            )) : null }
                        </div>
                    </>
                ) : <div>Not found</div> }
            </>
        );
    }

    return null;
};

export default Home;
