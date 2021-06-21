import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Button,
    Center,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Heading,
    HStack,
    Link,
    StackDivider,
    Tooltip,
    useDisclosure,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react';
import { Link as PrismicLink, RichText } from 'prismic-reactjs';

import { linkResolver } from '../../prismic-configuration';

const Header = ({ contact, links }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');

    return (
        <>
            <Box as="header" mb={ 6 }>
                <VStack
                    align="center"
                    borderBottom="4px"
                    mb="4px"
                    pb={ 8 }
                    pt={ 6 }
                    spacing={ 4 }
                >
                    { isLargerThan1000
                        ? (
                            <HStack spacing={ 24 }>
                                <Tooltip bg="gray.800" fontSize="md" hasArrow label="rarebooks@hundorat.se">
                                    <Link href="mailto:rarebooks@hundorat.se" variant="subtle">
                                        <Button borderColor="black" borderRadius="full" h="90px" p={ 1 } variant="regular" w="90px">
                                            Kontakt
                                        </Button>
                                    </Link>
                                </Tooltip>
                                <Link as={ RouterLink } to="/" variant="subtle">
                                    <Heading align="center" as="h1" size="xl" whiteSpace="break-spaces">
                                        Antikvariat Hundörat
                                    </Heading>
                                </Link>
                                <Button
                                    ref={ btnRef }
                                    borderColor="black"
                                    href="mailto: rarebooks@hundorat.se"
                                    onClick={ onOpen }
                                    variant="regular"
                                >
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
                                <Tooltip bg="gray.800" fontSize="md" hasArrow label={ RichText.asText(contact.email) }>
                                    <Link href={ `mailto: ${RichText.asText(contact.email)}` } variant="subtle">
                                        <Button borderColor="black" variant="regular">
                                            Kontakt
                                        </Button>
                                    </Link>
                                </Tooltip>
                                <Button ref={ btnRef } onClick={ onOpen } variant="regular">
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
                        <Button
                            aria-label="Stäng meny"
                            borderRadius="full"
                            h="50px"
                            onClick={ onClose }
                            position="absolute"
                            right={ 2 }
                            top={ 2 }
                            variant="transparent"
                            w="50px"
                        >
                            x
                        </Button>
                        <DrawerBody aria-label="Meny" pb={ 0 } pt={ 8 } px={ 4 }>
                            <VStack
                                align="stretch"
                                divider={ <StackDivider borderColor="gray.800" /> }
                                spacing={ 0 }
                            >
                                { links ? links.map(item => (
                                    <Link
                                        key={ item.link.id }
                                        as={ RouterLink }
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
