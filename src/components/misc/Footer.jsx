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
            <Image alt="International league of antiquarian booksellers" h="60px" src="/images/ilogo.png" w="auto" />
            <Flex direction="column">
                <Text align="center" fontSize="sm" my={ 0 }>
                    Antikvariat Hundörat
                </Text>
                <Text align="center" fontSize="sm" my={ 0 }>
                    { contact.tel[0].text }
                </Text>
                <Text align="center" fontSize="sm" my={ 0 }>
                    <Link href={ `mailto: ${contact.email[0].text}` }>
                        { contact.email[0].text }
                    </Link>
                </Text>
            </Flex>
            <Image
                alt="Svenska Antikvariatföreningen"
                h="60px"
                src="/images/svaf_logo.png"
                w="auto"
            />
        </Flex>
    </>
);

export default Footer;
