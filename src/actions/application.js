import { push } from 'react-router-redux';
import Constants from '../constants';

export const requestData = () => dispatch => {
    dispatch({ type: Constants.REQUEST_STARTED });
};

export const requestCompleted = () => dispatch => {
    dispatch({ type: Constants.REQUEST_COMPLETED });
};

export const redirectToEathquakeMap = () => dispatch => {
    dispatch(push('/earthquake'));
};

export const navigateToHome = () => dispatch => {
    dispatch(push('/'));
};
