import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import './AppLink.scss';

export function AppLink(props: LinkProps) {
  return <Link {...props} className={`AppLink ${props.className}`} />;
}
