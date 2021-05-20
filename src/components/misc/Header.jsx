import React from 'react';
import { Link as PrismicLink, RichText } from 'prismic-reactjs';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Button,
    Center,
    Divider,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Heading,
    Link,
    useDisclosure,
    StackDivider,
    Tooltip,
    VStack,
    HStack,
    useMediaQuery,
    Flex,
} from '@chakra-ui/react';

import { ReactComponent as Hund } from './hund.svg';
import { linkResolver } from '../../prismic-configuration';

const Header = ({ links }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');

    return (
        <>
            <Box as="header" mb={ 6 }>
                <VStack
                    align="center"
                    borderBottom="4px"
                    spacing={ 4 }
                    mb="4px"
                    pb={ 8 }
                    pt={ 6 }
                >
                    { isLargerThan1000
                        ? (
                            <HStack spacing={ 24 }>
                                <Tooltip bg="gray.800" fontSize="md" hasArrow label="rarebooks@hundorat.se">
                                    <Link href="mailto:rarebooks@hundorat.se" variant="subtle">
                                        <Button borderColor="black" borderRadius="full" h="90px" p={ 1 } variant="nav" w="90px">
                                            Kontakt
                                        </Button>
                                    </Link>
                                </Tooltip>
                                <Link as={ RouterLink } to="/" variant="subtle">
                                    <Heading align="center" as="h1" size="xl" whiteSpace="break-spaces">
                                        Antikvariat Hundörat
                                    </Heading>
                                </Link>
                                <Button borderColor="black" href="mailto: rarebooks@hundorat.se" onClick={ onOpen } ref={ btnRef } variant="nav">
                                    Öppna meny
                                </Button>
                            </HStack>
                        ) : (
                            <VStack spacing={ 3 }>
                                <Link as={ RouterLink } to="/" variant="subtle">
                                    <Heading align="center" as="h1" size="xl" whiteSpace="break-spaces">
                                        Antikvariat Hundörat
                                    </Heading>
                                </Link>
                                <Tooltip bg="gray.800" fontSize="md" hasArrow label="rarebooks@hundorat.se">
                                    <Link href="mailto:rarebooks@hundorat.se" variant="subtle">
                                        <Button borderColor="black" variant="nav">
                                            Kontakt
                                        </Button>
                                    </Link>
                                </Tooltip>
                                <Button href="mailto: rarebooks@hundorat.se" onClick={ onOpen } ref={ btnRef } variant="nav">
                                    Öppna meny
                                </Button>
                            </VStack>
                        ) }
                </VStack>
                <Divider />
            </Box>
            <Drawer isOpen={ isOpen } onClose={ onClose } placement="top">
                <DrawerOverlay>
                    <DrawerContent bgColor="floralwhite">
                        <Flex justify="end" w="100%">
                            <Button mr={ 4 } mt={ 4 } onClick={ onClose } variant="nav" w={ 10 }>
                                x
                            </Button>
                        </Flex>
                        <DrawerHeader p="0">
                            <Flex justify="center" w="100%">
                                <Box w="75px">
                                    <Link as={ RouterLink } onClick={ onClose } to="/" variant="subtle">
                                        <Hund />
                                    </Link>
                                </Box>
                            </Flex>
                        </DrawerHeader>
                        <DrawerBody>
                            <VStack
                                divider={ <StackDivider borderColor="gray.800" /> }
                                spacing={ 1 }
                                align="stretch"
                            >
                                { links ? links.map(item => (
                                    <Link
                                        as={ RouterLink }
                                        key={ item.link.id }
                                        onClick={ onClose }
                                        to={ PrismicLink.url(item.link, linkResolver) }
                                        variant="subtle"
                                    >
                                        <Center h={ 20 }>
                                            { RichText.asText(item.title) }
                                        </Center>
                                    </Link>
                                )) : null }
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
};

export default Header;
