import React from 'react';
import { useQuery } from 'react-query';
import {
    Box,
} from '@chakra-ui/react';

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
            <Box mt={ 12 } mb={ 12 }>
                { children }
            </Box>
            <Footer />
        </>
    );
};

export default MainLayout;
