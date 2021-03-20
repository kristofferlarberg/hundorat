import { client } from '../prismic-configuration';

const getHomepage = async () => {
    try {
        const homepage = await client.getSingle('homepage');

        return homepage;
    }
    catch (error) {
        throw new Error();
    }
};

export default getHomepage;
