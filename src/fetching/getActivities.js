import Prismic from '@prismicio/client';

import { client } from '../prismic-configuration';

const getActivities = async () => {
    try {
        const activities = await client.query(
            Prismic.Predicates.at('document.type', 'activity'),
        );

        let imagesAmount = 0;

        activities.results.forEach((activity) => {
            if (activity.data.image.url) {
                imagesAmount += 1;
            }
        });

        const activitiesWithAmount = { ...activities, images_amount: imagesAmount };

        return activitiesWithAmount;
    }
    catch (error) {
        throw new Error('No data found');
    }
};

export default getActivities;
