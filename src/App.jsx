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
    Texts,
    TextPost,
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
                            <Route exact path="/" component={ Home } />
                            <Route exact path="/butiker" component={ Stores } />
                            <Route exact path="/nyheter" component={ News } />
                            <Route exact path="/nyheter/:uid" component={ NewsPost } />
                            <Route exact path="/preview" component={ Preview } />
                            <Route exact path="/texter" component={ Texts } />
                            <Route exact path="/texter/:uid" component={ TextPost } />
                            <Route exact path="/ytterligare-aktivitet" component={ Activities } />
                            <Route exact path="/pages/:uid" component={ Page } />
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
