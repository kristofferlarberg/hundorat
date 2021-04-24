import React from 'react';
import { useQuery } from 'react-query';
import { RichText } from 'prismic-reactjs';
import { Box, Heading } from '@chakra-ui/react';

import getActivitiesPage from '../../fetching/getActivitiesPage';
import getActivities from '../../fetching/getActivities';
import { linkResolver } from '../../prismic-configuration';
import NotFound from './NotFound';
import ArticleLayout from '../layout/ArticleLayout';

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
            <Heading
                as="h2"
                size="xl"
                textAlign="center"
                mb={ 12 }
            >
                { RichText.asText(activitiesPage.page_title) }
            </Heading>
            { activities.length > 0 ? activities.map(item => (
                <Box key={ item.id } mb={ 24 }>
                    <ArticleLayout
                        alt={ item.data.image.alt }
                        src={ item.data.image.url }
                        date={ null }
                        caption={ RichText.asText(item.data.image_caption) }
                        heading={ RichText.asText(item.data.page_title) }
                        body={
                            <RichText render={ item.data.text } linkResolver={ linkResolver } />
                        }
                    />
                </Box>
            )) : null }
        </>
    );
};

export default Activities;
