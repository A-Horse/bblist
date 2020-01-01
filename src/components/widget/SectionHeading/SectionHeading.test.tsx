import React from 'react';
import { SectionHeading } from './SectionHeading';
import renderer from 'react-test-renderer';

test('SectionHeading snapshot', () => {
  const assigneeSelector = renderer
    .create(<SectionHeading size="sm">星球杯</SectionHeading>)
    .toJSON();
  expect(assigneeSelector).toMatchSnapshot();
});
