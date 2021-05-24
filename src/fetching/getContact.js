import { client } from '../prismic-configuration';

const getContact = async () => {
    try {
        const contact = await client.getSingle('contact');

        return contact;
    }
    catch (error) {
        throw new Error('No data found');
    }
};

export default getContact;
