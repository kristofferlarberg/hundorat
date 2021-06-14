import Prismic from '@prismicio/client';

import { client } from '../prismic-configuration';

const getStores = async () => {
    try {
        const stores = await client.query(
            Prismic.Predicates.at('document.type', 'store'),
        );

        let imagesAmount = 0;
        stores.results.forEach((store) => {
            imagesAmount += store.data.store_images.length;
        });

        const storesWithImagesAmount = { ...stores, images_amount: imagesAmount };
        return storesWithImagesAmount;
    }
    catch (error) {
        throw new Error('No data found');
    }
};

export default getStores;
