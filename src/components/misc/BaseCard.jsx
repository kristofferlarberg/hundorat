import React from 'react';
import {
    Center,
    Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const BaseCard = ({ children, link, type }) => {
    const card = {
        width: null,
        height: null,
        color: null,
    };

    if (type === 'news') {
        card.width = '50vw';
        card.height = 'auto';
        card.color = 'white';
    }
    if (type === 'text') {
        card.width = 80;
        card.height = 96;
        card.color = 'white';
    }

    return (
        <Link
            as={ RouterLink }
            to={ link }
            variant="subtle"
        >
            <Center
                border="1px"
                h={ card.height }
                backgroundColor={ card.color }
                borderColor="gray.800"
                p={ 6 }
                w={ card.width }
            >
                { children }
            </Center>
        </Link>
    );
};

export default BaseCard;
