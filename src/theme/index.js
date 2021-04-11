import { extendTheme } from '@chakra-ui/react';

import Button from './components/button';
import DrawerCloseButton from './components/drawerCloseButton';
import Link from './components/link';
import styles from './styles';

const overrides = {
    styles,
    components: {
        Button,
        DrawerCloseButton,
        Link,
    },
};

export default extendTheme(overrides);
