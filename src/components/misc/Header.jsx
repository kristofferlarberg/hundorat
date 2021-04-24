import React from 'react';
import { Link as PrismicLink, RichText } from 'prismic-reactjs';
import { Link as RouterLink } from 'react-router-dom';
import { EmailIcon } from '@chakra-ui/icons';
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
    DrawerCloseButton,
    Heading,
    Link,
    useDisclosure,
    StackDivider,
    Tooltip,
    VisuallyHidden,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';

import { linkResolver } from '../../prismic-configuration';

const Header = ({ links }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

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
                    <Link as={ RouterLink } to="/" variant="subtle">
                        <Heading align="center" as="h1" size="3xl" whiteSpace="break-spaces">
                            Antikvariat Hundörat
                        </Heading>
                    </Link>
                    <Wrap>
                        <WrapItem>
                            <Button colorScheme="gray.800" href="mailto: rarebooks@hundorat.se" onClick={ onOpen } ref={ btnRef } variant="outline">
                                Öppna meny
                            </Button>
                        </WrapItem>
                        <WrapItem>
                            <Tooltip bg="gray.800" fontSize="md" hasArrow label="rarebooks@hundorat.se">
                                <Link href="mailto:rarebooks@hundorat.se" variant="subtle">
                                    <Button colorScheme="gray.800" variant="outline">
                                        <VisuallyHidden>
                                            Kontakt
                                        </VisuallyHidden>
                                        <EmailIcon />
                                    </Button>
                                </Link>
                            </Tooltip>
                        </WrapItem>
                    </Wrap>
                </VStack>
                <Divider />
            </Box>
            <Drawer isOpen={ isOpen } onClose={ onClose } placement="top">
                <DrawerOverlay>
                    <DrawerContent pt={ 8 }>
                        <DrawerCloseButton />
                        <DrawerHeader>
                            <Link as={ RouterLink } onClick={ onClose } to="/" variant="subtle">
                                <Heading as="h1" size="3xl" align="center" whiteSpace="break-spaces">
                                    Antikvariat Hundörat
                                </Heading>
                            </Link>
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
