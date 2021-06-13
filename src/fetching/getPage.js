import { client } from '../prismic-configuration';

const getPage = async (uid) => {
    try {
        const page = await client.getByUID('page', uid);

        let imagesAmount = 0;

        if (page.data.image.url) {
            imagesAmount += 1;
        }

        const pageWithAmount = { ...page, images_amount: imagesAmount };

        return pageWithAmount;
    }
    catch (error) {
        throw new Error('No data found');
    }
};

export default getPage;
