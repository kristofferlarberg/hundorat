import React from 'react';
import {
    Divider,
    Flex,
    Image,
    Link,
    Text,
} from '@chakra-ui/react';

const Footer = ({ contact }) => (
    <>
        <Divider />
        <Flex align="center" as="footer" justify="space-between" mt={ 6 }>
            <Image alt="International league of antiquarian booksellers" boxSize="60px" src="/images/ilogo.png" />
            <Flex direction="column">
                <Text my={ 0 } fontSize="sm" align="center">
                    Antikvariat Hundörat
                </Text>
                <Text my={ 0 } fontSize="sm" align="center">
                    { contact.tel[0].text }
                </Text>
                <Link my="0" align="center" fontSize="sm" href={ `mailto: ${contact.email[0].text}` }>
                    { contact.email[0].text }
                </Link>
            </Flex>
            <Image
                alt="Svenska Antikvariatföreningen"
                boxSize="60px"
                src="/images/svaf_logo.png"
            />
        </Flex>
    </>
);

export default Footer;
