import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useQuery } from 'react-query';

import ArticleLayout from '../layout/ArticleLayout';
import getPage from '../../fetching/getPage';
import { linkResolver } from '../../prismic-configuration';
import NotFound from './NotFound';
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
                    body={ <RichText linkResolver={ linkResolver } render={ page.text } /> }
                    caption={ RichText.asText(page.image_caption) }
                    date={ null }
                    handleLoad={ () => handleLoad(pageQuery.data.images_amount) }
                    heading={ RichText.asText(page.page_title) }
                    opacity={ pageContentStyle.opacity }
                    src={ page.image.url }
                />
            ) : <div>Not found</div> }
        </>
    );
};

export default Page;
