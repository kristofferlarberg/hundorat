import { Helmet } from 'react-helmet';
import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { apiEndpoint } from './prismic-configuration';
import { Home, NewsPost, NotFound, Preview } from './pages';

const App = () => {
    const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
    const repoName = repoNameArray[1];

    return (
        <Fragment>
            <Helmet>
                <script
                    async
                    defer
                    src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`}
                />
            </Helmet>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/nyheter/:uid" component={NewsPost} />
                    <Route exact path="/preview" component={Preview} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </Fragment>
    );
};

export default App;
