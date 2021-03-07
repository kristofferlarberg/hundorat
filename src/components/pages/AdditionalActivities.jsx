import React, { useEffect, useState } from 'react';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';
import { apiEndpoint, linkResolver } from '../../prismic-configuration';

const client = Prismic.client(apiEndpoint);

const AdditionalActivities = () => {
    const [prismicData, setPrismicData] = useState({
        activitiesPage: null,
        activities: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const activitiesPage = await client.getSingle('additional');
                const activities = await client.query(
                    Prismic.Predicates.at('document.type', 'additional_activity'),
                );

                if (activities) {
                    setPrismicData(
                        {
                            activitiesPage,
                            activities: activities.results,
                        },
                    );
                }
                else {
                    console.warn(
                        'Page document not found.',
                    );
                }
            }
            catch (error) {
                console.log('error');
            }
        };

        fetchData();
    }, []);

    if (prismicData.activities) {
        const activitiesPage = prismicData.activitiesPage.data;
        const { activities } = prismicData;

        return (
            <>
                { prismicData ? (
                    <>
                        <RichText
                            render={ activitiesPage.page_title }
                        />
                        { activities ? activities.map(item => (
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
                                <RichText render={ item.data.title } />
                                <RichText render={ item.data.text } linkResolver={ linkResolver } />
                            </div>
                        )) : null }
                    </>
                ) : <div>Not found</div> }
            </>
        );
    }

    return null;
};

export default AdditionalActivities;
