import Prismic from '@prismicio/client';

import { client } from '../prismic-configuration';

const fetchTextPosts = async () => {
    try {
        const textPosts = await client.query(
            Prismic.Predicates.at('document.type', 'text_post'),
        );

        return textPosts;
    }
    catch (error) {
        throw new Error('No data found');
    }
};

export default fetchTextPosts;
