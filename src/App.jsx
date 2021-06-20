import { ChakraProvider } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';

import { apiEndpoint } from './prismic-configuration';
import MainLayout from './components/layout/MainLayout';
import theme from './theme';
import {
    Activities,
    Home,
    News,
    NewsPost,
    NotFound,
    Page,
    Preview,
    Stores,
    TextPost,
    Texts,
} from './components/pages';

import '@fontsource/spectral/400.css';
import '@fontsource/spectral/500.css';
import '@fontsource/spectral/600.css';
import '@fontsource/spectral/700.css';
import '@fontsource/spectral/400-italic.css';

const App = () => {
    const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
    const repoName = repoNameArray[1];
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={ queryClient }>
            <Helmet>
                <script
                    async
                    defer
                    src={ `//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true` }
                />
            </Helmet>
            <ChakraProvider theme={ theme }>
                <BrowserRouter>
                    <Switch>
                        <MainLayout>
                            <Route component={ Home } exact path="/" />
                            <Route component={ Stores } exact path="/butiker" />
                            <Route component={ News } exact path="/nyheter" />
                            <Route component={ NewsPost } exact path="/nyheter/:uid" />
                            <Route component={ Preview } exact path="/preview" />
                            <Route component={ Texts } exact path="/texter" />
                            <Route component={ TextPost } exact path="/texter/:uid" />
                            <Route component={ Activities } exact path="/ytterligare-aktivitet" />
                            <Route component={ Page } exact path="/:uid" />
                        </MainLayout>
                        <Route component={ NotFound } />
                    </Switch>
                </BrowserRouter>
            </ChakraProvider>
            <ReactQueryDevtools initialIsOpen={ false } />
        </QueryClientProvider>
    );
};

export default App;
