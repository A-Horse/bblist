import React, { CSSProperties } from 'react';
import moment from 'moment';

interface Props {
  value: string | number | Date;
  style?: CSSProperties;
  format?: string;
}

export function AppDate({ value, style, format = 'YYYY-MM-DD' }: Props) {
  if (!value) {
    return null;
  }
  const ret = moment(value).format(format);
  return <span style={{...style}}>{ret}</span>;
}
