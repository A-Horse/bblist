import './IssueId.scss';

import React from 'react';

interface InputProps {
  id: string;
  short?: boolean;
}

export const IssueId = ({ id, short }: InputProps) => {
  const shortId: string = id.split('-')[1];

  return (
    <span className="IssueId" title={id}>
      {short ? shortId : id}
    </span>
  );
};
