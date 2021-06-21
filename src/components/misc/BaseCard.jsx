import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Center,
    Link,
} from '@chakra-ui/react';

const BaseCard = ({ children, link, type }) => {
    const card = {
        color: null,
        height: null,
        width: null,
    };

    if (type === 'news') {
        card.width = ['100%', '80%', '60%', '50%', '40%', '40%'];
        card.border = '0';
        card.color = 'none';
        card.height = 'auto';
    }
    if (type === 'text') {
        card.color = 'floralwhite';
        card.border = '0';
        card.height = ['500px'];
        card.width = ['100%', '400px'];
    }

    return (
        <Box
            backgroundColor={ card.color }
            border={ card.border }
            borderColor="gray.800"
            h={ card.height }
            w={ card.width }
        >
            <Link
                as={ RouterLink }
                to={ link }
                variant="subtle"
            >
                <Center
                    h="100%"
                    w="100%"
                >
                    { children }
                </Center>
            </Link>
        </Box>
    );
};

export default BaseCard;
