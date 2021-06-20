import React from 'react';
import {
    Box,
    Heading,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';

import BaseCard from './BaseCard';

const NewsPostCard = ({
    alt,
    date,
    handleLoad,
    heading,
    link,
    src,
    type,
}) => {
    const formattedDate = new Date(date).toLocaleDateString('sv-SV');

    return (
        <BaseCard link={ link } type={ type }>
            <VStack spacing={ 0 } w="calc(100% - 15px)">
                <Box h="400px" mb={ 2 } overflow="hidden" w="100%">
                    <Image
                        alt={ alt }
                        maxW="none"
                        mb={ 1.5 }
                        minH="100%"
                        minW="100%"
                        onLoad={ handleLoad }
                        src={ src }
                    />
                </Box>
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
