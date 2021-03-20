import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useQuery } from 'react-query';

import getNewsPage from '../../fetching/getNewsPage';
import getNewsPosts from '../../fetching/getNewsPosts';
import NotFound from './NotFound';

const News = () => {
    const newsPageQuery = useQuery('newsPage', getNewsPage);
    const newsPostsQuery = useQuery('newsPosts', getNewsPosts);

    if (newsPageQuery.isLoading || newsPostsQuery.isLoading) {
        return <span>Loading...</span>;
    }

    if (newsPageQuery.isError || newsPostsQuery.isError) {
        return <NotFound />;
    }

    const newsPage = newsPageQuery.data.data;
    const newsPosts = newsPostsQuery.data.results;

    return (
        <>
            <RichText
                render={ newsPage.page_title }
            />
            { newsPosts.length > 0 ? newsPosts.map(item => (
                <div key={ item.id }>
                    <RichText render={ item.data.title } />
                </div>
            )) : 'Det finns inga inlägg för tillfället.' }
        </>
    );
};

export default News;
