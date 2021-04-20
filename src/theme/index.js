import { extendTheme } from '@chakra-ui/react';

import Button from './components/button';
import Divider from './components/divider';
import DrawerCloseButton from './components/drawerCloseButton';
import Heading from './components/heading';
import Link from './components/link';
import styles from './styles';

const overrides = {
    fonts: {
        heading: 'Spectral',
        body: 'Spectral',
    },
    styles,
    components: {
        Button,
        Divider,
        DrawerCloseButton,
        Heading,
        Link,
    },
};

export default extendTheme(overrides);
