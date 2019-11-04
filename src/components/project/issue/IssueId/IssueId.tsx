import React from 'react';
import './IssueId.scss';

interface InputProps {
  id: string;
}

export const IssueId = ({ id }: InputProps) => {
  const shortId: string = id.split('-')[1];

  return (
    <span className="IssueId" title={id}>
      {shortId}
    </span>
  );
};
