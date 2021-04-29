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
                    <Image alt={ alt } src={ src } w={ ['100vw', '100vw', '90vw', '60vw'] } />
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
        { date ? <Heading as="h3" size="md">{ date }</Heading> : null }
        <Container maxW="container.sm">
            <Heading
                as="h2"
                size="lg"
                textAlign="center"
            >
                { heading }
            </Heading>
        </Container>
        <Container maxW="container.sm">
            { body }
        </Container>
    </VStack>
);

export default ArticleLayout;
