
export function queryScheduleEvents() {
  return {
    type: 'QUERY_SCHEDULE_EVENTS',
    payload: {
      request: {
        url: ''
      }
    }
  }
}