import { Helmet } from 'react-helmet';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { apiEndpoint } from './prismic-configuration';
import SiteLayout from './components/layout/SiteLayout';
import {
    AdditionalActivities,
    Home,
    News,
    NewsPost,
    NotFound,
    Page,
    Preview,
    Stores,
    Texts,
    TextPost,
} from './components/pages';

const App = () => {
    const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
    const repoName = repoNameArray[1];

    return (
        <>
            <Helmet>
                <script
                    async
                    defer
                    src={ `//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true` }
                />
            </Helmet>
            <BrowserRouter>
                <Switch>
                    <SiteLayout>
                        <Route exact path="/" component={ Home } />
                        <Route exact path="/butiker" component={ Stores } />
                        <Route exact path="/nyheter" component={ News } />
                        <Route exact path="/nyheter/:uid" component={ NewsPost } />
                        <Route exact path="/preview" component={ Preview } />
                        <Route exact path="/texter" component={ Texts } />
                        <Route exact path="/texter/:uid" component={ TextPost } />
                        <Route exact path="/ytterligare" component={ AdditionalActivities } />
                        <Route exact path="/pages/:uid" component={ Page } />
                    </SiteLayout>
                    <Route component={ NotFound } />
                </Switch>
            </BrowserRouter>
        </>
    );
};

export default App;
