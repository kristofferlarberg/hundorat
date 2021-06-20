import { Link } from 'react-router-dom';
import React from 'react';
import {
    Heading,
    Text,
} from '@chakra-ui/react';

const NotFound = () => (
    <>
        <Heading
            as="h3"
            size="md"
            textAlign="center"
        >
            404: Document not found
        </Heading>
        <Text textAlign="center">
            <Link to="/">Return to homepage</Link>
        </Text>
    </>
);

export default NotFound;
