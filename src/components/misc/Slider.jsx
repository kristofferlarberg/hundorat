import { useEmblaCarousel } from 'embla-carousel/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    HStack,
    Image,
    useMediaQuery,
} from '@chakra-ui/react';
import { React, useCallback } from 'react';

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
            alignItems="center"
            background="white"
            justify="center"
            overflow="hidden"
            p={ 4 }
            w={ ['100%', '100%', '100%', '60%'] }
        >
            <Flex as="figure">
                { store.data.store_images.map(image => (
                    <Flex
                        key={ image.image.url }
                        h={ ['300px', '400px', '500px', '500px'] }
                        justify="center"
                        minW="100%"
                        mx={ 4 }
                        overflow="hidden"
                        position="relative"
                    >
                        <Image
                            alt={ image.image.alt }
                            h="100%"
                            maxW="none"
                            minW="auto"
                            onLoad={ handleLoad }
                            src={ image.image.url }
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
