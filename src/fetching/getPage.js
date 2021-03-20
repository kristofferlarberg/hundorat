import { client } from '../prismic-configuration';

const getPage = async (uid) => {
    try {
        const page = await client.getByUID('page', uid);

        return page;
    }
    catch (error) {
        throw new Error();
    }
};

export default getPage;
