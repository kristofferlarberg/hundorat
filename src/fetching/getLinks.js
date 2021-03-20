import Prismic from '@prismicio/client';

import { client } from '../prismic-configuration';
import getActivitiesPage from './getActivitiesPage';
import getNewsPage from './getNewsPage';
import getStoresPage from './getStoresPage';
import getTextsPage from './getTextsPage';

const getLinks = async () => {
    try {
        const menuData = await client.getSingle('menu');

        const activitiesPage = await getActivitiesPage();

        const newsPage = await getNewsPage();

        const textsPage = await getTextsPage();

        const storesPage = await getStoresPage();

        const pages = await client.query(
            Prismic.Predicates.at('document.type', 'page'),
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
                        linksData.push(pageObj);
                        const pageObjCopy = pageObj;
                        pageObjCopy.link = linkObj.link;
                    }
                });
            });
        }

        return linksData;
    }
    catch (error) {
        throw new Error();
    }
};

export default getLinks;
