import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import application from './application';

const rootReducer = combineReducers({
    application,
    routing: routerReducer,
});

export default rootReducer;
