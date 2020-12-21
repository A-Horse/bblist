export function queryScheduleEvents({ startTime, endTime }) {
  return {
    type: 'QUERY_SCHEDULE_EVENTS',
    payload: {
      request: {
        url: '/schedule/events',
        params: {
          startTime,
          endTime,
        },
      },
    },
  };
}
