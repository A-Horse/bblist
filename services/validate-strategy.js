const  R = require('fw-ramda');

const RULES = {
  email: () => value => /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(value),
  required: () => value => !!(value + ''),
  max: (m) => value => (value + '').length <= m,
  min: (m) => value => (value + '').length >= m,
  eqTo: (c) => value => c === value
};

const defualtErrorMessage = {
  email: '请输入有效的邮箱地址'
};


function makeValidater(ruleString) {
  const [nameParams, message] = ruleString.split('#');
  const [name, params] = R.splitAt(1, nameParams.split('@'));
  return value => {
    if (RULES[name].apply(null, params)(value)) {
      return null;
    }
    return message || defualtErrorMessage[name];
  };
}


export function validateFormValue(formValue, ruleMap) {
  const errorMessage = {};
  for (const key in formValue) {
    const rules = ruleMap[key];
    const vfs = rules.map(makeValidater);
    for (let vk in rules.map(makeValidater)) {
      let message = vfs[vk](formValue[key]);
      if( message ){
        errorMessage[key] = message;
        break;
      }
    }
  }
  return errorMessage;
}







