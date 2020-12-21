import { selectScheduleEvents } from './schedule-event.selector';

describe('ScheduleEventSelector', () => {
  const mockState: any = {
    scheduleEvent: {
      eventMap: {
        'id-1': {
          id: 'id-1',
          title: 'walk',
          startTime: '2020-12-21T03:41:08.345Z',
          endTime: '2020-12-21T03:42:08.345Z',
        },
        'id-2': {
          id: 'id-2',
          title: 'exercise',
          startTime: '2020-11-21T03:41:08.345Z',
          endTime: '2020-12-21T03:42:08.345Z',
        },
        'id-3': {
          id: 'id-3',
          title: 'work',
          startTime: '2020-12-21T03:41:08.345Z',
          endTime: '2021-01-01T03:42:08.345Z',
        },
      },
    },
  };

  test('should select all schedule events correctly', () => {
    const events = selectScheduleEvents(mockState);
    expect(events.length).toEqual(3);
  });

  test('should select range schedule events correctly', () => {
    const events1 = selectScheduleEvents(mockState, {
        startTime: new Date('2020-12-01T03:41:08.345Z'), 
        endTime: new Date('2020-12-31T03:41:08.345Z')
    });
    expect(events1.length).toEqual(1);
    expect(events1[0].title).toEqual('walk');

    const events2 = selectScheduleEvents(mockState, {
        startTime: null, 
        endTime: new Date('2020-12-31T03:41:08.345Z')
    });
    expect(events2.length).toEqual(2);
    expect(events2[1].title).toEqual('exercise');

    const events3 = selectScheduleEvents(mockState, {
        startTime: new Date('2020-12-01T03:41:08.345Z'), 
        endTime: null
    });
    expect(events3.length).toEqual(2);
    expect(events3[1].title).toEqual('work');
  });
});
