import Prismic from '@prismicio/client';

import { client } from '../prismic-configuration';

const getNewsPosts = async () => {
    try {
        const newsPosts = await client.query(
            Prismic.Predicates.at('document.type', 'news_post'),
        );

        let imagesAmount = 0;

        newsPosts.results.forEach((newsPost) => {
            if (newsPost.data.image.url) {
                imagesAmount += 1;
            }
        });

        const newsPostsWithAmount = { ...newsPosts, images_amount: imagesAmount };

        return newsPostsWithAmount;
    }
    catch (error) {
        throw new Error('No data found');
    }
};

export default getNewsPosts;
