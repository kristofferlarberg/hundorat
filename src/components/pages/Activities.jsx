import React from 'react';
import { useQuery } from 'react-query';
import { RichText } from 'prismic-reactjs';

import getActivitiesPage from '../../fetching/getActivitiesPage';
import getActivities from '../../fetching/getActivities';
import { linkResolver } from '../../prismic-configuration';
import NotFound from './NotFound';

const Activities = () => {
    const activitiesPageQuery = useQuery('activitiesPage', getActivitiesPage);
    const activitiesQuery = useQuery('activities', getActivities);

    if (activitiesPageQuery.isLoading || activitiesQuery.isLoading) {
        return <span>Loading...</span>;
    }

    if (activitiesPageQuery.isError || activitiesQuery.isError) {
        return <NotFound />;
    }

    const activitiesPage = activitiesPageQuery.data.data;
    const activities = activitiesQuery.data.results;

    return (
        <>
            <RichText
                render={ activitiesPage.page_title }
            />
            { activities.length > 0 ? activities.map(item => (
                <div key={ item.id }>
                    { item.data.image ? (
                        <>
                            <img
                                alt={ item.data.image.alt }
                                src={ item.data.image.url }
                            />
                            <RichText render={ item.data.image_caption } />
                        </>
                    ) : null }
                    <RichText render={ item.data.page_title } />
                    <RichText render={ item.data.text } linkResolver={ linkResolver } />
                </div>
            )) : null }
        </>
    );
};

export default Activities;
