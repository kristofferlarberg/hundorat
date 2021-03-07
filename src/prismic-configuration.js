import Prismic from 'prismic-javascript';

export const apiEndpoint = 'https://hundorat.cdn.prismic.io/api/v2';

const accessToken = '';

export const linkResolver = (doc) => {
    if (doc.type === 'additional') return '/ytterligare';
    if (doc.type === 'homepage') return '/';
    if (doc.type === 'news') return '/nyheter';
    if (doc.type === 'news_post') return `/nyheter/${doc.uid}`;
    if (doc.type === 'page') return `/pages/${doc.uid}`;
    if (doc.type === 'stores') return '/butiker';
    if (doc.type === 'texts') return '/texter';
    if (doc.type === 'text_post') return `/texter/${doc.uid}`;
    return '/';
};

// Client method to query documents from the Prismic repo
export const client = Prismic.client(apiEndpoint, { accessToken });
