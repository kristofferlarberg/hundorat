import Prismic from '@prismicio/client';
import { client } from '../prismic-configuration';

const getActivities = async () => {
    try {
        const activities = await client.query(
            Prismic.Predicates.at('document.type', 'activity'),
        );

        return activities;
    }
    catch (error) {
        throw new Error('No data found');
    }
};

export default getActivities;
