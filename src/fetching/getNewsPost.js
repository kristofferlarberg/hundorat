import { client } from '../prismic-configuration';

const fetchNewsPost = async (uid) => {
    try {
        const newsPost = await client.getByUID('news_post', uid);

        let imagesAmount = 0;

        if (newsPost.data.image.url) {
            imagesAmount += 1;
        }

        const newsPostWithAmount = { ...newsPost, images_amount: imagesAmount };

        return newsPostWithAmount;
    }
    catch (error) {
        throw new Error('No data found');
    }
};

export default fetchNewsPost;
