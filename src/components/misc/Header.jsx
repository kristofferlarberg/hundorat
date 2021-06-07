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
    Image,
    Link,
    useDisclosure,
    StackDivider,
    Tooltip,
    VStack,
    HStack,
    useMediaQuery,
    Flex,
} from '@chakra-ui/react';

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
                                    borderColor="black"
                                    href="mailto: rarebooks@hundorat.se"
                                    onClick={ onOpen }
                                    ref={ btnRef }
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
                                <Button onClick={ onOpen } ref={ btnRef } variant="regular">
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
                        <Flex justify="flex-end" w="100%">
                            <Button borderRadius="full" m={ 4 } onClick={ onClose } variant="transparent" w="50px" h="50px">
                                x
                            </Button>
                        </Flex>
                        <DrawerHeader p="0">
                            <Flex justify="center" w="100%">
                                <Link as={ RouterLink } onClick={ onClose } to="/" variant="subtle">
                                    <Image
                                        alt="Hundlogotyp"
                                        h="150px"
                                        src="/images/hund.png"
                                    />
                                </Link>
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
