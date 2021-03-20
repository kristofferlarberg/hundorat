import Prismic from '@prismicio/client';
import { client } from '../prismic-configuration';

const getNewsPosts = async () => {
    try {
        const newsPosts = await client.query(
            Prismic.Predicates.at('document.type', 'news_post'),
        );

        return newsPosts;
    }
    catch (error) {
        throw new Error();
    }
};

export default getNewsPosts;
