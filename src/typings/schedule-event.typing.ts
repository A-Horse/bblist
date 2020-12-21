export interface IScheduleEvent {
  id: string;
  title: string;
  startTime?: string;
  endTime?: string;
  start?: Date; // for ui, add it after fetch
  end?: Date; // for ui, add it after fetch
}
