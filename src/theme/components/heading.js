/* eslint-disable sort-keys */

const Heading = {
    baseStyle: {
        fontWeight: '400',
    },
    sizes: {
        // h1
        xl: {
            fontWeight: '700',
            letterSpacing: 'tight',
            lineHeight: '1',
            fontSize: ['5xl', 'null', '6xl'],
        },
        // h2
        lg: {
            fontWeight: '500',
            letterSpacing: 'tight',
            fontSize: ['3xl', 'null', '4xl'],
        },
        // h3
        md: {
            fontWeight: '400',
            fontSize: ['lg', 'null', 'xl'],
        },
        // h4
        sm: {
            fontWeight: '400',
            fontStyle: 'italic',
            fontSize: ['lg', 'null', 'xl'],
        },
        // Caption
        xs: {
            fontWeight: '500',
            fontSize: 'sm',
        },
    },
};

export default Heading;
