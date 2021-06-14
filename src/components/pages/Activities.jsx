import React from 'react';
import { RichText } from 'prismic-reactjs';
import { useQuery } from 'react-query';
import { Box, StackDivider, VStack } from '@chakra-ui/react';

import ArticleLayout from '../layout/ArticleLayout';
import getActivities from '../../fetching/getActivities';
import { linkResolver } from '../../prismic-configuration';
import NotFound from './NotFound';
import { useHandleLoadImages } from '../../hooks';

const Activities = () => {
    const activitiesQuery = useQuery('activities', getActivities);

    const { handleLoad, pageContentStyle } = useHandleLoadImages();

    if (activitiesQuery.isLoading) {
        return null;
    }

    if (activitiesQuery.isError) {
        return <NotFound />;
    }

    const activities = activitiesQuery.data.results;

    return (
        <VStack divider={ <StackDivider borderColor="gray.800" /> } opacity={ pageContentStyle.opacity } spacing={ 20 }>
            { activities.length > 0 ? activities.map(item => (
                <Box key={ item.id }>
                    <ArticleLayout
                        alt={ item.data.image.alt }
                        body={
                            <RichText linkResolver={ linkResolver } render={ item.data.text } />
                        }
                        caption={ RichText.asText(item.data.image_caption) }
                        date={ null }
                        handleLoad={ () => handleLoad(activitiesQuery.data.images_amount) }
                        heading={ RichText.asText(item.data.page_title) }
                        src={ item.data.image.url }
                    />
                </Box>
            )) : null }
        </VStack>
    );
};

export default Activities;
