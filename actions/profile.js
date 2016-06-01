'use strict';


import fetch from 'isomorphic-fetch'


export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';


function requestProfile() {
    return {
        type: REQUEST_PROFILE
    };
}

function receiveProfile(profile) {
    return {
        type: RECEIVE_PROFILE,
        profile
    };
}

export function fetchProfile() {
    return dispatch => {
        dispatch(requestProfile());
        return fetch(`https://www.reddit.com/r/frontend.json`)
            .then(response => response.json())
            .then(json => dispatch(receiveProfile(json)));
    };
}
