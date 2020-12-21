export class ScheduleEventModel {
  public id: string;
  public title: string;
  public start: Date;
  public end: Date;

  static fromScheduleEvent(event) {
    const scheduleEventModel = new ScheduleEventModel();
    scheduleEventModel.id = event.id;
    scheduleEventModel.title = event.title;
    scheduleEventModel.start = new Date(event.startTime);
    scheduleEventModel.end = new Date(event.endTime);
  }
}
