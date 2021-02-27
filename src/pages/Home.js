import { linkResolver } from '../prismic-configuration';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';
import React, { useEffect, useState } from 'react';

import { apiEndpoint } from '../prismic-configuration';

const client = Prismic.client(apiEndpoint);

const Home = () => {
    const [prismicData, setPrismicData] = useState({
        homeDoc: null,
        newsPost: null,
        textPosts: null,
        stores: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const homeDoc = await client.getSingle('homepage');
                const newsPost = await client.query(
                    Prismic.Predicates.at('document.type', 'news_post'),
                    {
                        fetch: ['news_post.title', 'news_post.image', 'news_post.uid',],
                        pageSize: 1,
                    }
                );
                const textPosts = await client.query(
                    Prismic.Predicates.at('document.type', 'text_post'),
                    { fetch: 'text_post.title', pageSize: 2 }
                );
                const stores = await client.query(
                    Prismic.Predicates.at('document.type', 'store'),
                    { fetch: [
                        'store.store_name',
                        'store.opening_hours_weekdays',
                        'store.opening_hours_weekends',
                        'store.opening_hours_additional',
                    ]}
                );

                if (stores) {
                    return setPrismicData({
                        homeDoc,
                        newsPost: newsPost.results,
                        stores: stores.results,
                        textPosts: textPosts.results,
                    });
                }
                else {
                    console.warn(
                        'Page document not found. Make sure it exists in your Prismic repository'
                    );
                }
            }
            catch {
                console.log('error');
            }
        };

        fetchData();
    }, []);

    if (prismicData.stores) {
        const homeDoc = prismicData.homeDoc.data;
        const newsPost = prismicData.newsPost[0];
        const stores = prismicData.stores;
        const textPosts = prismicData.textPosts;

        return (
            <>
                { prismicData ?
                    <>
                        <div>
                            <img alt="" src={ homeDoc.image.url } />
                            <RichText
                                render={ homeDoc.presentation }
                                linkResolver={ linkResolver }
                            />
                        </div>
                        <hr></hr>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            { stores ? stores.map((item) => {
                                return (
                                    <div key={ item.id }>
                                        { RichText.render(item.data.store_name) }
                                        { RichText.render(item.data.opening_hours_weekdays) }
                                        { RichText.render(item.data.opening_hours_weekends) }
                                        { RichText.render(item.data.opening_hours_additional) ?
                                            RichText.render(item.data.opening_hours_additional)
                                        : null }
                                    </ div>
                                );
                            }) : <div>Loading</div> }
                        </div>
                        <hr></hr>
                        <div>
                            { newsPost ?
                                <div>
                                    <img alt="" src={ newsPost.data.image.url } />
                                    { RichText.render(newsPost.data.title) }
                                    <p>{ newsPost.first_publication_date }</p>
                                </div>
                            : null }
                        </div>
                        <hr></hr>
                        <div style={ { display: "flex" } }>
                            { textPosts ? textPosts.map((item) => {
                                return (
                                    <div
                                        key={ item.id }
                                        style={{
                                            alignContent: "center",
                                            border: "solid 1px black",
                                            display: "flex",
                                            heigh: "200px",
                                            margin: "2rem",
                                            width: "100px",
                                            textAlign: "center",
                                        }}
                                    >
                                        { RichText.render(item.data.title) }
                                    </div>
                                );
                            }) : <div>Loading</div> }
                        </div>
                    </>
                : <div>Loading</div> }
            </>
        );
    }

    return null;
};

export default Home;
