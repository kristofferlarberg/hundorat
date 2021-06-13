import { React, useCallback } from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import {
    Box,
    Button,
    Flex,
    HStack,
    Image,
    useMediaQuery,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const Slider = ({ handleLoad, store }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center' });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

    return (
        <Box
            ref={ emblaRef }
            background="white"
            overflow="hidden"
            w={ ['100%', '100%', '100%', '60%'] }
            alignItems="center"
            justify="center"
            p={ 4 }
        >
            <Flex as="figure">
                { store.data.store_images.map(image => (
                    <Flex
                        h={ ['300px', '400px', '500px', '500px'] }
                        justify="center"
                        key={ image.image.url }
                        minW="100%"
                        overflow="hidden"
                        position="relative"
                        mx={ 4 }
                    >
                        <Image
                            alt={ image.image.alt }
                            src={ image.image.url }
                            maxW="none"
                            minW="auto"
                            h="100%"
                            onLoad={ handleLoad }
                        />
                    </Flex>
                )) }
            </Flex>
            { isLargerThan800 ? (
                <HStack justify="center" mt={ 2 }>
                    <Button
                        onClick={ scrollPrev }
                        variant="images"
                    >
                        <ArrowBackIcon />
                    </Button>
                    <Button
                        onClick={ scrollNext }
                        variant="images"
                    >
                        <ArrowForwardIcon />
                    </Button>
                </HStack>
            ) : null }
        </Box>
    );
};

export default Slider;
