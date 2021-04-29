import { React, useCallback } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import {
    Button,
    Flex,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const Slider = ({ children }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center' });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

    return (
        <Flex
            alignItems="center"
            justify="center"
            mb={ 6 }
        >
            { isLargerThan800 ? (
                <Button
                    left="60px"
                    onClick={ scrollPrev }
                    position="relative"
                    zIndex="1"
                    variant="images"
                >
                    <ArrowBackIcon />
                </Button>
            ) : null }
            { /* Container */ }
            <VStack
                as="figure"
                maxH={ ['300px', '400px', '500px', '500px'] }
                overflow="hidden"
                ref={ emblaRef }
                w={ ['100%', '100%', '100%', '60%'] }
            >
                { /* Slider Body */ }
                <Flex>
                    { /* Slides */ }
                    { children }
                </Flex>
            </VStack>
            { isLargerThan800 ? (
                <Button
                    left="-60px"
                    onClick={ scrollNext }
                    position="relative"
                    variant="images"
                    zIndex="1"
                >
                    <ArrowForwardIcon />
                </Button>
            ) : null }
        </Flex>
    );
};

export default Slider;
