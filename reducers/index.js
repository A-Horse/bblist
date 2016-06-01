'use strict';

import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import {profileByServer} from './profile.js';

const todoApp = combineReducers({
    todos,
    visibilityFilter,
    profileByServer
});

export default todoApp
