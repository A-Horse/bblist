import React from 'react';

import './ErrorMsg.scss';

export function ErrorMsg({ message }) {
  return <div className="ErrorMsg">{message}</div>;
}
