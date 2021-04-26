import { React, useCallback } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import {
    Button,
    Flex,
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

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            mb={ 6 }
        >
            <Button
                colorScheme="gray.800"
                left="50px"
                onClick={ scrollPrev }
                position="relative"
                zIndex="1"
                variant="white"
            >
                <ArrowBackIcon />
            </Button>
            { /* Container */ }
            <VStack
                as="figure"
                maxH={ ['300px', '300px', '400px', '400px', '500px'] }
                mx={ 6 }
                overflow="hidden"
                ref={ emblaRef }
                w={ ['100%', '80%', '70%', '50%', '40%'] }
            >
                { /* Slider Body */ }
                <Flex>
                    { /* Slides */ }
                    { children }
                </Flex>
            </VStack>
            <Button
                left="-50px"
                onClick={ scrollNext }
                position="relative"
                variant="white"
                zIndex="1"
            >
                <ArrowForwardIcon />
            </Button>
        </Flex>
    );
};

export default Slider;
