import 'babel-polyfill';
import 'es6-promise';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import Application from '../container/Application';
import LandingLayout from '../container/LandingLayout';
import EarthquakeMap from '../container/EarthquakeMap';
import store from '../store';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Application}>
        <IndexRoute component={LandingLayout} />
        <Route path="earthquake" component={EarthquakeMap} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
