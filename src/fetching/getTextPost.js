import { client } from '../prismic-configuration';

const getTextPost = async (uid) => {
    try {
        const textPost = await client.getByUID('text_post', uid);

        return textPost;
    }
    catch (error) {
        throw new Error();
    }
};

export default getTextPost;
