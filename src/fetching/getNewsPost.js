import { client } from '../prismic-configuration';

const fetchNewsPost = async (uid) => {
    try {
        const newsPost = await client.getByUID('news_post', uid);

        return newsPost;
    }
    catch (error) {
        throw new Error();
    }
};

export default fetchNewsPost;
