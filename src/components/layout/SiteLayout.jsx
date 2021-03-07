import React, { useEffect, useState } from 'react';
import { Link } from 'prismic-reactjs';
import { Link as RouterLink } from 'react-router-dom';
import Prismic from '@prismicio/client';
import { apiEndpoint, linkResolver } from '../../prismic-configuration';

const client = Prismic.client(apiEndpoint);

const SiteLayout = ({ children }) => {
    const [prismicData, setPrismicData] = useState({
        pagesData: null,
        menuData: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const menuData = await client.getSingle('menu');

                const activitiesPage = await client.getSingle(
                    'additional',
                    { fetch: ['additional.page_title', 'additional.uid'] },
                );
                const newsPage = await client.getSingle(
                    'news',
                    { fetch: ['news.page_title', 'news.uid'] },
                );
                const textsPage = await client.getSingle(
                    'texts',
                    { fetch: ['texts.page_title', 'texts.uid'] },
                );
                const storesPage = await client.getSingle(
                    'stores',
                    { fetch: ['stores.page_title', 'stores.uid'] },
                );
                const pages = await client.query(
                    Prismic.Predicates.at('document.type', 'page'),
                    { fetch: ['page.page_title', 'page.uid'] },
                );

                if (pages) {
                    const pageObjects = [
                        activitiesPage,
                        newsPage,
                        textsPage,
                        storesPage,
                    ];

                    pages.results.forEach(item => pageObjects.push(item));

                    setPrismicData(
                        {
                            pagesData: pageObjects,
                            menuData,
                        },
                    );
                }

                /* if (menuData) {
                    setPrismicData(menuData);
                } */

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

    if (prismicData) {
        const { menuData } = prismicData;

        return (
            <>
                <>
                    <div>
                        <h1>Header</h1>
                        { menuData ? menuData.data.links.map(item => (
                            <RouterLink
                                key={ item.link.id }
                                to={ Link.url(item.link, linkResolver) }
                            >
                                { /* Hämta alla titlar från sidor och matcha med uid på länkar */ }
                                Länk
                            </RouterLink>
                        )) : null }
                    </div>
                    <div>{ children }</div>
                    <div>Footer</div>
                </>
            </>
        );
    }

    return null;
};

export default SiteLayout;
