import React from 'react';
import {
    Box,
    Heading,
    Wrap,
} from '@chakra-ui/react';

const BlogLayout = ({ heading, children }) => (
    <Box>
        <Heading as="h2" mb={ 12 } size="lg" textAlign="center">{ heading }</Heading>
        <Wrap boxSizing="border-box" justify="center" mt={ 6 } spacing={ 4 } w="100%">
            { children }
        </Wrap>
    </Box>
);

export default BlogLayout;
