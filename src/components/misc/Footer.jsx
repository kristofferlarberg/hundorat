import React from 'react';
import {
    Box,
    Flex,
    Image,
    Link,
    Text,
} from '@chakra-ui/react';

const Footer = () => (
    <>
        <Flex as="footer" justify="space-between" mt={ 6 }>
            <Image alt="International league of antiquarian booksellers" boxSize="60px" src="/images/ilogo.png" />
            <Box>
                <Text align="center">Antikvariat Hundörat</Text>
                <Text align="center">070-770 40 20</Text>
                <Link align="center" href="mailto: rarebooks@hundorat.se">rarebooks@hundorat.se</Link>
            </Box>
            <Image alt="Svenska Antikvariatföreningen" boxSize="60px" src="/images/svaf_logo.png" />
        </Flex>
    </>
);

export default Footer;
