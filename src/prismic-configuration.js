import Prismic from 'prismic-javascript';

export const apiEndpoint = 'https://hundorat.cdn.prismic.io/api/v2';

const accessToken = '';

export const linkResolver = (doc) => {
  if (doc.type === 'homepage') return '/'
  if (doc.type === 'page') return `/${doc.uid}`
  if (doc.type === 'news_post') return `/nyheter/${doc.uid}`
  /* return '/' */
};

// Client method to query documents from the Prismic repo
export const client = Prismic.client(apiEndpoint, { accessToken });