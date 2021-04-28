import React from 'react';
import { useQuery } from 'react-query';
import { RichText } from 'prismic-reactjs';
import { Box, StackDivider, VStack } from '@chakra-ui/react';

import getActivities from '../../fetching/getActivities';
import { linkResolver } from '../../prismic-configuration';
import NotFound from './NotFound';
import ArticleLayout from '../layout/ArticleLayout';

const Activities = () => {
    const activitiesQuery = useQuery('activities', getActivities);

    if (activitiesQuery.isLoading) {
        return null;
    }

    if (activitiesQuery.isError) {
        return <NotFound />;
    }

    const activities = activitiesQuery.data.results;

    return (
        <VStack spacing={ 20 } divider={ <StackDivider borderColor="gray.800" /> }>
            { activities.length > 0 ? activities.map(item => (
                <Box key={ item.id }>
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
        </VStack>
    );
};

export default Activities;
