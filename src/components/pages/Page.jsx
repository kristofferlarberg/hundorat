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
import { useHandleLoadImages } from '../../hooks';

const Page = ({ match }) => {
    const { uid } = match.params;

    const pageQuery = useQuery(['page', uid], () => getPage(uid));

    const { handleLoad, pageContentStyle } = useHandleLoadImages();

    if (pageQuery.isLoading) {
        return null;
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
                    handleLoad={ () => handleLoad(pageQuery.data.images_amount) }
                    heading={ RichText.asText(page.page_title) }
                    body={ <RichText render={ page.text } linkResolver={ linkResolver } /> }
                    opacity={ pageContentStyle.opacity }
                />
            ) : <div>Not found</div> }
        </>
    );
};

export default Page;
