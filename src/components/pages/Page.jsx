import React, { useEffect, useState } from 'react';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';
import { apiEndpoint, linkResolver } from '../../prismic-configuration';

const client = Prismic.client(apiEndpoint);

const Page = ({ match }) => {
    const [prismicData, setPrismicData] = useState({ page: null });

    const { uid } = match.params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const page = await client.getByUID('page', uid);

                if (page) {
                    setPrismicData(page);
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
    }, [uid]);

    if (prismicData) {
        const page = prismicData.data;
        console.log(prismicData);
        return (
            <>
                { page ? (
                    <div>
                        { page.image ? (
                            <>
                                <img alt={ page.image.alt } src={ page.image.url } />
                                <RichText render={ page.image_caption } />
                            </>
                        ) : null }
                        <RichText render={ page.page_title } />
                        <RichText render={ page.text } linkResolver={ linkResolver } />
                    </div>
                ) : <div>Not found</div> }
            </>
        );
    }

    return null;
};

export default Page;
