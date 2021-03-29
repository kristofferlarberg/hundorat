import { client } from '../prismic-configuration';

const getActivitiesPage = async () => {
    try {
        const activitiesPage = await client.getSingle('activities');

        return activitiesPage;
    }
    catch (error) {
        throw new Error('No data found');
    }
};

export default getActivitiesPage;
