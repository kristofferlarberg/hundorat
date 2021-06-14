import { extendTheme } from '@chakra-ui/react';

import Button from './components/button';
import Container from './components/container';
import Divider from './components/divider';
import DrawerCloseButton from './components/drawerCloseButton';
import Heading from './components/heading';
import Link from './components/link';
import styles from './styles';

const overrides = {
    components: {
        Button,
        Container,
        Divider,
        DrawerCloseButton,
        Heading,
        Link,
    },
    fonts: {
        body: 'Spectral',
        heading: 'Spectral',
    },
    styles,
};

export default extendTheme(overrides);
