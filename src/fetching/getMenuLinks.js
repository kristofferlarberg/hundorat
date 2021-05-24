import Prismic from '@prismicio/client';

import { client } from '../prismic-configuration';

const getMenuLinks = async () => {
    try {
        const menuData = await client.getSingle('menu');

        const activitiesPage = await client.getSingle(
            'activities',
            { fetch: ['activities.page_title', 'activities.uid'] },
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
            Prismic.Predicates.at(
                'document.type',
                'page',
                { fetch: ['page.page_title', 'page.uid'] },
            ),
        );

        const pagesData = [
            { title: activitiesPage.data.page_title, uid: activitiesPage.uid },
            { title: newsPage.data.page_title, uid: newsPage.uid },
            { title: textsPage.data.page_title, uid: textsPage.uid },
            { title: storesPage.data.page_title, uid: storesPage.uid },
        ];

        pages.results.forEach(item => pagesData.push(
            {
                title: item.data.page_title,
                uid: item.uid,
            },
        ));

        const linksData = [];

        if (pagesData.length > 0) {
            const { links } = menuData.data;

            links.forEach((linkObj) => {
                pagesData.forEach((pageObj) => {
                    if (pageObj.uid === linkObj.link.uid) {
                        const { link } = linkObj;
                        linksData.push({ ...pageObj, link });
                    }
                });
            });
        }

        return linksData;
    }
    catch (error) {
        throw new Error('No data found');
    }
};

export default getMenuLinks;
