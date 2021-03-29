import { client } from '../prismic-configuration';

const getStoresPage = async () => {
    try {
        const storesPage = await client.getSingle('stores');

        return storesPage;
    }
    catch (error) {
        throw new Error('No data found');
    }
};

export default getStoresPage;
