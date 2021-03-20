import React from 'react';
import { useQuery } from 'react-query';
import { RichText } from 'prismic-reactjs';

import getHomepage from '../../fetching/getHomepage';
import getNewsPosts from '../../fetching/getNewsPosts';
import getStores from '../../fetching/getStores';
import fetchTextPosts from '../../fetching/getTextPosts';
import { linkResolver } from '../../prismic-configuration';
import NotFound from './NotFound';

const Home = () => {
    const homepageQuery = useQuery('homepage', getHomepage);
    const newsPostsQuery = useQuery('newsPosts', getNewsPosts);
    const storesQuery = useQuery('stores', getStores);
    const textPostsQuery = useQuery('textPosts', fetchTextPosts);

    if (
        homepageQuery.isLoading
        || newsPostsQuery.isLoading
        || storesQuery.isLoading
        || textPostsQuery.isLoading
    ) {
        return <span>Loading...</span>;
    }

    if (homepageQuery.isError || storesQuery.isError) {
        return <NotFound />;
    }

    const homepage = homepageQuery.data.data;
    const stores = storesQuery.data.results;
    const newsPost = newsPostsQuery.data.results;
    const textPosts = textPostsQuery.data.results;

    return (
        <>
            <div>
                <img alt={ homepage.image.alt } src={ homepage.image.url } />
                <RichText
                    render={ homepage.presentation }
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
                                ? RichText.render(item.opening_hours_additional)
                                : null
                        }
                    </div>
                )) : null }
            </div>
            <hr />
            <div>
                { newsPost.length > 0 ? (
                    <div>
                        <img
                            alt={ newsPost[0].data.image.alt }
                            src={ newsPost[0].data.image.url }
                        />
                        { RichText.render(newsPost[0].data.title) }
                        <p>{ newsPost.first_publication_date }</p>
                    </div>
                ) : null }
            </div>
            <hr />
            <div style={{ display: 'flex' }}>
                { newsPost.length > 0 ? textPosts.map(item => (
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
    );
};

export default Home;
