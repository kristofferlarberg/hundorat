import React from 'react';
import { Link, RichText } from 'prismic-reactjs';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Heading } from '@chakra-ui/react';

import getLinks from '../../fetching/getLinks';
import { linkResolver } from '../../prismic-configuration';
import NotFound from '../pages/NotFound';

const SiteLayout = ({ children }) => {
    const linksQuery = useQuery('links', getLinks);

    if (linksQuery.isLoading) {
        return <span>Loading...</span>;
    }

    if (linksQuery.isError) {
        return <NotFound />;
    }

    const links = linksQuery.data;

    return (
        <>
            <>
                <div>
                    <RouterLink to="/">
                        <Heading as="h1" size="3xl" isTruncated>
                            Antikvariat Hundörat
                        </Heading>
                    </RouterLink>
                    { links ? links.map(item => (
                        <RouterLink
                            key={ item.link.id }
                            to={ Link.url(item.link, linkResolver) }
                        >
                            <RichText render={ item.title } />
                        </RouterLink>
                    )) : null }
                </div>
                <div>{ children }</div>
                <div>Footer</div>
            </>
        </>
    );
};

export default SiteLayout;
