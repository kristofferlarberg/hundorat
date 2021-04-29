import React from 'react';
import {
    Box,
    Heading,
    Wrap,
} from '@chakra-ui/react';

const BlogLayout = ({ heading, children }) => (
    <Box>
        <Heading as="h2" size="lg" textAlign="center">{ heading }</Heading>
        <Wrap justify="center" mt={ 6 } spacing={ 6 }>
            { children }
        </Wrap>
    </Box>
);

export default BlogLayout;
