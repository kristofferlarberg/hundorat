import React from 'react';
import { useQuery } from 'react-query';
import { RichText } from 'prismic-reactjs';

import { linkResolver } from '../../prismic-configuration';
import getPage from '../../fetching/getPage';
import NotFound from './NotFound';

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
                <div>
                    { page.image ? (
                        <>
                            <img alt={ page.image.alt } src={ page.image.url } />
                            <RichText render={ page.image_caption } />
                        </>
                    ) : null }
                    <RichText render={ page.page_title } />
                    <RichText render={ page.text } linkResolver={ linkResolver } />
                </div>
            ) : <div>Not found</div> }
        </>
    );
};

export default Page;
