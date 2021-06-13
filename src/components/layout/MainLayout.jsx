import React from 'react';
import { useQuery } from 'react-query';
import {
    Box,
} from '@chakra-ui/react';

import Footer from '../misc/Footer';
import getContact from '../../fetching/getContact';
import getMenuLinks from '../../fetching/getMenuLinks';
import Header from '../misc/Header';
import NotFound from '../pages/NotFound';
import Spinner from '../misc/Spinner';

const MainLayout = ({ children }) => {
    const linksQuery = useQuery('links', getMenuLinks);
    const contactQuery = useQuery('contact', getContact);

    if (linksQuery.isLoading || contactQuery.isLoading) {
        return <Spinner />;
    }

    if (linksQuery.isError || contactQuery.isError) {
        return <NotFound />;
    }

    const links = linksQuery.data;
    const contact = contactQuery.data.data;

    return (
        <>
            <Header contact={ contact } links={ links } />
            <Box as="main" mt={ 12 } mb={ 12 } minH="100vh">
                { children }
            </Box>
            <Footer contact={ contact } />
        </>
    );
};

export default MainLayout;
