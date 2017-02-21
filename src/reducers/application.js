import _ from 'lodash';
import Constants from '../constants';

const initialState = {
    headerTitle: '',
    isLoading: false,
};

const application = (state = initialState, action) => {
    switch (action.type) {
        case Constants.REQUEST_COMPLETED: {
            let isLoading = _.cloneDeep(state.isLoading);
            isLoading = false;
            return {
                ...state,
                isLoading,
            };
        }
        case Constants.REQUEST_STARTED: {
            let isLoading = _.cloneDeep(state.isLoading);
            isLoading = true;
            return {
                ...state,
                isLoading,
            };
        }
        default:
            return state;
    }
};

export default application;
