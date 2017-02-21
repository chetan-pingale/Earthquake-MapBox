import { browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducers from '../reducers';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    createLogger(),
    routerMiddleware(browserHistory)
  ),
);
export default store;
