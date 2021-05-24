import React from 'react';
import {
    Box,
    Flex,
    Image,
    Link,
    Text,
} from '@chakra-ui/react';

const Footer = ({ contact }) => (
    <>
        <Flex align="center" as="footer" justify="space-between">
            <Image alt="International league of antiquarian booksellers" boxSize="60px" src="/images/ilogo.png" />
            <Box>
                <Text my="0" fontSize="md" align="center">
                    Antikvariat Hundörat
                </Text>
                <Text my="0" fontSize="md" align="center">
                    { contact.tel[0].text }
                </Text>
                <Link my="0" fontSize="md" align="center" href={ `mailto: ${contact.email[0].text}` }>
                    { contact.email[0].text }
                </Link>
            </Box>
            <Image
                alt="Svenska Antikvariatföreningen"
                boxSize="60px"
                src="/images/svaf_logo.png"
            />
        </Flex>
    </>
);

export default Footer;
