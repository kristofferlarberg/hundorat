import React, { useEffect, useState } from 'react';
import { Link, RichText } from 'prismic-reactjs';
import { Link as RouterLink } from 'react-router-dom';
import Prismic from '@prismicio/client';

import { apiEndpoint, linkResolver } from '../../prismic-configuration';

const client = Prismic.client(apiEndpoint);

const SiteLayout = ({ children }) => {
    const [prismicData, setPrismicData] = useState([]);

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
                    const linksData = [
                        { title: activitiesPage.data.page_title, uid: activitiesPage.uid },
                        { title: newsPage.data.page_title, uid: newsPage.uid },
                        { title: textsPage.data.page_title, uid: textsPage.uid },
                        { title: storesPage.data.page_title, uid: storesPage.uid },
                    ];

                    // pushes the pages of type page separately to the linksData-array
                    pages.results.forEach(item => linksData.push(
                        {
                            title: item.data.page_title,
                            uid: item.uid,
                        },
                    ));

                    menuData.data.links.forEach((menuObj) => {
                        linksData.forEach((linkObj) => {
                            if (linkObj.uid === menuObj.link.uid) {
                                const linkObjCopy = linkObj;
                                linkObjCopy.link = menuObj.link;
                            }
                        });
                    });

                    setPrismicData(linksData);
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

    if (prismicData) {
        const linksData = prismicData;

        return (
            <>
                <>
                    <div>
                        <RouterLink to="/">
                            <h1>Header</h1>
                        </RouterLink>
                        { linksData ? linksData.map(item => (
                            <RouterLink
                                key={ item.link.id }
                                to={ Link.url(item.link, linkResolver) }
                            >
                                <RichText render={ item.title } />
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
