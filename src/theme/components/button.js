const Button = {
    baseStyle: {
        borderRadius: '0',
        fontWeight: '500',
    },
    variants: {
        images: {
            backgroundColor: 'white',
            border: 0,
            borderRadius: 'sm',
            color: 'gray.800',
        },
        regular: {
            bg: 'none',
            border: '1px solid black',
            color: 'gray.800',
            _hover: {
                bg: 'white',
            },
        },
        transparent: {
            bg: 'none',
            border: '1px solid black',
            color: 'gray.800',
        },
        white: {
            bg: 'white',
            color: 'gray.800',
            _hover: {
                bg: 'none',
                border: '1px solid black',
                color: 'gray.800',
            },
        },
    },
};

export default Button;
