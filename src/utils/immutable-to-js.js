import React from 'react';
import { Iterable, Map, isImmutable, isCollection } from 'immutable';

export const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;

  const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
    newProps[wrappedComponentProp[KEY]] = isImmutable(wrappedComponentProp[VALUE])
      ? wrappedComponentProp[VALUE].toJS()
      : wrappedComponentProp[VALUE];
    return newProps;
  }, {});

  return <WrappedComponent {...propsJS} />;
};

export default toJS;
