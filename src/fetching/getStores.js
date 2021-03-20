import Prismic from '@prismicio/client';
import { client } from '../prismic-configuration';

const getStores = async () => {
    try {
        const stores = await client.query(
            Prismic.Predicates.at('document.type', 'store'),
        );

        return stores;
    }
    catch (error) {
        throw new Error();
    }
};

export default getStores;
