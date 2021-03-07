import React, { useEffect, useState } from 'react';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';
import { apiEndpoint } from '../../prismic-configuration';

const client = Prismic.client(apiEndpoint);

const Stores = () => {
    const [prismicData, setPrismicData] = useState({
        storesPage: null,
        stores: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storesPage = await client.getSingle('stores');
                const stores = await client.query(
                    Prismic.Predicates.at('document.type', 'store'),
                );

                if (stores) {
                    setPrismicData(
                        {
                            storesPage,
                            stores: stores.results,
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

    if (prismicData.stores) {
        const storesPage = prismicData.storesPage.data;
        const { stores } = prismicData;

        return (
            <>
                { prismicData ? (
                    <>
                        <RichText
                            render={ storesPage.page_title }
                        />
                        { stores ? stores.map(item => (
                            <div key={ item.id }>
                                { item.data.store_images.map(images => (
                                    <img alt={ images.image.alt } src={ images.image.url } />
                                )) }
                                { RichText.render(item.data.store_name) }
                                { RichText.render(item.data.address_1) }
                                { RichText.render(item.data.address_2) }
                                { RichText.render(item.data.opening_hours_weekdays) }
                                { RichText.render(item.data.opening_hours_weekends) }
                                {
                                    RichText.render(item.data.opening_hours_additional)
                                        ? RichText.render(item.data.opening_hours_additional)
                                        : null
                                }
                            </div>
                        )) : null }
                    </>
                ) : <div>Not found</div> }
            </>
        );
    }

    return null;
};

export default Stores;
