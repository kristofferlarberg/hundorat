import { React } from 'react';
import { motion } from 'framer-motion';
import { Flex } from '@chakra-ui/react';
import { ReactComponent as Hund } from './hund.svg';

const Spinner = () => (
    <Flex
        w="100vw"
        maxW="100vw"
        maxH="100vh"
        justifyContent="center"
        alignItems="center"
    >
        <motion.div
            w="500px"
            h="500px"
            animate={{
                scale: [0, 0.1],
                rotate: [0, 360],
                backgroundColor: 'transparent',
            }}
            transition={{
                duration: 1.5,
                ease: 'easeInOut',
                times: [0, 0.3],
                loop: Infinity,
                repeatDelay: 0.5,
            }}
        >
            <Hund />
        </motion.div>
    </Flex>
);

export default Spinner;
