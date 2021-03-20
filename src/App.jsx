import { Helmet } from 'react-helmet';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import { apiEndpoint } from './prismic-configuration';
import SiteLayout from './components/layout/SiteLayout';
import {
    Activities,
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

const queryClient = new QueryClient();

const App = () => {
    const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
    const repoName = repoNameArray[1];

    return (
        <QueryClientProvider client={ queryClient }>
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
                        <Route exact path="/ytterligare-aktivitet" component={ Activities } />
                        <Route exact path="/pages/:uid" component={ Page } />
                    </SiteLayout>
                    <Route component={ NotFound } />
                </Switch>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={ false } />
        </QueryClientProvider>
    );
};

export default App;
