import React from 'react';
import {
    Heading,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';

import BaseCard from './BaseCard';

const NewsPostCard = ({
    alt,
    date,
    heading,
    link,
    src,
    type,
}) => {
    const formattedDate = new Date(date).toLocaleDateString('sv-SV');

    return (
        <BaseCard link={ link } type={ type }>
            <VStack spacing={ 0.2 } w="100%">
                <Image
                    alt={ alt }
                    src={ src }
                    mb={ 1.5 }
                    w="100%"
                />
                <Heading
                    as="h3"
                    size="md"
                    textAlign="center"
                >
                    { heading }
                </Heading>
                <Text>
                    { formattedDate }
                </Text>
            </VStack>
        </BaseCard>
    );
};

export default NewsPostCard;
