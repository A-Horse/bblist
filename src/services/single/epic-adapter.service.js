
import 'rxjs/add/operator/publish';

export class EpicAdapterService {
  input(input$) {
    this.input$ = input$.publish();
    this.input$.connect();
    return input$;
  }

  output(output) {
    return output;
  }
}

export default new EpicAdapterService();
