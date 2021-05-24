import React from 'react';
import { useQuery } from 'react-query';
import {
    Box,
} from '@chakra-ui/react';

import Footer from '../misc/Footer';
import getMenuLinks from '../../fetching/getMenuLinks';
import Header from '../misc/Header';
import NotFound from '../pages/NotFound';
import Spinner from '../misc/Spinner';

const MainLayout = ({ children }) => {
    const linksQuery = useQuery('links', getMenuLinks);

    if (linksQuery.isLoading) {
        return <Spinner />;
    }

    if (linksQuery.isError) {
        return <NotFound />;
    }

    const links = linksQuery.data;

    return (
        <>
            <Header links={ links } />
            <Box as="main" mt={ 12 } mb={ 24 } minH="100vh">
                { children }
            </Box>
            <Footer />
        </>
    );
};

export default MainLayout;
