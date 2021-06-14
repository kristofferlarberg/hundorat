import { Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

import { ReactComponent as Pil } from './pil.svg';

const Spinner = () => (
    <Flex
        align="center"
        h="100vh"
        justify="center"
    >
        <motion.div
            animate={{
                backgroundColor: 'transparent',
                rotate: [0, 360],
            }}
            transition={{
                duration: 0.5,
                ease: 'easeInOut',
                loop: Infinity,
                repeatDelay: 0,
                times: [0, 1],
            }}
        >
            <Pil />
        </motion.div>
    </Flex>
);

export default Spinner;
