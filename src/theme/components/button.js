const Button = {
    baseStyle: {
        borderRadius: 'sm',
        fontWeight: '500',
    },
    variants: {
        nav: {
            border: '1px solid black',
            color: 'gray.800',
            _hover: {
                bg: 'white',
            },
        },
        images: {
            backgroundColor: 'white',
            border: 0,
            color: 'gray.800',
            boxShadow: '0px 0 7px 1px gray',
        },
    },
};

export default Button;
