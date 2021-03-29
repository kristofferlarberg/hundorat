import { client } from '../prismic-configuration';

const getNewsPage = async () => {
    try {
        const newsPage = await client.getSingle('news');

        return newsPage;
    }
    catch (error) {
        throw new Error('No data found');
    }
};

export default getNewsPage;
