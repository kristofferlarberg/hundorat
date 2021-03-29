import { client } from '../prismic-configuration';

const fetchNewsPost = async (uid) => {
    try {
        const newsPost = await client.getByUID('news_post', uid);

        return newsPost;
    }
    catch (error) {
        throw new Error('No data found');
    }
};

export default fetchNewsPost;
