const styles = {
    // Global styles used in RichText, for <p> and <a>
    global: {
        body: {
            backgroundColor: 'antiqueWhite',
            /* display: 'flex',
            flexDirection: 'column', */
            fontSize: ['lg', 'null', 'xl'],
            minHeight: '100vh',
            margin: '4',
        },
        p: {
            marginTop: ['1.125rem', 'null', '1.25rem'],
            marginBottom: ['1.125rem', 'null', '1.25rem'],
        },
        h3: {
            fontWeight: '500',
            textTransform: 'uppercase',
            fontSize: ['lg', 'null', 'xl'],
            marginTop: ['1.125rem', '1.25rem'],
            marginBottom: ['1rem', '1.125rem'],
        },
        a: {
            color: 'red',
        },
        ul: {
            margin: ['1.125rem', '1.25rem'],
        },
        li: {
            margin: ['0.5rem', '0.6rem'],
        },
    },
};

export default styles;
