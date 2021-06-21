const Button = {
    baseStyle: {
        borderRadius: '0',
        fontWeight: '500',
    },
    variants: {
        images: {
            backgroundColor: 'transparent',
            border: 0,
            borderRadius: 'sm',
            color: 'gray.800',
        },
        regular: {
            _hover: {
                bg: 'white',
            },
            bg: 'none',
            border: '1px solid black',
            color: 'gray.800',
        },
        transparent: {
            bg: 'none',
            border: '1px solid black',
            color: 'gray.800',
        },
    },
};

export default Button;
