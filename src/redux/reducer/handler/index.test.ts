import { ScheduleEventEntityList } from '../../schema';

import { DataNormalize } from './index';

const mockData = [
  {
    id: 'event-id-1',
    title: 'walking',
  },
];

describe('DataNormalize', () => {
  test('should get entities correctly', () => {
    const dataNormalize = new DataNormalize(mockData, ScheduleEventEntityList);
    const entites = dataNormalize.geEntities('ScheduleEvent');
    expect(entites['event-id-1']).toEqual({
      id: 'event-id-1',
      title: 'walking',
    });
  });
});
