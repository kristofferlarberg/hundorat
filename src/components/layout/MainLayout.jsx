import React from 'react';
import { useQuery } from 'react-query';

import Footer from '../misc/Footer';
import getLinks from '../../fetching/getLinks';
import Header from '../misc/Header';
import NotFound from '../pages/NotFound';

const MainLayout = ({ children }) => {
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
            <Header links={ links } />
            { children }
            <Footer />
        </>
    );
};

export default MainLayout;
