import React from 'react';
import {
    Box,
    Image,
    Heading,
    VStack,
    Container,
} from '@chakra-ui/react';

const ArticleLayout = ({
    alt,
    date,
    src,
    caption,
    heading,
    body,
}) => (
    <VStack align="center" spacing={ 8 }>
        { src
            ? (
                <Box as="figure">
                    <Image alt={ alt } src={ src } w={ ['100vw', '100vw', '70vw', '60vw'] } />
                    <Heading
                        as="figcaption"
                        size="xs"
                        textAlign="right"
                        mr={ 6 }
                        mt={ 0 }
                    >
                        { caption }
                    </Heading>
                </Box>
            )
            : null }
        { date ? <Heading as="h3" size="sm">{ date }</Heading> : null }
        <Heading
            as="h2"
            size="xl"
            textAlign="center"
        >
            { heading }
        </Heading>
        <Container maxW="container.sm">
            { body }
        </Container>
    </VStack>
);

export default ArticleLayout;
