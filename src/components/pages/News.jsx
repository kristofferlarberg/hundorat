import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useQuery } from 'react-query';

import getNewsPage from '../../fetching/getNewsPage';
import getNewsPosts from '../../fetching/getNewsPosts';
import NotFound from './NotFound';
import NewsPostCard from '../misc/NewsPostCard';
import { linkResolver } from '../../prismic-configuration';
import BlogLayout from '../layout/BlogLayout';
import { useHandleLoadImages } from '../../hooks';

const News = () => {
    const newsPageQuery = useQuery('newsPage', getNewsPage);
    const newsPostsQuery = useQuery('newsPosts', getNewsPosts);

    const { handleLoad, pageContentStyle } = useHandleLoadImages();

    if (newsPageQuery.isLoading || newsPostsQuery.isLoading) {
        return null;
    }

    if (newsPageQuery.isError || newsPostsQuery.isError) {
        return <NotFound />;
    }

    const newsPage = newsPageQuery.data.data;
    const newsPosts = newsPostsQuery.data.results;

    return (
        <BlogLayout heading={ RichText.asText(newsPage.page_title) } opacity={ pageContentStyle.opacity }>
            { newsPosts.length > 0 ? newsPosts.map(post => (
                <NewsPostCard
                    alt={ post.data.image.alt }
                    handleLoad={ () => handleLoad(newsPostsQuery.data.images_amount) }
                    heading={ RichText.asText(post.data.title) }
                    key={ post.id }
                    link={ linkResolver(post) }
                    src={ post.data.image.url }
                    date={ post.first_publication_date }
                    type="news"
                />
            )) : 'Det finns inga inlägg för tillfället.' }
        </BlogLayout>
    );
};

export default News;
