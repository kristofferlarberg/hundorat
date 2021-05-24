import React from 'react';
import { motion } from 'framer-motion';
import { Flex } from '@chakra-ui/react';

import { ReactComponent as Pil } from './pil.svg';

const Spinner = () => (
    <Flex
        h="100vh"
        justify="center"
        align="center"
    >
        <motion.div
            animate={{
                rotate: [0, 360],
                backgroundColor: 'transparent',
            }}
            transition={{
                duration: 0.5,
                ease: 'easeInOut',
                times: [0, 1],
                loop: Infinity,
                repeatDelay: 0,
            }}
        >
            <Pil />
        </motion.div>
    </Flex>
);

export default Spinner;
