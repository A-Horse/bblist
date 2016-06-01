import { combineReducers } from 'redux';

import {
    REQUEST_PROFILE, RECEIVE_PROFILE
} from '../actions/profile';


export const profileByServer = (state = {}, action) => {
    switch (action.type) {
    case REQUEST_PROFILE:
        return Object.assign({}, state, {
            isFetching: true,
            didInvalidate: false,
            profile: null
        });
    case RECEIVE_PROFILE:

        return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            profile: action.profile
        });
    default:
        return state;
    }
};

