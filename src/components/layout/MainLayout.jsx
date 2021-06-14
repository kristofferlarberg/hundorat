import { Box } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';

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
            <Box as="main" mb={ 12 } minH="100vh" mt={ 12 }>
                { children }
            </Box>
            <Footer contact={ contact } />
        </>
    );
};

export default MainLayout;
