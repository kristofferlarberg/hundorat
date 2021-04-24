import React from 'react';
import { useQuery } from 'react-query';
import { RichText } from 'prismic-reactjs';
/* import {
    Text,
} from '@chakra-ui/react'; */

import { linkResolver } from '../../prismic-configuration';
import getPage from '../../fetching/getPage';
import NotFound from './NotFound';
import ArticleLayout from '../layout/ArticleLayout';

const Page = ({ match }) => {
    const { uid } = match.params;

    const pageQuery = useQuery(['page', uid], () => getPage(uid));

    if (pageQuery.isLoading) {
        return <span>Loading...</span>;
    }

    if (pageQuery.isError) {
        return <NotFound />;
    }

    const page = pageQuery.data.data;

    return (
        <>
            { page ? (
                <ArticleLayout
                    alt={ page.image.alt }
                    src={ page.image.url }
                    date={ null }
                    caption={ RichText.asText(page.image_caption) }
                    heading={ RichText.asText(page.page_title) }
                    body={ <RichText render={ page.text } linkResolver={ linkResolver } /> }
                />
            ) : <div>Not found</div> }
        </>
    );
};

export default Page;
