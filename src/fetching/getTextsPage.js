import { client } from '../prismic-configuration';

const fetchTextsPage = async () => {
    try {
        const textsPage = await client.getSingle('texts');

        return textsPage;
    }
    catch (error) {
        throw new Error();
    }
};

export default fetchTextsPage;
