'use strict';

let R = require('fw-ramda');

const RULES = {
  email:  () => value => /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(value),
  required: () => value => !!(value + ''),
  max: (m) => value => (value + '').length <= m,
  min: (m) => value => (value + '').length >= m
};


function makeValidater(ruleString) {
  let {nameParams, message} = ruleString.split('#');
  let {name, params} = _.splitAt(1, nameParams.split('@'));

  return RULES[name].apply(null, params);
}

export function validateFormValue(formValue, ruleMap) {
  let errorMessage = {};
  for (let key in formValue) {
    let rules = ruleMap[key];

    for (let rf in rules.map(makeValidater)) {
      rf(formValue[key])
    }
    
  }
}







