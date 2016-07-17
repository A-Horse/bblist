'use strict';

import {JWT_STORAGE_KEY} from '../setting';

export function checkLogin(state, replace) {
  if( !localStorage.getItem(JWT_STORAGE_KEY) ){
    replace('/login');
  }

}
