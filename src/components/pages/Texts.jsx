import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useQuery } from 'react-query';

import getTextsPage from '../../fetching/getTextsPage';
import getTextPosts from '../../fetching/getTextPosts';
import NotFound from './NotFound';

const Texts = () => {
    const textsPageQuery = useQuery('textsPage', getTextsPage);
    const textsPostsQuery = useQuery('textsPosts', getTextPosts);

    if (textsPageQuery.isLoading || textsPostsQuery.isLoading) {
        return <span>Loading...</span>;
    }

    if (textsPageQuery.isError) {
        return <NotFound />;
    }

    const textsPage = textsPageQuery.data.data;
    const textsPosts = textsPostsQuery.data.results;

    return (
        <>
            <RichText
                render={ textsPage.page_title }
            />
            { textsPosts.length > 0 ? textsPosts.map(item => (
                <div key={ item.id }>
                    <RichText render={ item.data.title } />
                </div>
            )) : 'Det finns inga inlägg för tillfället.' }
        </>
    );
};

export default Texts;
