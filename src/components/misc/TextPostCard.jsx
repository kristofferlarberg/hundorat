import React from 'react';
import {
    Heading,
} from '@chakra-ui/react';

import BaseCard from './BaseCard';

const TextPostCard = ({ heading, link, type }) => (
    <BaseCard link={ link } type={ type }>
        <Heading
            as="h4"
            p={ 2 }
            size="md"
            textAlign="center"
        >
            { heading }
        </Heading>
    </BaseCard>
);

export default TextPostCard;
