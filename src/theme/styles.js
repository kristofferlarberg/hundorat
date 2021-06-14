/* eslint-disable sort-keys */

const styles = {
    // Global styles used in RichText, for <p> and <a>
    global: {
        body: {
            backgroundColor: 'antiqueWhite',
            fontSize: ['lg', 'null', 'xl'],
            margin: '4',
            minHeight: '100vh',
        },
        p: {
            marginBottom: ['1.125rem', 'null', '1.25rem'],
            marginTop: ['1.125rem', 'null', '1.25rem'],
        },
        h3: {
            fontSize: ['lg', 'null', 'xl'],
            fontWeight: '500',
            marginBottom: ['1rem', '1.125rem'],
            marginTop: ['1.125rem', '1.25rem'],
            textTransform: 'uppercase',
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
