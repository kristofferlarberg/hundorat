import { client } from '../prismic-configuration';

const getTextPost = async (uid) => {
    try {
        const textPost = await client.getByUID('text_post', uid);

        let imagesAmount = 0;

        if (textPost.data.image.url) {
            imagesAmount += 1;
        }

        const textPostWithAmount = { ...textPost, images_amount: imagesAmount };

        return textPostWithAmount;
    }
    catch (error) {
        throw new Error('No data found');
    }
};

export default getTextPost;
