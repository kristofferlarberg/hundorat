import React from 'react';
import { useQuery } from 'react-query';
import {
    Box,
} from '@chakra-ui/react';

import Footer from '../misc/Footer';
import getLinks from '../../fetching/getLinks';
import Header from '../misc/Header';
import NotFound from '../pages/NotFound';
import Spinner from '../misc/Spinner';

const MainLayout = ({ children }) => {
    const linksQuery = useQuery('links', getLinks);

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
            <Box mt={ 12 } mb={ 12 }>
                { children }
            </Box>
            <Footer />
        </>
    );
};

export default MainLayout;
