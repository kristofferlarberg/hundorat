import Prismic from 'prismic-javascript'

export const apiEndpoint = 'https://hundorat.cdn.prismic.io/api/v2'

const accessToken = ''

export const linkResolver = (doc) => {
  if (doc.type === 'page') return `/page/${doc.uid}`
  return '/'
}

// Client method to query documents from the Prismic repo
export const client = Prismic.client(apiEndpoint, { accessToken })
