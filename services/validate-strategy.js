const  R = require('fw-ramda');

const RULES = {
  email: () => value => /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(value),
  required: () => value => !!(value + ''),
  max: (m) => value => (value + '').length <= m,
  min: (m) => value => (value + '').length >= m,
  eqTo: (c) => value => c === value
};

const defualtErrorMessage = {
  email: '请输入有效的邮箱地址',
  min: '请输入最少${1}个字符'
};

function makeErrorMessageByParams(template, params) {
  return template.replace(/${\d}/g, matched => {
    const index = R.head(matched.match(/\d+/));
    return params[index - 1];
  });
}

function makeValidater(ruleString) {
  const [nameParams, message] = ruleString.split('#');
  const [name, params] = R.splitAt(1, nameParams.split('@'));
  console.log("params = ", params);
  return value => {
    // TODO apply
    if (RULES[name].apply(null, params)(value)) {
      return null;
    }
    const template =  message || defualtErrorMessage[name];
    return makeErrorMessageByParams(template, params);
  };
}

export function validateFormValue(formValue, ruleMap) {
  return R.compose(
    R.reduce(R.merge, {}),
    R.filter(R.compose(R.length, R.head, R.values)),
    R.map(fieldName => R.compose(
      R.assoc(fieldName, R.__, {}),
      R.filter(e => !R.isNil(e)),
      R.map(fn => fn(formValue[fieldName])),
      R.map(makeValidater),
      fieldName => ruleMap[fieldName])(fieldName)),
    R.keys
  )(ruleMap);
}






