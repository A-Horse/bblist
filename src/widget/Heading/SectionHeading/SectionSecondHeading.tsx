import React from 'react';
import { SectionHeading } from './SectionHeading';

export function SectionSecondHeading(props) {
  return <SectionHeading {...props}>{props.children}</SectionHeading>;
}
